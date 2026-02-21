import { create } from 'zustand';

interface FleetState {
    activeTripCount: number;
    maintenanceAlerts: number;
    incActiveTrips: () => void;
    decActiveTrips: () => void;
    setMaintenanceAlerts: (count: number) => void;
}

/**
 * Global State Management (Zustand)
 * Used for real-time dashboard updates across the modular UI.
 */
export const useFleetStore = create<FleetState>((set) => ({
    activeTripCount: 42,
    maintenanceAlerts: 5,
    incActiveTrips: () => set((state) => ({ activeTripCount: state.activeTripCount + 1 })),
    decActiveTrips: () => set((state) => ({ activeTripCount: state.activeTripCount - 1 })),
    setMaintenanceAlerts: (count: number) => set({ maintenanceAlerts: count }),
}));
