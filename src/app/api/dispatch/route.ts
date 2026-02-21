import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { validateTripAssignment } from '@/lib/logic/validators';

const prisma = new PrismaClient();

/**
 * PRODUCTION-READY TRIP DISPATCHER
 * Business Rules: 
 * 1. Cargo weight check
 * 2. License expiry check
 * 3. Atomic state update (Driver + Vehicle -> ON_TRIP)
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { vehicleId, driverId, cargoWeight, origin, destination } = body;

        // 1. Fetch assets for validation
        const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
        const driver = await prisma.driver.findUnique({ where: { id: driverId } });

        if (!vehicle || !driver) {
            return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
        }

        // 2. Perform Senior Logic Validation
        const validation = validateTripAssignment({ cargoWeight, vehicle, driver });
        if (!validation.isValid) {
            return NextResponse.json({ errors: validation.errors }, { status: 400 });
        }

        // 3. Atomic Transaction (Ensures data integrity)
        const trip = await prisma.$transaction(async (tx) => {
            // Create trip record
            const newTrip = await tx.trip.create({
                data: {
                    vehicleId,
                    driverId,
                    cargoWeight,
                    origin,
                    destination,
                    status: 'DISPATCHED',
                    dispatchedAt: new Date(),
                },
            });

            // Update vehicle status
            await tx.vehicle.update({
                where: { id: vehicleId },
                data: { status: 'ON_TRIP' },
            });

            // Update driver status
            await tx.driver.update({
                where: { id: driverId },
                data: { status: 'ON_DUTY' }, // Or set to a BUSY state if added to schema
            });

            return newTrip;
        });

        return NextResponse.json(trip, { status: 201 });
    } catch (error) {
        console.error('Dispatch API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
