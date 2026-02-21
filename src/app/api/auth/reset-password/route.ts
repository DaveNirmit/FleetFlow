import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const ResetPasswordSchema = z.object({
    token: z.string().min(1, 'Token is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = ResetPasswordSchema.safeParse(body);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                const field = err.path[0] as string;
                fieldErrors[field] = err.message;
            });
            return NextResponse.json({ errors: fieldErrors }, { status: 400 });
        }

        const { token, password } = result.data;

        // Find the token in DB
        const resetRecord = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        // Validate: must exist, not used, not expired
        if (!resetRecord || resetRecord.used) {
            return NextResponse.json(
                { errors: { token: 'This reset link is invalid or has already been used.' } },
                { status: 400 }
            );
        }

        if (new Date() > resetRecord.expiresAt) {
            return NextResponse.json(
                { errors: { token: 'This reset link has expired. Please request a new one.' } },
                { status: 400 }
            );
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update user password
        await prisma.user.update({
            where: { email: resetRecord.email },
            data: { password: hashedPassword },
        });

        // Mark token as used
        await prisma.passwordResetToken.update({
            where: { token },
            data: { used: true },
        });

        return NextResponse.json(
            { message: 'Password reset successfully. You can now log in.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('[RESET PASSWORD ERROR]', error);
        return NextResponse.json(
            { errors: { general: 'Something went wrong. Please try again.' } },
            { status: 500 }
        );
    }
}
