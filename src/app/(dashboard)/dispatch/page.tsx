"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Truck, User, Package, CheckCircle, AlertCircle, Loader2, Clock, ArrowRight } from 'lucide-react';

interface Vehicle { id: string; name: string; licensePlate: string; capacity: number; status: string; }
interface Driver { id: string; name: string; licenseExpiry: string; status: string; safetyScore: number; }
interface FormErrors { vehicleId?: string; driverId?: string; cargoWeight?: string; origin?: string; destination?: string; general?: string; }
interface DispatchResult { id: string; origin: string; destination: string; status: string; }

export default function DispatchPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [success, setSuccess] = useState<DispatchResult | null>(null);
    const [form, setForm] = useState({ vehicleId: '', driverId: '', cargoWeight: '', origin: '', destination: '' });

    const fetchAssets = useCallback(async () => {
        try {
            const [vRes, dRes] = await Promise.all([fetch('/api/vehicles'), fetch('/api/drivers')]);
            if (vRes.ok) setVehicles(await vRes.json());
            if (dRes.ok) setDrivers(await dRes.json());
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchAssets(); }, [fetchAssets]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name as keyof FormErrors]) setErrors(prev => { const n = { ...prev }; delete n[e.target.name as keyof FormErrors]; return n; });
    };

    const availableVehicles = vehicles.filter(v => v.status === 'AVAILABLE');
    const eligibleDrivers = drivers.filter(d => d.status === 'ON_DUTY' && new Date(d.licenseExpiry) > new Date());

    const selectedVehicle = vehicles.find(v => v.id === form.vehicleId);
    const overCapacity = selectedVehicle && form.cargoWeight ? Number(form.cargoWeight) > selectedVehicle.capacity : false;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({}); setSuccess(null);

        // Frontend pre-validation
        const fe: FormErrors = {};
        if (!form.vehicleId) fe.vehicleId = 'Please select a vehicle';
        if (!form.driverId) fe.driverId = 'Please select a driver';
        if (!form.cargoWeight || Number(form.cargoWeight) <= 0) fe.cargoWeight = 'Enter a valid cargo weight';
        if (overCapacity) fe.cargoWeight = `Exceeds vehicle capacity (${selectedVehicle!.capacity} kg)`;
        if (!form.origin.trim()) fe.origin = 'Origin is required';
        if (!form.destination.trim()) fe.destination = 'Destination is required';
        if (Object.keys(fe).length) { setErrors(fe); return; }

        setSubmitting(true);
        try {
            const res = await fetch('/api/dispatch', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, cargoWeight: Number(form.cargoWeight) }),
            });
            const data = await res.json();
            if (!res.ok) {
                if (Array.isArray(data.errors)) setErrors({ general: data.errors.join(' | ') });
                else setErrors(data.errors || { general: 'Dispatch failed.' });
            } else {
                setSuccess(data);
                setForm({ vehicleId: '', driverId: '', cargoWeight: '', origin: '', destination: '' });
                fetchAssets(); // Refresh vehicle/driver statuses
            }
        } catch { setErrors({ general: 'Network error.' }); }
        finally { setSubmitting(false); }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Trip Dispatcher</h1>
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Live Dispatch</span>
                </div>
            </header>

            <main className="p-8 flex-1 bg-odoo-bg">
                <div className="max-w-2xl mx-auto">
                    {/* Success State */}
                    {success && (
                        <div className="mb-8 bg-emerald-50 border border-emerald-200 p-6 rounded-2xl animate-in fade-in zoom-in duration-300">
                            <div className="flex items-center gap-3 mb-3">
                                <CheckCircle className="h-6 w-6 text-emerald-600" />
                                <h3 className="font-bold text-emerald-900">Trip Dispatched Successfully!</h3>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                                <MapPin className="h-4 w-4" />{success.origin}
                                <ArrowRight className="h-4 w-4 mx-1" />
                                <MapPin className="h-4 w-4" />{success.destination}
                            </div>
                            <p className="text-xs text-emerald-600 mt-2 font-mono">Trip ID: {success.id}</p>
                            <button onClick={() => setSuccess(null)} className="mt-4 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline">Dispatch another trip</button>
                        </div>
                    )}

                    {!success && (
                        <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-xl shadow-slate-100/50">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-black text-slate-900 tracking-tight">Trip Dispatcher & Management</h2>
                                <Clock className="h-5 w-5 text-slate-300" />
                            </div>

                            {errors.general && (
                                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                                    <p className="text-sm font-medium text-rose-700">{errors.general}</p>
                                </div>
                            )}

                            {loading ? <div className="py-12 text-center"><Loader2 className="h-8 w-8 text-odoo-purple animate-spin mx-auto" /></div> : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Vehicle */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Vehicle</label>
                                            {errors.vehicleId && <span className="text-[10px] text-rose-500 font-bold">{errors.vehicleId}</span>}
                                        </div>
                                        <div className="relative">
                                            <Truck className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                            <select name="vehicleId" value={form.vehicleId} onChange={handleChange}
                                                className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none text-sm font-medium appearance-none ${errors.vehicleId ? 'border-rose-300' : 'border-slate-100 focus:ring-2 focus:ring-odoo-purple/10'}`}>
                                                <option value="">Select Available Vehicle ({availableVehicles.length} ready)</option>
                                                {availableVehicles.map(v => <option key={v.id} value={v.id}>{v.name} — {v.licensePlate} (max {v.capacity.toLocaleString()} kg)</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Driver */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Driver</label>
                                            {errors.driverId && <span className="text-[10px] text-rose-500 font-bold">{errors.driverId}</span>}
                                        </div>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                            <select name="driverId" value={form.driverId} onChange={handleChange}
                                                className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none text-sm font-medium appearance-none ${errors.driverId ? 'border-rose-300' : 'border-slate-100 focus:ring-2 focus:ring-odoo-purple/10'}`}>
                                                <option value="">Select On-Duty Driver ({eligibleDrivers.length} eligible)</option>
                                                {eligibleDrivers.map(d => <option key={d.id} value={d.id}>{d.name} — Score: {d.safetyScore}</option>)}
                                            </select>
                                        </div>
                                        {eligibleDrivers.length === 0 && !loading && (
                                            <p className="text-[10px] text-amber-600 font-bold pl-1">⚠ No eligible drivers available. All must be ON_DUTY with a valid license.</p>
                                        )}
                                    </div>

                                    {/* Origin & Destination */}
                                    {[
                                        { label: 'Origin', name: 'origin', placeholder: 'e.g. Mumbai Central Depot', icon: MapPin },
                                        { label: 'Destination', name: 'destination', placeholder: 'e.g. Delhi NCR Hub', icon: MapPin },
                                    ].map(({ label, name, placeholder, icon: Icon }) => (
                                        <div key={name} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
                                                {errors[name as keyof FormErrors] && <span className="text-[10px] text-rose-500 font-bold">{errors[name as keyof FormErrors]}</span>}
                                            </div>
                                            <div className="relative">
                                                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                                <input type="text" name={name} value={form[name as keyof typeof form]} onChange={handleChange} placeholder={placeholder}
                                                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none text-sm font-medium ${errors[name as keyof FormErrors] ? 'border-rose-300' : 'border-slate-100 focus:ring-2 focus:ring-odoo-purple/10'}`} />
                                            </div>
                                        </div>
                                    ))}

                                    {/* Cargo Weight */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cargo Weight (kg)</label>
                                            {errors.cargoWeight && <span className="text-[10px] text-rose-500 font-bold">{errors.cargoWeight}</span>}
                                        </div>
                                        <div className="relative">
                                            <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                            <input type="number" name="cargoWeight" value={form.cargoWeight} onChange={handleChange} placeholder="e.g. 2500"
                                                className={`w-full pl-12 pr-16 py-4 bg-slate-50 border rounded-2xl outline-none text-sm font-bold ${overCapacity || errors.cargoWeight ? 'border-rose-300 bg-rose-50/20' : 'border-slate-100 focus:ring-2 focus:ring-odoo-purple/10'}`} />
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black text-slate-300">kg</span>
                                        </div>
                                        {overCapacity && <p className="text-[10px] text-rose-600 font-bold pl-1">⚠ Cargo exceeds vehicle capacity of {selectedVehicle!.capacity.toLocaleString()} kg</p>}
                                    </div>

                                    <button type="submit" disabled={submitting || overCapacity}
                                        className="w-full bg-odoo-purple hover:bg-odoo-purple-light text-white font-black py-5 rounded-2xl shadow-xl shadow-odoo-purple/20 transition-all active:scale-95 mt-4 tracking-wide flex items-center justify-center gap-2 disabled:opacity-60">
                                        {submitting ? <><Loader2 className="h-5 w-5 animate-spin" /> Dispatching...</> : <><ArrowRight className="h-5 w-5" /> Dispatch Trip</>}
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
