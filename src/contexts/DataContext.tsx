import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Vehicle, Driver, Trip, MaintenanceLog } from '@/types';
import { seedVehicles, seedDrivers, seedTrips, seedMaintenance } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface DataContextType {
  vehicles: Vehicle[];
  drivers: Driver[];
  trips: Trip[];
  maintenance: MaintenanceLog[];
  addVehicle: (v: Omit<Vehicle, 'id' | 'createdAt' | 'status'>) => void;
  updateVehicle: (id: string, v: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  addDriver: (d: Omit<Driver, 'id' | 'createdAt'>) => void;
  updateDriver: (id: string, d: Partial<Driver>) => void;
  addTrip: (t: Omit<Trip, 'id' | 'createdAt' | 'status'>) => { success: boolean; error?: string };
  updateTrip: (id: string, t: Partial<Trip>) => void;
  dispatchTrip: (id: string) => void;
  completeTrip: (id: string, data: { finalOdometer: number; fuelLiters: number; fuelCost: number }) => void;
  cancelTrip: (id: string) => void;
  addMaintenance: (m: Omit<MaintenanceLog, 'id'>) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be inside DataProvider');
  return ctx;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(seedVehicles);
  const [drivers, setDrivers] = useState<Driver[]>(seedDrivers);
  const [trips, setTrips] = useState<Trip[]>(seedTrips);
  const [maintenance, setMaintenance] = useState<MaintenanceLog[]>(seedMaintenance);

  const addVehicle = useCallback((v: Omit<Vehicle, 'id' | 'createdAt' | 'status'>) => {
    const newV: Vehicle = { ...v, id: 'v' + Date.now(), status: 'Available', createdAt: new Date().toISOString().split('T')[0] };
    setVehicles(prev => [...prev, newV]);
    toast({ title: 'Vehicle Added', description: `${v.name} has been added to the fleet.` });
  }, []);

  const updateVehicle = useCallback((id: string, v: Partial<Vehicle>) => {
    setVehicles(prev => prev.map(x => x.id === id ? { ...x, ...v } : x));
    toast({ title: 'Vehicle Updated' });
  }, []);

  const deleteVehicle = useCallback((id: string) => {
    setVehicles(prev => prev.filter(x => x.id !== id));
    toast({ title: 'Vehicle Deleted' });
  }, []);

  const addDriver = useCallback((d: Omit<Driver, 'id' | 'createdAt'>) => {
    const newD: Driver = { ...d, id: 'd' + Date.now(), createdAt: new Date().toISOString().split('T')[0] };
    setDrivers(prev => [...prev, newD]);
    toast({ title: 'Driver Added', description: `${d.name} has been added.` });
  }, []);

  const updateDriver = useCallback((id: string, d: Partial<Driver>) => {
    setDrivers(prev => prev.map(x => x.id === id ? { ...x, ...d } : x));
  }, []);

  const addTrip = useCallback((t: Omit<Trip, 'id' | 'createdAt' | 'status'>) => {
    const vehicle = vehicles.find(v => v.id === t.vehicleId);
    const driver = drivers.find(d => d.id === t.driverId);

    if (!vehicle || !driver) return { success: false, error: 'Vehicle or driver not found' };
    if (vehicle.status !== 'Available') return { success: false, error: 'Vehicle is not available' };
    if (driver.status !== 'OnDuty') return { success: false, error: `Driver is ${driver.status} and cannot be assigned` };
    if (new Date(driver.licenseExpiryDate) < new Date()) return { success: false, error: 'Driver license has expired' };
    if (t.cargoWeight > vehicle.maxCapacity) return { success: false, error: `Cargo weight exceeds vehicle capacity (${vehicle.maxCapacity} kg)` };

    const newT: Trip = { ...t, id: 't' + Date.now(), status: 'Draft', createdAt: new Date().toISOString().split('T')[0] };
    setTrips(prev => [...prev, newT]);
    toast({ title: 'Trip Created', description: `${t.origin} → ${t.destination}` });
    return { success: true };
  }, [vehicles, drivers]);

  const updateTrip = useCallback((id: string, t: Partial<Trip>) => {
    setTrips(prev => prev.map(x => x.id === id ? { ...x, ...t } : x));
  }, []);

  const dispatchTrip = useCallback((id: string) => {
    setTrips(prev => prev.map(t => {
      if (t.id !== id) return t;
      setVehicles(vs => vs.map(v => v.id === t.vehicleId ? { ...v, status: 'OnTrip' as const } : v));
      setDrivers(ds => ds.map(d => d.id === t.driverId ? { ...d, status: 'OnTrip' as const } : d));
      return { ...t, status: 'Dispatched' as const };
    }));
    toast({ title: 'Trip Dispatched' });
  }, []);

  const completeTrip = useCallback((id: string, data: { finalOdometer: number; fuelLiters: number; fuelCost: number }) => {
    setTrips(prev => prev.map(t => {
      if (t.id !== id) return t;
      setVehicles(vs => vs.map(v => v.id === t.vehicleId ? { ...v, status: 'Available' as const, odometer: data.finalOdometer } : v));
      setDrivers(ds => ds.map(d => d.id === t.driverId ? { ...d, status: 'OnDuty' as const } : d));
      return { ...t, status: 'Completed' as const, ...data };
    }));
    toast({ title: 'Trip Completed' });
  }, []);

  const cancelTrip = useCallback((id: string) => {
    setTrips(prev => prev.map(t => {
      if (t.id !== id) return t;
      if (t.status === 'Dispatched') {
        setVehicles(vs => vs.map(v => v.id === t.vehicleId ? { ...v, status: 'Available' as const } : v));
        setDrivers(ds => ds.map(d => d.id === t.driverId ? { ...d, status: 'OnDuty' as const } : d));
      }
      return { ...t, status: 'Cancelled' as const };
    }));
    toast({ title: 'Trip Cancelled' });
  }, []);

  const addMaintenance = useCallback((m: Omit<MaintenanceLog, 'id'>) => {
    const newM: MaintenanceLog = { ...m, id: 'm' + Date.now() };
    setMaintenance(prev => [...prev, newM]);
    setVehicles(prev => prev.map(v => v.id === m.vehicleId ? { ...v, status: 'InShop' as const } : v));
    toast({ title: 'Maintenance Logged', description: 'Vehicle status set to InShop.' });
  }, []);

  return (
    <DataContext.Provider value={{
      vehicles, drivers, trips, maintenance,
      addVehicle, updateVehicle, deleteVehicle,
      addDriver, updateDriver,
      addTrip, updateTrip, dispatchTrip, completeTrip, cancelTrip,
      addMaintenance,
    }}>
      {children}
    </DataContext.Provider>
  );
};
