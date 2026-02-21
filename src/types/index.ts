// Types for FleetFlow

export type UserRole = 'Fleet Manager' | 'Fleet Dispatcher' | 'Fleet Safety Officer' | 'Fleet Analyst';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export type VehicleStatus = 'Available' | 'OnTrip' | 'InShop' | 'Retired';
export type DriverStatus = 'OnDuty' | 'OffDuty' | 'Suspended' | 'OnTrip';
export type TripStatus = 'Draft' | 'Dispatched' | 'Completed' | 'Cancelled';

export interface Vehicle {
  id: string;
  name: string;
  licensePlate: string;
  maxCapacity: number;
  acquisitionCost: number;
  odometer: number;
  status: VehicleStatus;
  createdAt: string;
}

export interface Driver {
  id: string;
  name: string;
  licenseExpiryDate: string;
  status: DriverStatus;
  safetyScore: number;
  createdAt: string;
}

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  cargoWeight: number;
  revenue: number;
  status: TripStatus;
  vehicleId: string;
  driverId: string;
  initialOdometer: number;
  finalOdometer?: number;
  fuelLiters?: number;
  fuelCost?: number;
  createdAt: string;
}

export interface MaintenanceLog {
  id: string;
  vehicleId: string;
  serviceType: string;
  cost: number;
  date: string;
  notes: string;
}

// RBAC
export const ROLE_ACCESS: Record<UserRole, string[]> = {
  'Fleet Manager': ['dashboard', 'vehicles', 'drivers', 'trips', 'maintenance', 'performance', 'analytics'],
  'Fleet Dispatcher': ['dashboard', 'trips', 'vehicles', 'drivers', 'performance'],
  'Fleet Safety Officer': ['dashboard', 'drivers', 'performance'],
  'Fleet Analyst': ['dashboard', 'drivers', 'analytics'],
};

export const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', path: '/' },
  { key: 'vehicles', label: 'Vehicle Registry', path: '/vehicles' },
  { key: 'drivers', label: 'Drivers', path: '/drivers' },
  { key: 'trips', label: 'Trip Dispatcher', path: '/trips' },
  { key: 'maintenance', label: 'Maintenance', path: '/maintenance' },
  { key: 'performance', label: 'Performance', path: '/performance' },
  { key: 'analytics', label: 'Analytics', path: '/analytics' },
];
