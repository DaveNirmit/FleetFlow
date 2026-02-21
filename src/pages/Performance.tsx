import React from 'react';
import { useData } from '@/contexts/DataContext';
import { StatusPill } from '@/components/common/StatusPill';
import { ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

const Performance = () => {
  const { drivers, trips, updateDriver } = useData();

  const getCompletionRate = (driverId: string) => {
    const driverTrips = trips.filter(t => t.driverId === driverId);
    if (driverTrips.length === 0) return 0;
    return Math.round((driverTrips.filter(t => t.status === 'Completed').length / driverTrips.length) * 100);
  };

  const getDaysUntilExpiry = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const statusOptions = ['OnDuty', 'OffDuty', 'Suspended'] as const;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Driver Performance & Compliance</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {drivers.map(d => {
          const daysLeft = getDaysUntilExpiry(d.licenseExpiryDate);
          const expired = daysLeft <= 0;
          const completionRate = getCompletionRate(d.id);

          return (
            <div key={d.id} className={`bg-card rounded-xl border p-5 transition-all ${expired ? 'border-destructive/50' : 'border-border'}`} style={{ boxShadow: 'var(--card-shadow)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">{d.name}</h3>
                <StatusPill status={d.status} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1"><ShieldCheck size={14} /> Safety Score</span>
                  <span className={`font-semibold ${d.safetyScore >= 80 ? 'text-success' : d.safetyScore >= 60 ? 'text-warning' : 'text-destructive'}`}>{d.safetyScore}/100</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1"><Clock size={14} /> License Expiry</span>
                  <span className={`font-semibold ${expired ? 'text-destructive' : daysLeft < 90 ? 'text-warning' : 'text-foreground'}`}>
                    {expired ? `Expired ${Math.abs(daysLeft)}d ago` : `${daysLeft}d remaining`}
                  </span>
                </div>

                {expired && (
                  <div className="flex items-center gap-1.5 text-xs text-destructive bg-destructive/10 px-2 py-1.5 rounded-lg">
                    <AlertTriangle size={12} /> License expired — blocked from trips
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-semibold text-foreground">{completionRate}%</span>
                </div>

                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${completionRate}%` }} />
                </div>

                {d.status !== 'OnTrip' && (
                  <div className="pt-2">
                    <label className="block text-xs text-muted-foreground mb-1">Change Status</label>
                    <select
                      value={d.status}
                      onChange={e => updateDriver(d.id, { status: e.target.value as any })}
                      className="w-full rounded-lg border border-input bg-background px-2 py-1.5 text-xs text-foreground"
                    >
                      {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Performance;
