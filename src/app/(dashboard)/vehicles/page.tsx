"use client";

import React from 'react';
import { Truck, Plus, Search, Filter, MoreVertical, ChevronRight } from 'lucide-react';

const VehicleRegistry = () => {
    const vehicles = [
        { name: 'Vehicle', id: 'G-04325', type: 'Truck', date: '04.12.2023', plate: 'FLT-001', status: 'Available' },
        { name: 'Vehicle', id: 'G-01002', type: 'Van', date: '04.12.2023', plate: 'FLT-042', status: 'On Trip' },
        { name: 'Vehicle', id: 'G-09055', type: 'Truck', date: '04.12.2023', plate: 'FLT-009', status: 'In Shop' },
        { name: 'Vehicle', id: 'G-10043', type: 'Truck', date: '04.12.2023', plate: 'FLT-088', status: 'Available' },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Vehicle Registry</h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-2.5 rounded-xl shadow-lg shadow-blue-100 flex items-center gap-2 transition-all active:scale-95">
                    <Plus className="h-5 w-5" />
                    Register Vehicle
                </button>
            </header>

            <main className="p-8 space-y-8 bg-slate-50/30 flex-1">

                {/* Registration Form (as seen in the bottom-left image) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm sticky top-28">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                <Truck className="h-5 w-5 text-blue-600" />
                                Vehicle Registration
                            </h3>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vehicle Name/Model</label>
                                    <input type="text" placeholder="Enter model name" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white text-sm font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">License Plate</label>
                                    <input type="text" placeholder="ABC-1234" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white text-sm font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Max Capacity (kg)</label>
                                    <input type="number" placeholder="5000" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white text-sm font-medium" />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-50 transition-colors">Cancel</button>
                                    <button type="button" className="flex-1 px-4 py-3 rounded-xl font-black bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* List Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
                            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <h3 className="font-black text-slate-900 tracking-tight text-sm uppercase tracking-widest">Active Inventory</h3>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    <input type="text" placeholder="Quick search..." className="pl-9 pr-4 py-1.5 bg-slate-50 rounded-lg text-xs outline-none w-48 font-medium" />
                                </div>
                            </div>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Model</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">License</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {vehicles.map((v, i) => (
                                        <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                                            <td className="px-6 py-4 font-bold text-slate-800 text-sm">{v.name}</td>
                                            <td className="px-6 py-4 text-xs font-black text-blue-600 uppercase">{v.plate}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${v.status === 'Available' ? 'bg-emerald-50 text-emerald-600' :
                                                    v.status === 'In Shop' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                                                    }`}>
                                                    {v.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                                    <MoreVertical className="h-4 w-4 text-slate-300" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VehicleRegistry;
