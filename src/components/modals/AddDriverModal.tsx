import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { DriverStatus } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const AddDriverModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { addDriver } = useData();
  const [form, setForm] = useState({ name: '', licenseExpiryDate: '', status: 'OnDuty' as DriverStatus, safetyScore: 80 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDriver(form);
    onClose();
    setForm({ name: '', licenseExpiryDate: '', status: 'OnDuty', safetyScore: 80 });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card">
        <DialogHeader><DialogTitle className="text-foreground">Add Driver</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div><label className="block text-sm font-medium text-foreground mb-1">Full Name</label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. John Smith" required /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">License Expiry Date</label><Input type="date" value={form.licenseExpiryDate} onChange={e => setForm({...form, licenseExpiryDate: e.target.value})} required /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value as DriverStatus})} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground">
                <option value="OnDuty">OnDuty</option>
                <option value="OffDuty">OffDuty</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Safety Score</label><Input type="number" min={0} max={100} value={form.safetyScore} onChange={e => setForm({...form, safetyScore: +e.target.value})} /></div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-primary text-primary-foreground">Add Driver</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
