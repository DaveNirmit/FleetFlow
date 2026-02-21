import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// ── GET /api/vehicles ────────────────────────────────────────────────────────
export async function GET() {
    try {
        const vehicles = await prisma.vehicle.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(vehicles);
    } catch (error) {
        console.error('[VEHICLES GET]', error);
        return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
    }
}

const VehicleSchema = z.object({
    name: z.string().trim().min(2, 'Vehicle name must be at least 2 characters'),
    licensePlate: z
        .string()
        .trim()
        .min(3, 'License plate is required')
        .regex(/^[A-Z0-9-]+$/i, 'Invalid plate format (e.g. FLT-001)'),
    capacity: z.coerce.number().positive('Capacity must be a positive number'),
    acquisitionCost: z.coerce.number().min(0, 'Acquisition cost cannot be negative').default(0),
    type: z.enum(['Truck', 'Van', 'Bike'], { errorMap: () => ({ message: 'Type must be Truck, Van, or Bike' }) }),
    region: z.string().trim().optional(),
});

// ── POST /api/vehicles ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = VehicleSchema.safeParse(body);

        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.errors.forEach((e) => { errors[e.path[0] as string] = e.message; });
            return NextResponse.json({ errors }, { status: 400 });
        }

        // Check for duplicate plate
        const existing = await prisma.vehicle.findUnique({ where: { licensePlate: result.data.licensePlate } });
        if (existing) {
            return NextResponse.json({ errors: { licensePlate: 'This license plate is already registered' } }, { status: 409 });
        }

        const vehicle = await prisma.vehicle.create({ data: result.data });
        return NextResponse.json(vehicle, { status: 201 });
    } catch (error) {
        console.error('[VEHICLES POST]', error);
        return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
    }
}
