import { Vehicle, Driver, TripStatus, VehicleStatus, DriverStatus } from '@prisma/client';

export interface TripAssignment {
  cargoWeight: number;
  vehicle: Vehicle;
  driver: Driver;
}

/**
 * Senior Engineer Note:
 * This validation logic is the heart of the "Rule-Based Hub".
 * We perform these checks BEFORE starting any database transactions.
 */
export const validateTripAssignment = (assignment: TripAssignment) => {
  const { cargoWeight, vehicle, driver } = assignment;
  const errors: string[] = [];

  // 1. Capacity Validation
  if (cargoWeight > vehicle.capacity) {
    errors.push(`Overload Error: Cargo (${cargoWeight}kg) exceeds vehicle capacity (${vehicle.capacity}kg).`);
  }

  // 2. Vehicle Availability Validation
  if (vehicle.status !== VehicleStatus.AVAILABLE) {
    errors.push(`Vehicle Error: ${vehicle.name} is currently ${vehicle.status} and cannot be assigned.`);
  }

  // 3. Driver Status Validation
  if (driver.status !== DriverStatus.ON_DUTY) {
    errors.push(`Driver Error: ${driver.name} is currently ${driver.status}.`);
  }

  // 4. License Expiry Validation
  const now = new Date();
  if (new Date(driver.licenseExpiry) < now) {
    errors.push(`Compliance Error: Driver ${driver.name}'s license has expired.`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Automated ROI Calculation Logic
 */
export const calculateVehicleROI = (
  acquisitionCost: number,
  revenue: number,
  maintenanceCost: number,
  fuelCost: number
) => {
  if (acquisitionCost <= 0) return 0;
  return (revenue - (maintenanceCost + fuelCost)) / acquisitionCost;
};
