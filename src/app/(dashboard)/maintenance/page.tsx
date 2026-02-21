"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Wrench, AlertCircle, CheckCircle2, DollarSign, History, Loader2, CheckCircle, Calendar, PenTool } from 'lucide-react';

interface Vehicle { id: string; name: string; licensePlate: string; status: string; }
interface MaintenanceLog {
    id: string; description: string; cost: number; date: string;
    vehicle: { name: string; licensePlate: string; };
}
interface FormErrors { vehicleId?: string; description?: string; cost?: string; category?: string; general?: string; }

const CATEGORIES = ['Engine', 'Brakes', 'Tires', 'Electrical', 'Transmission', 'Suspension'];

export default function MaintenancePage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [logs, setLogs] = useState<MaintenanceLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [success, setSuccess] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [form, setForm] = useState({ vehicleId: '', description: '', cost: '' });

    const fetchData = useCallback(async () => {
        try {
            const [vRes, lRes] = await Promise.all([fetch('/api/vehicles'), fetch('/api/maintenance')]);
            if (vRes.ok) setVehicles(await vRes.json());
            if (lRes.ok) setLogs(await lRes.json());
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name as keyof FormErrors]) setErrors(prev => { const n = { ...prev }; delete n[e.target.name as keyof FormErrors]; return n; });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({}); setSuccess('');
        setSubmitting(true);
        const desc = selectedCategory ? `[${selectedCategory}] ${form.description}` : form.description;
        try {
            const res = await fetch('/api/maintenance', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vehicleId: form.vehicleId, description: desc, cost: Number(form.cost) }),
            });
            const data = await res.json();
            if (!res.ok) { setErrors(data.errors || { general: 'Failed to log service' }); }
            else {
                setSuccess('✓ Service logged. Vehicle is now IN SHOP.');
                setForm({ vehicleId: '', description: '', cost: '' });
                setSelectedCategory('');
                fetchData();
                setTimeout(() => setSuccess(''), 5000);
            }
        } catch { setErrors({ general: 'Network error.' }); }
        finally { setSubmitting(false); }
    };

    const totalSpend = logs.reduce((sum, l) => sum + l.cost, 0);
    const inShopCount = vehicles.filter(v => v.status === 'IN_SHOP').length;

    return (
        <div className="p-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Maintenance & Health Logs</h1>
                    <p className="text-slate-500 mt-1">Manage preventative service and reactive repairs.</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {[
                    { icon: AlertCircle, label: 'Vehicles In Shop', value: inShopCount, bg: 'bg-amber-50', color: 'text-amber-600' },
                    { icon: CheckCircle2, label: 'Total Logs', value: logs.length, bg: 'bg-emerald-50', color: 'text-emerald-600' },
                    { icon: DollarSign, label: 'Total Spend', value: `$${totalSpend.toLocaleString('en', { minimumFractionDigits: 2 })}`, bg: 'bg-odoo-purple/10', color: 'text-odoo-purple', span: 'lg:col-span-1' },
                ].map(({ icon: Icon, label, value, bg, color }) => (
                    <div key={label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className={`h-10 w-10 ${bg} ${color} rounded-lg flex items-center justify-center`}><Icon className="h-5 w-5" /></div>
                        <div><h3 className="text-2xl font-bold text-slate-800">{loading ? '...' : value}</h3><p className="text-slate-500 text-xs font-bold uppercase mt-1">{label}</p></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Service Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-8">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Wrench className="h-5 w-5 text-amber-500" />Service Initiation</h2>
                        {success && <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 flex items-center gap-2"><CheckCircle className="h-4 w-4" />{success}</div>}
                        {errors.general && <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg border border-rose-100"><AlertCircle className="h-4 w-4 inline mr-2" />{errors.general}</div>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Vehicle Select */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Vehicle</label>
                                    {errors.vehicleId && <span className="text-[10px] text-rose-500 font-bold">{errors.vehicleId}</span>}
                                </div>
                                <select name="vehicleId" value={form.vehicleId} onChange={handleChange}
                                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500/20 ${errors.vehicleId ? 'border-rose-300' : 'border-slate-200'}`}>
                                    <option value="">Select Vehicle to Service...</option>
                                    {vehicles.filter(v => v.status !== 'RETIRED').map(v => (
                                        <option key={v.id} value={v.id}>{v.name} ({v.licensePlate}) — {v.status.replace('_', ' ')}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Category Picker */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Category</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {CATEGORIES.map(cat => (
                                        <button type="button" key={cat} onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
                                            className={`py-2 text-xs font-bold rounded-lg transition-colors ${selectedCategory === cat ? 'bg-amber-500 text-white border-amber-500' : 'bg-white border border-slate-100 hover:border-amber-400 hover:bg-amber-50'}`}>
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Details / Notes</label>
                                    {errors.description && <span className="text-[10px] text-rose-500 font-bold">{errors.description}</span>}
                                </div>
                                <textarea name="description" value={form.description} onChange={handleChange} className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm outline-none h-24 ${errors.description ? 'border-rose-300' : 'border-slate-200'}`} placeholder="Describe the issue in detail..." />
                            </div>

                            {/* Cost */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimated Cost ($)</label>
                                    {errors.cost && <span className="text-[10px] text-rose-500 font-bold">{errors.cost}</span>}
                                </div>
                                <input type="number" name="cost" value={form.cost} onChange={handleChange} placeholder="0.00"
                                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-lg text-sm outline-none ${errors.cost ? 'border-rose-300' : 'border-slate-200'}`} />
                            </div>

                            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex gap-3">
                                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                                <p className="text-[11px] text-amber-700 font-medium leading-relaxed"><b>CRITICAL ACTION</b>: Logging this service will automatically switch vehicle status to <span className="underline font-bold">IN SHOP</span>.</p>
                            </div>

                            <button type="submit" disabled={submitting} className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-lg uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-60">
                                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />Processing...</> : <><PenTool className="h-4 w-4" />Lock Vehicle & Start Service</>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Logs Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><History className="h-5 w-5 text-slate-400" />Active Maintenance Logs</h3>
                            <span className="text-[10px] font-black text-odoo-purple bg-odoo-purple/10 px-2.5 py-1 rounded-full uppercase tracking-widest">Audit Trail</span>
                        </div>
                        {loading ? <div className="p-16 text-center"><Loader2 className="h-8 w-8 text-odoo-purple animate-spin mx-auto" /></div>
                            : logs.length === 0 ? <div className="p-16 text-center text-slate-400 font-medium">No maintenance logs yet.</div>
                                : (
                                    <div className="divide-y divide-slate-50">
                                        {logs.map(log => (
                                            <div key={log.id} className="p-6 hover:bg-slate-50/50 transition-colors flex items-center justify-between">
                                                <div className="flex gap-4">
                                                    <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center"><Wrench className="h-6 w-6 text-slate-400" /></div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className="font-bold text-slate-900">{log.vehicle.name}</h4>
                                                            <span className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{log.vehicle.licensePlate}</span>
                                                        </div>
                                                        <p className="text-xs text-slate-500 font-medium">{log.description}</p>
                                                        <div className="flex gap-3 mt-2">
                                                            <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase font-bold"><Calendar className="h-3 w-3" />{new Date(log.date).toLocaleDateString()}</span>
                                                            <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase font-bold"><DollarSign className="h-3 w-3" />${log.cost.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                    </div>
                </div>
            </div>
        </div>
    );
}
