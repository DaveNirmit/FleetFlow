import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const AddVehicleModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { addVehicle } = useData();
  const [form, setForm] = useState({ name: '', licensePlate: '', maxCapacity: 0, acquisitionCost: 0, odometer: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVehicle(form);
    onClose();
    setForm({ name: '', licensePlate: '', maxCapacity: 0, acquisitionCost: 0, odometer: 0 });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card">
        <DialogHeader><DialogTitle className="text-foreground">Add Vehicle</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div><label className="block text-sm font-medium text-foreground mb-1">Name / Model</label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Volvo FH16" required /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">License Plate</label><Input value={form.licensePlate} onChange={e => setForm({...form, licensePlate: e.target.value})} placeholder="e.g. FL-2001" required /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-foreground mb-1">Max Capacity (kg)</label><Input type="number" value={form.maxCapacity || ''} onChange={e => setForm({...form, maxCapacity: +e.target.value})} required /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Acquisition Cost ($)</label><Input type="number" value={form.acquisitionCost || ''} onChange={e => setForm({...form, acquisitionCost: +e.target.value})} required /></div>
          </div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Odometer (km)</label><Input type="number" value={form.odometer || ''} onChange={e => setForm({...form, odometer: +e.target.value})} /></div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-primary text-primary-foreground">Add Vehicle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
