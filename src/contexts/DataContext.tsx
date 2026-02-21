import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Vehicle, Driver, Trip, MaintenanceLog } from '@/types';
import { supabase } from '@/lib/supabase';
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
  addTrip: (t: Omit<Trip, 'id' | 'createdAt' | 'status'>) => Promise<{ success: boolean; error?: string }>;
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

// --- Mappers to handle snake_case to camelCase conversions ---
const mapVehicle = (dbRecord: any): Vehicle => ({
  id: dbRecord.id,
  name: dbRecord.name,
  licensePlate: dbRecord.license_plate,
  maxCapacity: dbRecord.max_capacity,
  acquisitionCost: dbRecord.acquisition_cost,
  odometer: dbRecord.odometer,
  status: dbRecord.status,
  createdAt: dbRecord.created_at,
});

const mapDriver = (dbRecord: any): Driver => ({
  id: dbRecord.id,
  name: dbRecord.name,
  licenseExpiryDate: dbRecord.license_expiry_date,
  status: dbRecord.status,
  safetyScore: dbRecord.safety_score,
  createdAt: dbRecord.created_at,
});

const mapTrip = (dbRecord: any): Trip => ({
  id: dbRecord.id,
  origin: dbRecord.origin,
  destination: dbRecord.destination,
  cargoWeight: dbRecord.cargo_weight,
  revenue: dbRecord.revenue,
  status: dbRecord.status,
  vehicleId: dbRecord.vehicle_id,
  driverId: dbRecord.driver_id,
  initialOdometer: dbRecord.initial_odometer,
  finalOdometer: dbRecord.final_odometer || undefined,
  fuelLiters: dbRecord.fuel_liters || undefined,
  fuelCost: dbRecord.fuel_cost || undefined,
  createdAt: dbRecord.created_at,
});

const mapMaintenance = (dbRecord: any): MaintenanceLog => ({
  id: dbRecord.id,
  vehicleId: dbRecord.vehicle_id,
  serviceType: dbRecord.service_type,
  cost: dbRecord.cost,
  date: dbRecord.date,
  notes: dbRecord.notes || '',
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  // Queries
  const { data: vehicles = [] } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data, error } = await supabase.from('vehicles').select('*');
      if (error) {
        console.error('Fetch vehicles error:', error);
        throw error;
      }
      return data?.map(mapVehicle) || [];
    }
  });

  const { data: drivers = [] } = useQuery({
    queryKey: ['drivers'],
    queryFn: async () => {
      const { data, error } = await supabase.from('drivers').select('*');
      if (error) throw error;
      return data?.map(mapDriver) || [];
    }
  });

  const { data: trips = [] } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const { data, error } = await supabase.from('trips').select('*');
      if (error) throw error;
      return data?.map(mapTrip) || [];
    }
  });

  const { data: maintenance = [] } = useQuery({
    queryKey: ['maintenance'],
    queryFn: async () => {
      const { data, error } = await supabase.from('maintenance_logs').select('*');
      if (error) throw error;
      return data?.map(mapMaintenance) || [];
    }
  });

  // Mutations
  const addVehicleMutation = useMutation({
    mutationFn: async (v: Omit<Vehicle, 'id' | 'createdAt' | 'status'>) => {
      const dbPayload = {
        id: 'v' + Date.now() + Math.floor(Math.random() * 1000), // simplistic UUID
        name: v.name,
        license_plate: v.licensePlate,
        max_capacity: v.maxCapacity,
        acquisition_cost: v.acquisitionCost,
        odometer: v.odometer,
        status: 'Available'
      };
      const { error } = await supabase.from('vehicles').insert([dbPayload]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast({ title: 'Vehicle Added' });
    },
    onError: (error: any) => {
      console.error(error);
      toast({ title: 'Error Adding Vehicle', description: error?.message, variant: 'destructive' });
    }
  });

  const updateVehicleMutation = useMutation({
    mutationFn: async ({ id, v }: { id: string, v: Partial<Vehicle> }) => {
      const dbPayload: any = {};
      if (v.name) dbPayload.name = v.name;
      if (v.licensePlate) dbPayload.license_plate = v.licensePlate;
      if (v.maxCapacity) dbPayload.max_capacity = v.maxCapacity;
      if (v.acquisitionCost) dbPayload.acquisition_cost = v.acquisitionCost;
      if (v.odometer !== undefined) dbPayload.odometer = v.odometer;
      if (v.status) dbPayload.status = v.status;

      const { error } = await supabase.from('vehicles').update(dbPayload).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (error: any) => {
      console.error(error);
      toast({ title: 'Update Failed', variant: 'destructive' });
    }
  });

  const deleteVehicleMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('vehicles').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast({ title: 'Vehicle Deleted' });
    }
  });

  const addDriverMutation = useMutation({
    mutationFn: async (d: Omit<Driver, 'id' | 'createdAt'>) => {
      const dbPayload = {
        id: 'd' + Date.now() + Math.floor(Math.random() * 1000),
        name: d.name,
        license_expiry_date: d.licenseExpiryDate,
        status: d.status,
        safety_score: d.safetyScore,
      };
      const { error } = await supabase.from('drivers').insert([dbPayload]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      toast({ title: 'Driver Added' });
    },
    onError: (error: any) => {
      console.error(error);
      toast({ title: 'Error Adding Driver', description: error?.message, variant: 'destructive' });
    }
  });

  const updateDriverMutation = useMutation({
    mutationFn: async ({ id, d }: { id: string, d: Partial<Driver> }) => {
      const dbPayload: any = {};
      if (d.name) dbPayload.name = d.name;
      if (d.licenseExpiryDate) dbPayload.license_expiry_date = d.licenseExpiryDate;
      if (d.status) dbPayload.status = d.status;
      if (d.safetyScore !== undefined) dbPayload.safety_score = d.safetyScore;

      const { error } = await supabase.from('drivers').update(dbPayload).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['drivers'] })
  });

  const addTripMutation = useMutation({
    mutationFn: async (t: Omit<Trip, 'id' | 'createdAt' | 'status'>) => {
      const dbPayload = {
        id: 't' + Date.now() + Math.floor(Math.random() * 1000),
        origin: t.origin,
        destination: t.destination,
        cargo_weight: t.cargoWeight,
        revenue: t.revenue,
        status: 'Draft',
        vehicle_id: t.vehicleId,
        driver_id: t.driverId,
        initial_odometer: t.initialOdometer,
      };
      const { error } = await supabase.from('trips').insert([dbPayload]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      toast({ title: 'Trip Created' });
    },
    onError: (error: any) => {
      console.error(error);
      toast({ title: 'Error Creating Trip', description: error?.message, variant: 'destructive' });
    }
  });

  const updateTripMutation = useMutation({
    mutationFn: async ({ id, t }: { id: string, t: Partial<Trip> }) => {
      const dbPayload: any = {};
      if (t.origin) dbPayload.origin = t.origin;
      if (t.destination) dbPayload.destination = t.destination;
      if (t.cargoWeight !== undefined) dbPayload.cargo_weight = t.cargoWeight;
      if (t.revenue !== undefined) dbPayload.revenue = t.revenue;
      if (t.status) dbPayload.status = t.status;
      if (t.vehicleId) dbPayload.vehicle_id = t.vehicleId;
      if (t.driverId) dbPayload.driver_id = t.driverId;
      if (t.initialOdometer !== undefined) dbPayload.initial_odometer = t.initialOdometer;
      if (t.finalOdometer !== undefined) dbPayload.final_odometer = t.finalOdometer;
      if (t.fuelLiters !== undefined) dbPayload.fuel_liters = t.fuelLiters;
      if (t.fuelCost !== undefined) dbPayload.fuel_cost = t.fuelCost;

      const { error } = await supabase.from('trips').update(dbPayload).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trips'] })
  });

  const addMaintenanceMutation = useMutation({
    mutationFn: async (m: Omit<MaintenanceLog, 'id'>) => {
      const dbPayload = {
        id: 'm' + Date.now() + Math.floor(Math.random() * 1000),
        vehicle_id: m.vehicleId,
        service_type: m.serviceType,
        cost: m.cost,
        date: m.date,
        notes: m.notes,
      };

      // Update vehicle status in the same flow
      const { error: vError } = await supabase.from('vehicles').update({ status: 'InShop' }).eq('id', m.vehicleId);
      if (vError) throw vError;

      const { error } = await supabase.from('maintenance_logs').insert([dbPayload]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast({ title: 'Maintenance Logged', description: 'Vehicle status set to InShop.' });
    },
    onError: (error: any) => {
      console.error(error);
      toast({ title: 'Maintenance Log Failed', description: error?.message, variant: 'destructive' });
    }
  });

  const addTrip = async (t: Omit<Trip, 'id' | 'createdAt' | 'status'>) => {
    const vehicle = vehicles.find(v => v.id === t.vehicleId);
    const driver = drivers.find(d => d.id === t.driverId);

    if (!vehicle || !driver) return { success: false, error: 'Vehicle or driver not found' };
    if (vehicle.status !== 'Available') return { success: false, error: 'Vehicle is not available' };
    if (driver.status !== 'OnDuty') return { success: false, error: `Driver is ${driver.status} and cannot be assigned` };
    if (new Date(driver.licenseExpiryDate) < new Date()) return { success: false, error: 'Driver license has expired' };
    if (t.cargoWeight > vehicle.maxCapacity) return { success: false, error: `Cargo weight exceeds vehicle capacity (${vehicle.maxCapacity} kg)` };

    try {
      await addTripMutation.mutateAsync(t);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to add trip' };
    }
  };

  const dispatchTrip = (id: string) => {
    const t = trips.find(x => x.id === id);
    if (!t) return;

    updateTripMutation.mutate({ id, t: { status: 'Dispatched' } });
    updateVehicleMutation.mutate({ id: t.vehicleId, v: { status: 'OnTrip' } });
    updateDriverMutation.mutate({ id: t.driverId, d: { status: 'OnTrip' } });
    toast({ title: 'Trip Dispatched' });
  };

  const completeTrip = (id: string, data: { finalOdometer: number; fuelLiters: number; fuelCost: number }) => {
    const t = trips.find(x => x.id === id);
    if (!t) return;

    updateTripMutation.mutate({
      id,
      t: { status: 'Completed', ...data }
    });
    updateVehicleMutation.mutate({ id: t.vehicleId, v: { status: 'Available', odometer: data.finalOdometer } });
    updateDriverMutation.mutate({ id: t.driverId, d: { status: 'OnDuty' } });
    toast({ title: 'Trip Completed' });
  };

  const cancelTrip = (id: string) => {
    const t = trips.find(x => x.id === id);
    if (!t) return;

    updateTripMutation.mutate({ id, t: { status: 'Cancelled' } });
    if (t.status === 'Dispatched') {
      updateVehicleMutation.mutate({ id: t.vehicleId, v: { status: 'Available' } });
      updateDriverMutation.mutate({ id: t.driverId, d: { status: 'OnDuty' } });
    }
    toast({ title: 'Trip Cancelled' });
  };

  return (
    <DataContext.Provider value={{
      vehicles, drivers, trips, maintenance,
      addVehicle: (v) => addVehicleMutation.mutate(v),
      updateVehicle: (id, v) => updateVehicleMutation.mutate({ id, v }),
      deleteVehicle: (id) => deleteVehicleMutation.mutate(id),
      addDriver: (d) => addDriverMutation.mutate(d),
      updateDriver: (id, d) => updateDriverMutation.mutate({ id, d }),
      addTrip,
      updateTrip: (id, t) => updateTripMutation.mutate({ id, t }),
      dispatchTrip,
      completeTrip,
      cancelTrip,
      addMaintenance: (m) => addMaintenanceMutation.mutate(m),
    }}>
      {children}
    </DataContext.Provider>
  );
};
