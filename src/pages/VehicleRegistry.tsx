import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { StatusPill } from '@/components/common/StatusPill';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { AddVehicleModal } from '@/components/modals/AddVehicleModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const VehicleRegistry = () => {
  const { vehicles, updateVehicle, deleteVehicle } = useData();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [addModal, setAddModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', licensePlate: '', maxCapacity: 0, acquisitionCost: 0, odometer: 0 });

  const isManager = user?.role === 'Fleet Manager';
  const isReadOnly = user?.role === 'Fleet Dispatcher';

  const filtered = vehicles.filter(v => {
    const s = search.toLowerCase();
    return v.name.toLowerCase().includes(s) || v.licensePlate.toLowerCase().includes(s);
  });

  const startEdit = (id: string) => {
    const v = vehicles.find(x => x.id === id);
    if (!v) return;
    setEditForm({ name: v.name, licensePlate: v.licensePlate, maxCapacity: v.maxCapacity, acquisitionCost: v.acquisitionCost, odometer: v.odometer });
    setEditVehicle(id);
  };

  const saveEdit = () => {
    if (editVehicle) {
      updateVehicle(editVehicle, editForm);
      setEditVehicle(null);
    }
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteVehicle(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Vehicle Registry</h2>
        {isManager && (
          <Button onClick={() => setAddModal(true)} className="bg-primary text-primary-foreground hover:opacity-90">
            <Plus size={16} className="mr-1" /> Add Vehicle
          </Button>
        )}
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
        <div className="p-4 border-b border-border">
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search vehicles..." className="pl-9" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Vehicle</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">License</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Capacity</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Cost</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Odometer</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                {isManager && <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{v.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.licensePlate}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.maxCapacity.toLocaleString()} kg</td>
                  <td className="px-4 py-3 text-muted-foreground">${v.acquisitionCost.toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.odometer.toLocaleString()} km</td>
                  <td className="px-4 py-3"><StatusPill status={v.status} /></td>
                  {isManager && (
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => startEdit(v.id)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground"><Pencil size={14} /></button>
                        <button onClick={() => setDeleteConfirm(v.id)} className="p-1.5 rounded hover:bg-secondary text-destructive"><Trash2 size={14} /></button>
                        {v.status !== 'Retired' && (
                          <button onClick={() => updateVehicle(v.id, { status: 'Retired' })} className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground hover:text-destructive">Retire</button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddVehicleModal open={addModal} onClose={() => setAddModal(false)} />

      {/* Edit Modal */}
      <Dialog open={!!editVehicle} onOpenChange={() => setEditVehicle(null)}>
        <DialogContent className="bg-card">
          <DialogHeader><DialogTitle className="text-foreground">Edit Vehicle</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><label className="block text-sm font-medium text-foreground mb-1">Name</label><Input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">License Plate</label><Input value={editForm.licensePlate} onChange={e => setEditForm({...editForm, licensePlate: e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium text-foreground mb-1">Capacity (kg)</label><Input type="number" value={editForm.maxCapacity} onChange={e => setEditForm({...editForm, maxCapacity: +e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1">Cost ($)</label><Input type="number" value={editForm.acquisitionCost} onChange={e => setEditForm({...editForm, acquisitionCost: +e.target.value})} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditVehicle(null)}>Cancel</Button>
            <Button onClick={saveEdit} className="bg-primary text-primary-foreground">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="bg-card">
          <DialogHeader><DialogTitle className="text-foreground">Confirm Delete</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to delete this vehicle? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button onClick={confirmDelete} className="bg-destructive text-destructive-foreground">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleRegistry;
