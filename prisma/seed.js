const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding FleetFlow Database...');

    // 1. Create Drivers
    const driver1 = await prisma.driver.upsert({
        where: { email: 'alex.j@fleetflow.com' },
        update: {},
        create: {
            name: 'Alex Johnson',
            email: 'alex.j@fleetflow.com',
            licenseNumber: 'TX-99281',
            licenseExpiry: new Date('2025-12-31'),
            safetyScore: 98.5,
            status: 'ON_DUTY',
        },
    });

    const driver2 = await prisma.driver.upsert({
        where: { email: 's.connor@fleetflow.com' },
        update: {},
        create: {
            name: 'Sarah Connor',
            email: 's.connor@fleetflow.com',
            licenseNumber: 'CA-11203',
            licenseExpiry: new Date('2024-05-15'), // Near expiry
            safetyScore: 94.0,
            status: 'ON_DUTY',
        },
    });

    // 2. Create Vehicles
    const vehicle1 = await prisma.vehicle.create({
        data: {
            name: 'Volvo FH16',
            licensePlate: 'FLT-001',
            capacity: 25000,
            odometer: 124500,
            acquisitionCost: 150000,
            type: 'Heavy Truck',
            status: 'AVAILABLE',
            region: 'North',
        },
    });

    const vehicle2 = await prisma.vehicle.create({
        data: {
            name: 'Mercedes Sprinter',
            licensePlate: 'FLT-042',
            capacity: 35000,
            odometer: 45200,
            acquisitionCost: 55000,
            type: 'Van',
            status: 'AVAILABLE',
            region: 'Central',
        },
    });

    // 3. Create a Maintenance Log
    await prisma.maintenanceLog.create({
        data: {
            vehicleId: vehicle1.id,
            description: 'Scheduled Oil Change and Brake Inspection',
            cost: 1200,
            date: new Date(),
        },
    });

    console.log('Seed Completed Successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
