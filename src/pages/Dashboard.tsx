import React, { useState, useMemo } from 'react';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { StatusPill } from '@/components/common/StatusPill';
import { Truck, AlertTriangle, Package, TrendingUp, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AddVehicleModal } from '@/components/modals/AddVehicleModal';
import { AddDriverModal } from '@/components/modals/AddDriverModal';

type KPIFilter = 'all' | 'active' | 'maintenance' | 'pending';

const Dashboard = () => {
  const { vehicles, drivers, trips } = useData();
  const { user } = useAuth();
  const [filter, setFilter] = useState<KPIFilter>('all');
  const [search, setSearch] = useState('');
  const [vehicleModal, setVehicleModal] = useState(false);
  const [driverModal, setDriverModal] = useState(false);

  const activeFleet = vehicles.filter(v => v.status === 'OnTrip').length;
  const maintenanceAlerts = vehicles.filter(v => v.status === 'InShop').length;
  const pendingCargo = trips.filter(t => t.status === 'Draft').length;
  const nonRetired = vehicles.filter(v => v.status !== 'Retired').length;
  const utilization = nonRetired > 0 ? Math.round((activeFleet / nonRetired) * 100) : 0;

  const filteredVehicles = useMemo(() => {
    let list = vehicles;
    if (filter === 'active') list = list.filter(v => v.status === 'OnTrip');
    else if (filter === 'maintenance') list = list.filter(v => v.status === 'InShop');
    else if (filter === 'pending') {
      const draftVehicleIds = trips.filter(t => t.status === 'Draft').map(t => t.vehicleId);
      list = list.filter(v => draftVehicleIds.includes(v.id));
    }
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(v => v.name.toLowerCase().includes(s) || v.licensePlate.toLowerCase().includes(s));
    }
    return list;
  }, [vehicles, trips, filter, search]);

  const kpis = [
    { key: 'active' as KPIFilter, label: 'Active Fleet', value: activeFleet, icon: <Truck size={22} className="text-info" />, color: 'text-info' },
    { key: 'maintenance' as KPIFilter, label: 'Maintenance Alerts', value: maintenanceAlerts, icon: <AlertTriangle size={22} className="text-warning" />, color: 'text-warning' },
    { key: 'pending' as KPIFilter, label: 'Pending Cargo', value: pendingCargo, icon: <Package size={22} className="text-accent" />, color: 'text-accent' },
    { key: 'all' as KPIFilter, label: 'Utilization Rate', value: `${utilization}%`, icon: <TrendingUp size={22} className="text-success" />, color: 'text-success' },
  ];

  const isManager = user?.role === 'Fleet Manager';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Command Center</h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <div
            key={kpi.key}
            onClick={() => setFilter(filter === kpi.key ? 'all' : kpi.key)}
            className={`kpi-card ${filter === kpi.key && kpi.key !== 'all' ? 'active' : ''}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-medium">{kpi.label}</span>
              {kpi.icon}
            </div>
            <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      {isManager && (
        <div className="flex gap-3">
          <Button onClick={() => setVehicleModal(true)} className="bg-primary text-primary-foreground hover:opacity-90">
            <Plus size={16} className="mr-1" /> Add Vehicle
          </Button>
          <Button onClick={() => setDriverModal(true)} variant="outline" className="border-border text-foreground hover:bg-secondary">
            <Plus size={16} className="mr-1" /> Add Driver
          </Button>
        </div>
      )}

      {/* Search & Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search vehicles..."
              className="pl-9"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Vehicle</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">License Plate</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Capacity</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Odometer</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map(v => (
                <tr key={v.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{v.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.licensePlate}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.maxCapacity.toLocaleString()} kg</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.odometer.toLocaleString()} km</td>
                  <td className="px-4 py-3"><StatusPill status={v.status} /></td>
                </tr>
              ))}
              {filteredVehicles.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No vehicles found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddVehicleModal open={vehicleModal} onClose={() => setVehicleModal(false)} />
      <AddDriverModal open={driverModal} onClose={() => setDriverModal(false)} />
    </div>
  );
};

export default Dashboard;
