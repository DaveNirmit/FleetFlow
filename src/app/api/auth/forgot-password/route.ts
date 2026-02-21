import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import crypto from 'crypto';

const ForgotPasswordSchema = z.object({
    email: z.string().trim().email('Invalid email format'),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = ForgotPasswordSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { errors: { email: result.error.errors[0].message } },
                { status: 400 }
            );
        }

        const { email } = result.data;

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            // Invalidate any existing tokens for this email
            await prisma.passwordResetToken.updateMany({
                where: { email, used: false },
                data: { used: true },
            });

            // Generate a secure random token
            const rawToken = crypto.randomBytes(32).toString('hex');
            const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

            // Persist the token to the database
            await prisma.passwordResetToken.create({
                data: {
                    token: rawToken,
                    email,
                    expiresAt,
                },
            });

            // In production: send an actual email here
            // e.g., sendEmail({ to: email, subject: 'Reset your password', link: `/reset-password?token=${rawToken}` })
            console.log(`[PASSWORD RESET] Link for ${email}: /reset-password?token=${rawToken}`);
        }

        // Always return success — prevents email enumeration attacks
        return NextResponse.json(
            { message: 'If an account with this email exists, a reset link has been sent.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('[FORGOT PASSWORD ERROR]', error);
        return NextResponse.json(
            { errors: { general: 'Something went wrong. Please try again.' } },
            { status: 500 }
        );
    }
}
