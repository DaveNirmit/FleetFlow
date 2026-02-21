import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

const MaintenancePage = () => {
  const { maintenance, vehicles, addMaintenance } = useData();
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ vehicleId: '', serviceType: '', cost: 0, date: '', notes: '' });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addMaintenance(form);
    setCreateOpen(false);
    setForm({ vehicleId: '', serviceType: '', cost: 0, date: '', notes: '' });
  };

  const getVehicleName = (id: string) => vehicles.find(v => v.id === id)?.name || 'Unknown';
  const nonRetiredVehicles = vehicles.filter(v => v.status !== 'Retired');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Maintenance</h2>
        <Button onClick={() => setCreateOpen(true)} className="bg-primary text-primary-foreground hover:opacity-90">
          <Plus size={16} className="mr-1" /> Log Maintenance
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Vehicle</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Service Type</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Cost</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Notes</th>
              </tr>
            </thead>
            <tbody>
              {maintenance.map(m => (
                <tr key={m.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{getVehicleName(m.vehicleId)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.serviceType}</td>
                  <td className="px-4 py-3 text-foreground font-medium">${m.cost.toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.date}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs max-w-xs truncate">{m.notes}</td>
                </tr>
              ))}
              {maintenance.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No maintenance logs</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="bg-card">
          <DialogHeader><DialogTitle className="text-foreground">Log Maintenance</DialogTitle></DialogHeader>
          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Vehicle</label>
              <select value={form.vehicleId} onChange={e => setForm({...form, vehicleId: e.target.value})} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground" required>
                <option value="">Select vehicle</option>
                {nonRetiredVehicles.map(v => <option key={v.id} value={v.id}>{v.name} ({v.licensePlate})</option>)}
              </select>
            </div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Service Type</label><Input value={form.serviceType} onChange={e => setForm({...form, serviceType: e.target.value})} required /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-foreground mb-1">Cost ($)</label><Input type="number" value={form.cost || ''} onChange={e => setForm({...form, cost: +e.target.value})} required /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1">Date</label><Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required /></div>
            </div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Notes</label><Input value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-primary text-primary-foreground">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MaintenancePage;
