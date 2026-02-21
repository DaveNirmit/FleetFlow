import React, { useMemo } from 'react';
import { useData } from '@/contexts/DataContext';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Fuel, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Analytics = () => {
  const { vehicles, trips, maintenance } = useData();

  const vehicleMetrics = useMemo(() => {
    return vehicles.filter(v => v.status !== 'Retired').map(v => {
      const vehicleTrips = trips.filter(t => t.vehicleId === v.id && t.status === 'Completed');
      const vehicleMaint = maintenance.filter(m => m.vehicleId === v.id);

      const totalDistance = vehicleTrips.reduce((sum, t) => sum + ((t.finalOdometer || 0) - t.initialOdometer), 0);
      const totalFuel = vehicleTrips.reduce((sum, t) => sum + (t.fuelLiters || 0), 0);
      const totalFuelCost = vehicleTrips.reduce((sum, t) => sum + (t.fuelCost || 0), 0);
      const totalMaintCost = vehicleMaint.reduce((sum, m) => sum + m.cost, 0);
      const totalRevenue = vehicleTrips.reduce((sum, t) => sum + t.revenue, 0);
      const opCost = totalFuelCost + totalMaintCost;
      const fuelEfficiency = totalFuel > 0 ? (totalDistance / totalFuel).toFixed(1) : '—';
      const roi = v.acquisitionCost > 0 ? (((totalRevenue - opCost) / v.acquisitionCost) * 100).toFixed(1) : '0';

      return {
        name: v.name,
        fuelEfficiency: totalFuel > 0 ? totalDistance / totalFuel : 0,
        opCost,
        revenue: totalRevenue,
        roi: parseFloat(roi),
        fuelEfficiencyLabel: fuelEfficiency,
        totalDistance,
      };
    });
  }, [vehicles, trips, maintenance]);

  const totalRevenue = vehicleMetrics.reduce((s, v) => s + v.revenue, 0);
  const totalOpCost = vehicleMetrics.reduce((s, v) => s + v.opCost, 0);
  const avgFuelEff = vehicleMetrics.filter(v => v.fuelEfficiency > 0);
  const avgEff = avgFuelEff.length > 0 ? (avgFuelEff.reduce((s, v) => s + v.fuelEfficiency, 0) / avgFuelEff.length).toFixed(1) : '—';
  const avgROI = vehicleMetrics.length > 0 ? (vehicleMetrics.reduce((s, v) => s + v.roi, 0) / vehicleMetrics.length).toFixed(1) : '0';

  const exportCSV = () => {
    const headers = 'Vehicle,Fuel Efficiency (km/L),Op Cost ($),Revenue ($),ROI (%)\n';
    const rows = vehicleMetrics.map(v => `${v.name},${v.fuelEfficiencyLabel},${v.opCost},${v.revenue},${v.roi}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fleet-analytics.csv';
    a.click();
  };

  const kpis = [
    { label: 'Avg Fuel Efficiency', value: `${avgEff} km/L`, icon: <Fuel size={20} className="text-accent" /> },
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: <DollarSign size={20} className="text-success" /> },
    { label: 'Total Op Cost', value: `$${totalOpCost.toLocaleString()}`, icon: <BarChart3 size={20} className="text-warning" /> },
    { label: 'Avg ROI', value: `${avgROI}%`, icon: <TrendingUp size={20} className="text-info" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Analytics & Reports</h2>
        <div className="flex gap-2">
          <Button onClick={exportCSV} variant="outline" className="border-border text-foreground hover:bg-secondary text-sm">Export CSV</Button>
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary text-sm">Export PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.label} className="kpi-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-medium">{kpi.label}</span>
              {kpi.icon}
            </div>
            <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-5" style={{ boxShadow: 'var(--card-shadow)' }}>
          <h3 className="font-semibold text-foreground mb-4">Revenue vs Operational Cost</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={vehicleMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
              <XAxis dataKey="name" tick={{ fill: 'hsl(220 10% 46%)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'hsl(220 10% 46%)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(220 13% 90%)', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="opCost" name="Op Cost" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5" style={{ boxShadow: 'var(--card-shadow)' }}>
          <h3 className="font-semibold text-foreground mb-4">ROI by Vehicle</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={vehicleMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
              <XAxis dataKey="name" tick={{ fill: 'hsl(220 10% 46%)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'hsl(220 10% 46%)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(220 13% 90%)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="roi" name="ROI %" stroke="hsl(210 92% 55%)" strokeWidth={2} dot={{ fill: 'hsl(210 92% 55%)', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Vehicle Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Vehicle</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Fuel Eff.</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Op Cost</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Revenue</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">ROI</th>
              </tr>
            </thead>
            <tbody>
              {vehicleMetrics.map(v => (
                <tr key={v.name} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{v.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.fuelEfficiencyLabel} km/L</td>
                  <td className="px-4 py-3 text-muted-foreground">${v.opCost.toLocaleString()}</td>
                  <td className="px-4 py-3 text-foreground font-medium">${v.revenue.toLocaleString()}</td>
                  <td className={`px-4 py-3 font-semibold ${v.roi >= 0 ? 'text-success' : 'text-destructive'}`}>{v.roi}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
