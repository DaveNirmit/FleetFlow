"use client";

import React from 'react';
import { Users, Shield, Calendar, Award, MoreVertical, AlertCircle, CheckCircle2, UserPlus, Search } from 'lucide-react';

const DriverProfiles = () => {
    const drivers = [
        { id: 'DRV-001', name: 'Alex Johnson', email: 'alex.j@fleetflow.com', license: 'TX-99281', expiry: '2025-08-12', status: 'On Duty', score: 98, color: 'green' },
        { id: 'DRV-042', name: 'Sarah Connor', email: 's.connor@fleetflow.com', license: 'CA-11203', expiry: '2024-12-05', status: 'On Duty', score: 95, color: 'green' },
        { id: 'DRV-009', name: 'Michael Chen', email: 'm.chen@fleetflow.com', license: 'NY-44092', expiry: '2024-03-30', status: 'Suspended', score: 62, color: 'red' },
        { id: 'DRV-088', name: 'James Miller', email: 'j.miller@fleetflow.com', license: 'WA-88271', expiry: '2023-11-15', status: 'Off Duty', score: 89, color: 'yellow' },
    ];

    return (
        <div className="p-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Driver Performance & Safety</h1>
                    <p className="text-slate-500 mt-1">Monitor compliance, license validity, and safety metrics.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-100">
                    <UserPlus className="h-5 w-5" />
                    <span>Add New Driver</span>
                </button>
            </div>

            {/* Compliance Warning Bar (Mock Logic) */}
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-rose-500 rounded-full flex items-center justify-center text-white">
                        <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-rose-900 uppercase tracking-tight">Critical Compliance Alert</p>
                        <p className="text-xs text-rose-600 font-medium">1 Driver (James Miller) has an expired license. Assignments are currently <span className="underline font-black">BLOCKED</span>.</p>
                    </div>
                </div>
                <button className="text-xs font-black text-rose-700 bg-rose-100 px-4 py-2 rounded-lg hover:bg-rose-200 transition-colors uppercase">
                    Renew License
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">124</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Drivers</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">118</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">On-Duty / Ready</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                        <Shield className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">92.4%</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Safety Rating</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
                        <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">3</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiring Soon</p>
                    </div>
                </div>
            </div>

            {/* Driver List */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input type="text" placeholder="Search by name, license, or status..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-lg">All Status</button>
                        <button className="px-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg">High Scores</button>
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Driver Identity</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">License Compliance</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Safety Score</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {drivers.map((driver) => (
                            <tr key={driver.id} className="hover:bg-slate-50/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-slate-50">
                                            {driver.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{driver.name}</p>
                                            <p className="text-xs text-slate-400 font-medium">{driver.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">{driver.license}</p>
                                        <p className={`text-[11px] font-bold ${new Date(driver.expiry) < new Date() ? 'text-rose-500' : 'text-slate-400'}`}>
                                            Expiry: {driver.expiry}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 max-w-[100px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${driver.score > 90 ? 'bg-emerald-500' : driver.score > 70 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${driver.score}%` }} />
                                        </div>
                                        <span className="text-sm font-black text-slate-700">{driver.score}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`status-pill status-pill-${driver.color}`}>
                                        {driver.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DriverProfiles;
