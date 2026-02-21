"use client";

import React from 'react';
import {
    Truck,
    AlertTriangle,
    Package,
    UserCheck,
    Search,
    Bell,
    MoreVertical,
    ChevronRight,
    Filter
} from 'lucide-react';

const DashboardPage = () => {
    const kpis = [
        { label: 'Active Fleet', value: '1,438', sub: 'Active Fleet', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Maintenance Alerts', value: '4', sub: 'Maintenance Alerts', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50' },
        { label: 'Pending Cargo', value: '44', sub: 'Pending Cargo', icon: Package, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Driver Performance', value: '25%', sub: 'Pending Logs', icon: UserCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    ];

    const pendingCargo = [
        { id: 'Cargo-021', name: 'Westminster City', status: 'Pending', color: 'bg-slate-100 text-slate-600' },
        { id: 'Cargo-045', name: 'Greater London', status: 'Pending', color: 'bg-slate-100 text-slate-600' },
        { id: 'Cargo-092', name: 'Greater London', status: 'Assigned', color: 'bg-emerald-50 text-emerald-600' },
        { id: 'Cargo-042', name: 'Greater London', status: 'Finished', color: 'bg-blue-50 text-blue-600' },
        { id: 'Cargo-055', name: 'Greater London', status: 'Pending', color: 'bg-slate-100 text-slate-600' },
    ];

    const vehicles = [
        { name: 'Vehicle', id: 'G-04325', type: 'Vehicle', date: '04.12.2023', time: '12 min ago' },
        { name: 'Vehicle', id: 'G-01002', type: 'Vehicle', date: '04.12.2023', time: '15 min ago' },
        { name: 'Vehicle', id: 'G-09055', type: 'Vehicle', date: '04.12.2023', time: '18 min ago' },
        { name: 'Vehicle', id: 'G-10043', type: 'Vehicle', date: '04.12.2023', time: '14 min ago' },
        { name: 'Vehicle', id: 'G-03221', type: 'Vehicle', date: '04.12.2023', time: '15 min ago' },
        { name: 'Vehicle', id: 'G-10034', type: 'Vehicle', date: '04.12.2023', time: '21 min ago' },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Header */}
            <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Dashboard</h1>
                <div className="flex items-center gap-6">
                    <div className="relative group flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl max-w-xs transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white focus-within:border-blue-200">
                        <Search className="h-4 w-4 text-slate-400" />
                        <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-48 font-medium placeholder:text-slate-400" />
                    </div>
                    <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
                        <Bell className="h-6 w-6" />
                        <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                        <Truck className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-bold text-slate-600">Vehicles</span>
                        <Filter className="h-4 w-4 text-slate-400" />
                    </div>
                </div>
            </header>

            <main className="p-8 space-y-8 bg-slate-50/30 flex-1">
                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map((kpi, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
                            <div className={`p-4 rounded-2xl ${kpi.bg} ${kpi.color}`}>
                                <kpi.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 leading-none">{kpi.value}</h3>
                                <p className="text-slate-400 text-xs font-bold uppercase mt-2 tracking-widest">{kpi.label}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-[10px] text-slate-300 font-medium">{kpi.sub}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Areas */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Pending Cargo */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-black text-slate-900 tracking-tight">Pending Cargo</h3>
                                <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">See all</button>
                            </div>
                            <div className="space-y-4">
                                {pendingCargo.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                                                <Package className="h-5 w-5 text-slate-300" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 leading-none">{item.id}</p>
                                                <p className="text-[10px] text-slate-400 font-medium mt-1">{item.name}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${item.color}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Vehicles Table */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
                            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <h3 className="font-black text-slate-900 tracking-tight">Vehicles</h3>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-slate-50 rounded-lg text-xs outline-none w-48 font-medium" />
                                </div>
                            </div>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="w-12 px-6 py-4">
                                            <input type="checkbox" className="rounded border-slate-200" />
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle ID</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">License Plate</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Model</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Registered</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {vehicles.map((v, i) => (
                                        <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <input type="checkbox" className="rounded border-slate-200" />
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{v.name}</td>
                                            <td className="px-6 py-4 text-xs font-black text-slate-900 uppercase tracking-tight">{v.id}</td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-500">Vehicle</td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-500">{v.date}</td>
                                            <td className="px-6 py-4">
                                                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
                                                    {v.time}
                                                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 bg-slate-50/50 mt-auto flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <span>Total Logs</span>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4].map(n => (
                                        <button key={n} className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${n === 1 ? 'bg-blue-600 text-white' : 'hover:bg-slate-100'}`}>{n}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
