import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { z } from 'zod';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fleetflow-super-secret-jwt-key-change-in-production-2024'
);

const LoginSchema = z.object({
    email: z.string().trim().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = LoginSchema.safeParse(body);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                const field = err.path[0] as string;
                fieldErrors[field] = err.message;
            });
            return NextResponse.json({ errors: fieldErrors }, { status: 400 });
        }

        const { email, password } = result.data;

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json(
                { errors: { email: 'No account found with this email' } },
                { status: 401 }
            );
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { errors: { password: 'Incorrect password' } },
                { status: 401 }
            );
        }

        // Issue a signed JWT (expires in 8 hours)
        const token = await new SignJWT({
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('8h')
            .sign(JWT_SECRET);

        // Set httpOnly cookie — NOT accessible by JavaScript (XSS safe)
        const response = NextResponse.json(
            {
                message: 'Login successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 200 }
        );

        response.cookies.set('fleetflow_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 8, // 8 hours
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('[LOGIN ERROR]', error);
        return NextResponse.json(
            { errors: { general: 'Something went wrong. Please try again.' } },
            { status: 500 }
        );
    }
}
