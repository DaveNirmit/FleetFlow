"use client";

import React from 'react';
import { Wrench, AlertCircle, CheckCircle2, History, Calendar, DollarSign, PenTool } from 'lucide-react';

const MaintenancePage = () => {
    const serviceQueue = [
        { id: 'SRV-882', vehicle: 'Scania R500', plate: 'FLT-009', issue: 'Engine Oil Pressure Low', date: '2024-02-21', status: 'In Progress', cost: '$1,200' },
        { id: 'SRV-881', vehicle: 'Volvo FH16', plate: 'FLT-001', issue: 'Brake Pad Replacement', date: '2024-02-20', status: 'Pending', cost: '$450' },
    ];

    return (
        <div className="p-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Maintenance & Health logs</h1>
                    <p className="text-slate-500 mt-1">Manage preventative service and reactive repairs.</p>
                </div>
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-100">
                    <PenTool className="h-5 w-5" />
                    <span>Log New Service</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                        <AlertCircle className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">5</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase mt-1">Vehicles in Shop</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">12</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase mt-1">Completed (MTD)</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
                    <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                        <DollarSign className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">$18,450.00</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase mt-1">Total Maintenance Spend (MTD)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Service Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-8">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Wrench className="h-5 w-5 text-amber-500" />
                            Service Initiation
                        </h2>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Vehicle</label>
                                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500/20">
                                    <option>Select Vehicle to Service...</option>
                                    <option>Volvo FH16 (FLT-001)</option>
                                    <option>Mercedes Sprinter (FLT-042)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Category</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Engine', 'Brakes', 'Tires', 'Electrical'].map(cat => (
                                        <button type="button" key={cat} className="py-2 text-xs font-bold bg-white border border-slate-100 rounded-lg hover:border-amber-400 hover:bg-amber-50 transition-colors">
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Details / Notes</label>
                                <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none h-24" placeholder="Describe the issue..."></textarea>
                            </div>

                            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex gap-3">
                                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                                <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
                                    <b>CRITICAL ACTION</b>: Logging this service will automatically switch vehicle status to <span className="underline font-bold">IN SHOP</span> and hide it from all dispatchers.
                                </p>
                            </div>

                            <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-slate-200 uppercase tracking-widest text-xs">
                                LOCK VEHICLE & START SERVICE
                            </button>
                        </form>
                    </div>
                </div>

                {/* Live Service Logs */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <History className="h-5 w-5 text-slate-400" />
                                Active Maintenance Logs
                            </h3>
                            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-widest">Audit Trail</span>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {serviceQueue.map((log) => (
                                <div key={log.id} className="p-6 hover:bg-slate-50/50 transition-colors flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                                            <Wrench className="h-6 w-6 text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-black text-slate-400">{log.id}</span>
                                                <h4 className="font-bold text-slate-900">{log.vehicle}</h4>
                                                <span className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{log.plate}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 font-medium">{log.issue}</p>
                                            <div className="flex gap-3 mt-2">
                                                <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase font-bold tracking-tighter">
                                                    <Calendar className="h-3 w-3" /> {log.date}
                                                </span>
                                                <span className="text-[10px] text-slate-400 flex items-center gap-1 uppercase font-bold tracking-tighter">
                                                    <DollarSign className="h-3 w-3" /> {log.cost}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`status-pill ${log.status === 'In Progress' ? 'status-pill-blue' : 'status-pill-yellow'}`}>
                                            {log.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-slate-50 text-center">
                            <button className="text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                                View Complete Maintenance History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaintenancePage;
