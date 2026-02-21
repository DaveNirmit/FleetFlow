import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// ── GET /api/drivers ─────────────────────────────────────────────────────────
export async function GET() {
    try {
        const drivers = await prisma.driver.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(drivers);
    } catch (error) {
        console.error('[DRIVERS GET]', error);
        return NextResponse.json({ error: 'Failed to fetch drivers' }, { status: 500 });
    }
}

const DriverSchema = z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    email: z.string().trim().email('Invalid email format'),
    licenseNumber: z.string().trim().min(3, 'License number is required'),
    licenseExpiry: z.string().refine((d) => !isNaN(Date.parse(d)), { message: 'Invalid expiry date' }),
    safetyScore: z.coerce.number().min(0).max(100).default(100),
});

// ── POST /api/drivers ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = DriverSchema.safeParse(body);

        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.errors.forEach((e) => { errors[e.path[0] as string] = e.message; });
            return NextResponse.json({ errors }, { status: 400 });
        }

        const { name, email, licenseNumber, licenseExpiry, safetyScore } = result.data;

        // Check for duplicate email / license
        const [existingEmail, existingLicense] = await Promise.all([
            prisma.driver.findUnique({ where: { email } }),
            prisma.driver.findUnique({ where: { licenseNumber } }),
        ]);
        if (existingEmail) return NextResponse.json({ errors: { email: 'This email is already registered' } }, { status: 409 });
        if (existingLicense) return NextResponse.json({ errors: { licenseNumber: 'This license number is already registered' } }, { status: 409 });

        const driver = await prisma.driver.create({
            data: { name, email, licenseNumber, licenseExpiry: new Date(licenseExpiry), safetyScore },
        });
        return NextResponse.json(driver, { status: 201 });
    } catch (error) {
        console.error('[DRIVERS POST]', error);
        return NextResponse.json({ error: 'Failed to create driver' }, { status: 500 });
    }
}
