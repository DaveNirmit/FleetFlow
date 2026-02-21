"use client";

import React from 'react';
import { MapPin, Truck, User, Package, Clock, PlayCircle } from 'lucide-react';

const DispatchPage = () => {
    const activeTrips = [
        { id: 'Cargo 021', name: 'Westminster City', status: 'Pending', time: '12 min ago' },
        { id: 'Cargo 045', name: 'Greater London', status: 'Pending', time: '15 min ago' },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Trip Dispatcher</h1>
                <div className="flex items-center gap-3">
                    <PlayCircle className="h-6 w-6 text-blue-600" />
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Dispatch Sync</span>
                </div>
            </header>

            <main className="p-8 space-y-8 bg-slate-50/30 flex-1 flex items-center justify-center">

                {/* Trip Dispatcher & Management Card (as seen in central bottom image) */}
                <div className="bg-white w-full max-w-xl p-10 rounded-[40px] border border-slate-100 shadow-2xl shadow-blue-100/30">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Trip Dispatcher & Management</h2>
                        <button className="text-slate-300 hover:text-slate-600">
                            <Clock className="h-5 w-5" />
                        </button>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Vehicle</label>
                            <div className="relative">
                                <Truck className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white text-sm font-medium appearance-none">
                                    <option>Select Vehicle</option>
                                    <option>Volvo FH16 (FLT-001)</option>
                                    <option>Scania R500 (FLT-009)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Driver</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white text-sm font-medium appearance-none">
                                    <option>Select Driver</option>
                                    <option>Alex Johnson</option>
                                    <option>Sarah Connor</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cargo Weight</label>
                            <div className="relative">
                                <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                <input
                                    type="number"
                                    placeholder="200"
                                    className="w-full pl-12 pr-16 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white text-sm font-bold"
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black text-slate-300">kg</span>
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[24px] shadow-xl shadow-blue-100 transition-all active:scale-95 mt-4 tracking-wide">
                            Dispatch Trip
                        </button>
                    </form>
                </div>

            </main>
        </div>
    );
};

export default DispatchPage;
