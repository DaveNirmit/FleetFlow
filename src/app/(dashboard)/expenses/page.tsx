"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Fuel, DollarSign, TrendingUp, Download, Plus, X, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface Vehicle { id: string; name: string; licensePlate: string; }
interface FuelLog {
    id: string; liters: number; cost: number; date: string;
    vehicle: { name: string; licensePlate: string; };
    trip?: { id: string; origin: string; destination: string; } | null;
}
interface FormErrors { vehicleId?: string; liters?: string; cost?: string; general?: string; }

export default function ExpensesPage() {
    const [logs, setLogs] = useState<FuelLog[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [success, setSuccess] = useState('');
    const [form, setForm] = useState({ vehicleId: '', liters: '', cost: '' });

    const fetchData = useCallback(async () => {
        try {
            const [lRes, vRes] = await Promise.all([fetch('/api/expenses'), fetch('/api/vehicles')]);
            if (lRes.ok) setLogs(await lRes.json());
            if (vRes.ok) setVehicles(await vRes.json());
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name as keyof FormErrors]) setErrors(prev => { const n = { ...prev }; delete n[e.target.name as keyof FormErrors]; return n; });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({}); setSuccess('');
        setSubmitting(true);
        try {
            const res = await fetch('/api/expenses', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vehicleId: form.vehicleId, liters: Number(form.liters), cost: Number(form.cost) }),
            });
            const data = await res.json();
            if (!res.ok) { setErrors(data.errors || { general: 'Failed to log entry' }); }
            else {
                setSuccess('✓ Fuel entry logged successfully!');
                setForm({ vehicleId: '', liters: '', cost: '' });
                fetchData();
                setTimeout(() => { setSuccess(''); setShowForm(false); }, 3000);
            }
        } catch { setErrors({ general: 'Network error.' }); }
        finally { setSubmitting(false); }
    };

    const totalLiters = logs.reduce((s, l) => s + l.liters, 0);
    const totalCost = logs.reduce((s, l) => s + l.cost, 0);
    const avgCostPerLiter = totalLiters > 0 ? (totalCost / totalLiters).toFixed(2) : '0.00';

    const handleExport = () => {
        const csv = ['ID,Vehicle,Plate,Liters,Cost,Date',
            ...logs.map(l => `${l.id},${l.vehicle.name},${l.vehicle.licensePlate},${l.liters},${l.cost},${l.date}`)
        ].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'fuel_logs.csv'; a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Fuel & Expense Logging</h1>
                    <p className="text-slate-500 mt-1">Audit operational spend and fuel efficiency per asset.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleExport} className="bg-white border border-slate-200 text-slate-700 font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                        <Download className="h-5 w-5" /> Export CSV
                    </button>
                    <button onClick={() => { setShowForm(!showForm); setErrors({}); setSuccess(''); }}
                        className="bg-odoo-purple hover:bg-odoo-purple-light text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-odoo-purple/20">
                        {showForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                        {showForm ? 'Cancel' : 'Log Fuel Entry'}
                    </button>
                </div>
            </div>

            {/* Fuel Entry Form */}
            {showForm && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Fuel className="h-5 w-5 text-odoo-purple" />New Fuel Entry</h3>
                    {success && <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 flex items-center gap-2"><CheckCircle className="h-4 w-4" />{success}</div>}
                    {errors.general && <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg border border-rose-100"><AlertCircle className="h-4 w-4 inline mr-2" />{errors.general}</div>}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Vehicle</label>
                                {errors.vehicleId && <span className="text-[10px] text-rose-500 font-bold">{errors.vehicleId}</span>}
                            </div>
                            <select name="vehicleId" value={form.vehicleId} onChange={handleChange}
                                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none text-sm font-medium ${errors.vehicleId ? 'border-rose-300' : 'border-slate-200'}`}>
                                <option value="">Select Vehicle...</option>
                                {vehicles.map(v => <option key={v.id} value={v.id}>{v.name} ({v.licensePlate})</option>)}
                            </select>
                        </div>
                        {[
                            { label: 'Liters Filled', name: 'liters', placeholder: '450', error: errors.liters },
                            { label: 'Total Cost ($)', name: 'cost', placeholder: '1350.00', error: errors.cost },
                        ].map(field => (
                            <div key={field.name} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{field.label}</label>
                                    {field.error && <span className="text-[10px] text-rose-500 font-bold">{field.error}</span>}
                                </div>
                                <input type="number" name={field.name} value={form[field.name as keyof typeof form]} onChange={handleChange} placeholder={field.placeholder} step="0.01"
                                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none text-sm font-medium ${field.error ? 'border-rose-300' : 'border-slate-200'}`} />
                            </div>
                        ))}
                        <div className="col-span-full flex gap-4">
                            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">Cancel</button>
                            <button type="submit" disabled={submitting} className="px-8 py-3 rounded-xl font-bold bg-odoo-purple text-white shadow-lg shadow-odoo-purple/20 hover:bg-odoo-purple-light transition-all disabled:opacity-60 flex items-center gap-2">
                                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                                {submitting ? 'Saving...' : 'Save Entry'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* KPI Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {[
                    { icon: Fuel, label: 'Total Consumption', value: `${totalLiters.toLocaleString()} L`, badge: 'ALL TIME', badgeColor: 'text-odoo-purple bg-odoo-purple/10' },
                    { icon: DollarSign, label: 'Total Fuel Spend', value: `$${totalCost.toLocaleString('en', { minimumFractionDigits: 2 })}`, badge: '+0%', badgeColor: 'text-emerald-600 bg-emerald-50' },
                    { icon: TrendingUp, label: 'Avg. Cost per Liter', value: `$${avgCostPerLiter}`, badge: '', badgeColor: '' },
                ].map(({ icon: Icon, label, value, badge, badgeColor }) => (
                    <div key={label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 bg-odoo-purple/10 text-odoo-purple rounded-lg flex items-center justify-center"><Icon className="h-5 w-5" /></div>
                            {badge && <span className={`text-[10px] font-black px-2 py-1 rounded ${badgeColor}`}>{badge}</span>}
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">{loading ? '...' : value}</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{label}</p>
                    </div>
                ))}
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                    <h3 className="font-bold text-slate-900">Recent Expense Activity <span className="text-slate-400 font-normal">({logs.length})</span></h3>
                </div>
                {loading ? <div className="p-16 text-center"><Loader2 className="h-8 w-8 text-odoo-purple animate-spin mx-auto" /></div>
                    : logs.length === 0 ? <div className="p-16 text-center text-slate-400 font-medium">No fuel entries yet. Click "Log Fuel Entry" to add one.</div>
                        : (
                            <table className="w-full text-left">
                                <thead><tr className="bg-slate-50/50">
                                    {['Vehicle', 'Linked Trip', 'Liters', 'Total Cost', 'Date'].map(h => <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>)}
                                </tr></thead>
                                <tbody className="divide-y divide-slate-50">
                                    {logs.map(log => (
                                        <tr key={log.id} className="hover:bg-slate-50/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center"><Fuel className="h-5 w-5 text-slate-500" /></div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 text-sm">{log.vehicle.name}</p>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase">{log.vehicle.licensePlate}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-odoo-purple">{log.trip ? `${log.trip.origin} → ${log.trip.destination}` : <span className="text-slate-300 font-normal text-xs">—</span>}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 font-medium">{log.liters.toLocaleString()} L</td>
                                            <td className="px-6 py-4 text-sm font-black text-slate-900">${log.cost.toLocaleString('en', { minimumFractionDigits: 2 })}</td>
                                            <td className="px-6 py-4 text-xs text-slate-400 font-medium">{new Date(log.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
            </div>
        </div>
    );
}
