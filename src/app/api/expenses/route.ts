import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// ── GET /api/expenses ─────────────────────────────────────────────────────────
export async function GET() {
    try {
        const logs = await prisma.fuelLog.findMany({
            include: {
                vehicle: { select: { name: true, licensePlate: true } },
                trip: { select: { id: true, origin: true, destination: true } },
            },
            orderBy: { date: 'desc' },
        });
        return NextResponse.json(logs);
    } catch (error) {
        console.error('[EXPENSES GET]', error);
        return NextResponse.json({ error: 'Failed to fetch fuel logs' }, { status: 500 });
    }
}

const FuelLogSchema = z.object({
    vehicleId: z.string().min(1, 'Please select a vehicle'),
    liters: z.coerce.number().positive('Liters must be a positive number'),
    cost: z.coerce.number().positive('Cost must be a positive number'),
    tripId: z.string().optional(),
});

// ── POST /api/expenses ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = FuelLogSchema.safeParse(body);

        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.errors.forEach((e) => { errors[e.path[0] as string] = e.message; });
            return NextResponse.json({ errors }, { status: 400 });
        }

        const { vehicleId, liters, cost, tripId } = result.data;

        // Verify vehicle exists
        const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
        if (!vehicle) return NextResponse.json({ errors: { vehicleId: 'Vehicle not found' } }, { status: 404 });

        const log = await prisma.fuelLog.create({
            data: { vehicleId, liters, cost, tripId: tripId || null },
        });
        return NextResponse.json(log, { status: 201 });
    } catch (error) {
        console.error('[EXPENSES POST]', error);
        return NextResponse.json({ error: 'Failed to log fuel entry' }, { status: 500 });
    }
}
