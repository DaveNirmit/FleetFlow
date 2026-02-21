import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const RegisterSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = RegisterSchema.safeParse(body);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                const field = err.path[0] as string;
                fieldErrors[field] = err.message;
            });
            return NextResponse.json({ errors: fieldErrors }, { status: 400 });
        }

        const { firstName, lastName, email, password } = result.data;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { errors: { email: 'This email is already registered' } },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                name: `${firstName} ${lastName}`,
                email,
                password: hashedPassword,
                role: 'DISPATCHER',
            },
        });

        return NextResponse.json(
            { message: 'Account created successfully!', userId: user.id },
            { status: 201 }
        );
    } catch (error) {
        console.error('[REGISTER ERROR]', error);
        return NextResponse.json({ errors: { general: 'Something went wrong. Please try again.' } }, { status: 500 });
    }
}
