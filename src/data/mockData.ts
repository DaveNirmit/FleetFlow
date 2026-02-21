import { Vehicle, Driver, Trip, MaintenanceLog, User } from '@/types';

export const seedUsers: User[] = [
  { id: 'u1', username: 'admin', email: 'admin@fleetflow.io', role: 'Fleet Manager', createdAt: '2024-01-01' },
  { id: 'u2', username: 'dispatcher1', email: 'dispatch@fleetflow.io', role: 'Fleet Dispatcher', createdAt: '2024-01-05' },
  { id: 'u3', username: 'safety_officer', email: 'safety@fleetflow.io', role: 'Fleet Safety Officer', createdAt: '2024-02-01' },
  { id: 'u4', username: 'analyst1', email: 'analyst@fleetflow.io', role: 'Fleet Analyst', createdAt: '2024-02-15' },
];

export const seedVehicles: Vehicle[] = [
  { id: 'v1', name: 'Volvo FH16', licensePlate: 'FL-1001', maxCapacity: 25000, acquisitionCost: 120000, odometer: 45200, status: 'Available', createdAt: '2024-01-10' },
  { id: 'v2', name: 'Scania R500', licensePlate: 'FL-1002', maxCapacity: 22000, acquisitionCost: 115000, odometer: 32800, status: 'OnTrip', createdAt: '2024-01-15' },
  { id: 'v3', name: 'MAN TGX', licensePlate: 'FL-1003', maxCapacity: 20000, acquisitionCost: 98000, odometer: 67500, status: 'InShop', createdAt: '2024-02-01' },
  { id: 'v4', name: 'DAF XF', licensePlate: 'FL-1004', maxCapacity: 24000, acquisitionCost: 110000, odometer: 28900, status: 'Available', createdAt: '2024-02-10' },
  { id: 'v5', name: 'Mercedes Actros', licensePlate: 'FL-1005', maxCapacity: 26000, acquisitionCost: 135000, odometer: 51200, status: 'Retired', createdAt: '2024-03-01' },
  { id: 'v6', name: 'Iveco S-Way', licensePlate: 'FL-1006', maxCapacity: 21000, acquisitionCost: 95000, odometer: 18400, status: 'Available', createdAt: '2024-03-15' },
];

export const seedDrivers: Driver[] = [
  { id: 'd1', name: 'James Rodriguez', licenseExpiryDate: '2026-08-15', status: 'OnDuty', safetyScore: 92, createdAt: '2024-01-10' },
  { id: 'd2', name: 'Sarah Chen', licenseExpiryDate: '2025-03-01', status: 'OnTrip', safetyScore: 88, createdAt: '2024-01-12' },
  { id: 'd3', name: 'Mike Thompson', licenseExpiryDate: '2025-01-15', status: 'OffDuty', safetyScore: 75, createdAt: '2024-02-05' },
  { id: 'd4', name: 'Elena Vasquez', licenseExpiryDate: '2026-11-20', status: 'OnDuty', safetyScore: 95, createdAt: '2024-02-20' },
  { id: 'd5', name: 'David Park', licenseExpiryDate: '2024-12-01', status: 'Suspended', safetyScore: 62, createdAt: '2024-03-01' },
];

export const seedTrips: Trip[] = [
  { id: 't1', origin: 'Chicago, IL', destination: 'Detroit, MI', cargoWeight: 18000, revenue: 4500, status: 'Completed', vehicleId: 'v1', driverId: 'd1', initialOdometer: 44900, finalOdometer: 45200, fuelLiters: 120, fuelCost: 180, createdAt: '2024-03-01' },
  { id: 't2', origin: 'Dallas, TX', destination: 'Houston, TX', cargoWeight: 15000, revenue: 2800, status: 'Dispatched', vehicleId: 'v2', driverId: 'd2', initialOdometer: 32500, createdAt: '2024-03-10' },
  { id: 't3', origin: 'Los Angeles, CA', destination: 'San Francisco, CA', cargoWeight: 12000, revenue: 3200, status: 'Draft', vehicleId: 'v4', driverId: 'd4', initialOdometer: 28900, createdAt: '2024-03-15' },
  { id: 't4', origin: 'Miami, FL', destination: 'Orlando, FL', cargoWeight: 8000, revenue: 1500, status: 'Completed', vehicleId: 'v4', driverId: 'd1', initialOdometer: 28200, finalOdometer: 28500, fuelLiters: 45, fuelCost: 68, createdAt: '2024-02-20' },
];

export const seedMaintenance: MaintenanceLog[] = [
  { id: 'm1', vehicleId: 'v3', serviceType: 'Engine Overhaul', cost: 3500, date: '2024-03-12', notes: 'Complete engine service and oil change' },
  { id: 'm2', vehicleId: 'v1', serviceType: 'Tire Replacement', cost: 1200, date: '2024-02-28', notes: 'All 6 tires replaced' },
  { id: 'm3', vehicleId: 'v2', serviceType: 'Brake Inspection', cost: 450, date: '2024-01-20', notes: 'Brake pads replaced on rear axle' },
];
