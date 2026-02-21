import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { StatusPill } from '@/components/common/StatusPill';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';

const TripDispatcher = () => {
  const { trips, vehicles, drivers, addTrip, dispatchTrip, completeTrip, cancelTrip } = useData();
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState<string | null>(null);
  const [form, setForm] = useState({ origin: '', destination: '', cargoWeight: 0, vehicleId: '', driverId: '', revenue: 0, initialOdometer: 0 });
  const [completeForm, setCompleteForm] = useState({ finalOdometer: 0, fuelLiters: 0, fuelCost: 0 });
  const [error, setError] = useState('');

  const availableVehicles = vehicles.filter(v => v.status === 'Available');
  const eligibleDrivers = drivers.filter(d => d.status === 'OnDuty' && new Date(d.licenseExpiryDate) > new Date());

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = addTrip(form);
    if (result.success) {
      setCreateOpen(false);
      setForm({ origin: '', destination: '', cargoWeight: 0, vehicleId: '', driverId: '', revenue: 0, initialOdometer: 0 });
    } else {
      setError(result.error || 'Failed to create trip');
    }
  };

  const handleComplete = () => {
    if (completeOpen) {
      completeTrip(completeOpen, completeForm);
      setCompleteOpen(null);
    }
  };

  const filtered = trips.filter(t => {
    const s = search.toLowerCase();
    return t.origin.toLowerCase().includes(s) || t.destination.toLowerCase().includes(s);
  });

  const getVehicleName = (id: string) => vehicles.find(v => v.id === id)?.name || 'Unknown';
  const getDriverName = (id: string) => drivers.find(d => d.id === id)?.name || 'Unknown';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Trip Dispatcher</h2>
        <Button onClick={() => setCreateOpen(true)} className="bg-primary text-primary-foreground hover:opacity-90">
          <Plus size={16} className="mr-1" /> Create Trip
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
        <div className="p-4 border-b border-border">
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search trips..." className="pl-9" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Route</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Vehicle</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Driver</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Cargo</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Revenue</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-foreground font-medium">{t.origin}</div>
                    <div className="text-xs text-muted-foreground">→ {t.destination}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{getVehicleName(t.vehicleId)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{getDriverName(t.driverId)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.cargoWeight.toLocaleString()} kg</td>
                  <td className="px-4 py-3 text-foreground font-medium">${t.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3"><StatusPill status={t.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {t.status === 'Draft' && (
                        <>
                          <button onClick={() => dispatchTrip(t.id)} className="text-xs px-2 py-1 rounded bg-info/10 text-info hover:bg-info/20">Dispatch</button>
                          <button onClick={() => cancelTrip(t.id)} className="text-xs px-2 py-1 rounded bg-destructive/10 text-destructive hover:bg-destructive/20">Cancel</button>
                        </>
                      )}
                      {t.status === 'Dispatched' && (
                        <>
                          <button onClick={() => { setCompleteOpen(t.id); setCompleteForm({ finalOdometer: 0, fuelLiters: 0, fuelCost: 0 }); }} className="text-xs px-2 py-1 rounded bg-success/10 text-success hover:bg-success/20">Complete</button>
                          <button onClick={() => cancelTrip(t.id)} className="text-xs px-2 py-1 rounded bg-destructive/10 text-destructive hover:bg-destructive/20">Cancel</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No trips found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Trip Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="bg-card">
          <DialogHeader><DialogTitle className="text-foreground">Create Trip</DialogTitle></DialogHeader>
          <form onSubmit={handleCreate} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-foreground mb-1">Origin</label><Input value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} required /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1">Destination</label><Input value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} required /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Vehicle</label>
              <select value={form.vehicleId} onChange={e => setForm({...form, vehicleId: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground" required>
                <option value="">Select vehicle</option>
                {availableVehicles.map(v => <option key={v.id} value={v.id}>{v.name} ({v.licensePlate}) — {v.maxCapacity}kg</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Driver</label>
              <select value={form.driverId} onChange={e => setForm({...form, driverId: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground" required>
                <option value="">Select driver</option>
                {eligibleDrivers.map(d => <option key={d.id} value={d.id}>{d.name} (Score: {d.safetyScore})</option>)}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="block text-sm font-medium text-foreground mb-1">Cargo (kg)</label><Input type="number" value={form.cargoWeight || ''} onChange={e => setForm({...form, cargoWeight: +e.target.value})} required /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1">Revenue ($)</label><Input type="number" value={form.revenue || ''} onChange={e => setForm({...form, revenue: +e.target.value})} required /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1">Init. Odom.</label><Input type="number" value={form.initialOdometer || ''} onChange={e => setForm({...form, initialOdometer: +e.target.value})} required /></div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-primary text-primary-foreground">Create Trip</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Complete Trip Modal */}
      <Dialog open={!!completeOpen} onOpenChange={() => setCompleteOpen(null)}>
        <DialogContent className="bg-card">
          <DialogHeader><DialogTitle className="text-foreground">Complete Trip</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><label className="block text-sm font-medium text-foreground mb-1">Final Odometer</label><Input type="number" value={completeForm.finalOdometer || ''} onChange={e => setCompleteForm({...completeForm, finalOdometer: +e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Fuel (liters)</label><Input type="number" value={completeForm.fuelLiters || ''} onChange={e => setCompleteForm({...completeForm, fuelLiters: +e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Fuel Cost ($)</label><Input type="number" value={completeForm.fuelCost || ''} onChange={e => setCompleteForm({...completeForm, fuelCost: +e.target.value})} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompleteOpen(null)}>Cancel</Button>
            <Button onClick={handleComplete} className="bg-success text-success-foreground">Complete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripDispatcher;
