import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// ── GET /api/maintenance ─────────────────────────────────────────────────────
export async function GET() {
    try {
        const logs = await prisma.maintenanceLog.findMany({
            include: { vehicle: { select: { name: true, licensePlate: true } } },
            orderBy: { date: 'desc' },
        });
        return NextResponse.json(logs);
    } catch (error) {
        console.error('[MAINTENANCE GET]', error);
        return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
    }
}

const MaintenanceSchema = z.object({
    vehicleId: z.string().min(1, 'Please select a vehicle'),
    description: z.string().trim().min(10, 'Description must be at least 10 characters'),
    cost: z.coerce.number().min(0, 'Cost cannot be negative'),
});

// ── POST /api/maintenance ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = MaintenanceSchema.safeParse(body);

        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.errors.forEach((e) => { errors[e.path[0] as string] = e.message; });
            return NextResponse.json({ errors }, { status: 400 });
        }

        const { vehicleId, description, cost } = result.data;

        // Verify vehicle exists
        const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
        if (!vehicle) return NextResponse.json({ errors: { vehicleId: 'Vehicle not found' } }, { status: 404 });

        // Atomic: create log + set vehicle to IN_SHOP
        const [log] = await prisma.$transaction([
            prisma.maintenanceLog.create({ data: { vehicleId, description, cost } }),
            prisma.vehicle.update({ where: { id: vehicleId }, data: { status: 'IN_SHOP' } }),
        ]);

        return NextResponse.json(log, { status: 201 });
    } catch (error) {
        console.error('[MAINTENANCE POST]', error);
        return NextResponse.json({ error: 'Failed to log maintenance' }, { status: 500 });
    }
}
