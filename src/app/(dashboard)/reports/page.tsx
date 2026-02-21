"use client";

import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    BarChart2,
    PieChart,
    Calendar,
    Search,
    ChevronDown,
    Download
} from 'lucide-react';
import { exportToCSV } from '@/lib/utils/export';

const AnalyticsPage = () => {
    const summary = [
        { vehicle: 'Vehicle', fuel: '10%', cost: '$5.00', count: '0.2%', total: '$9,000', amount: '$300.00' },
        { vehicle: 'Fuel Efficiency Trend', fuel: '10%', cost: '$255.00', count: '2.5%', total: '$25,000', amount: '$10,250.00' },
        { vehicle: 'Total Operational Cost', fuel: '36%', cost: '$318.00', count: '100%', total: '$100.00', amount: '$8,450.00' },
        { vehicle: 'Total', fuel: '56%', cost: '$578.00', count: '100.0%', total: '$50.00', amount: '$18,700.00' },
    ];

    const handleExport = () => {
        exportToCSV(summary, 'FleetFlow_Operational_Audit');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Operational Analytics</h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                    >
                        <Download className="h-4 w-4" />
                        Export Audit (CSV)
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600">
                        All Vehicles <ChevronDown className="h-4 w-4" />
                    </button>
                </div>
            </header>

            <main className="p-8 space-y-8 bg-slate-50/30 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Chart 1: Fuel Efficiency */}
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-8">Fuel Efficiency Trend</h3>
                        <div className="h-64 flex items-end justify-between px-4 pb-2 relative">
                            {/* Mock Chart Lines */}
                            <div className="absolute inset-0 p-8 flex items-end">
                                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                                    <path d="M0,180 Q100,20 200,100 T400,50" fill="none" stroke="#2563eb" strokeWidth="4" />
                                    <path d="M0,180 Q100,20 200,100 T400,50 L400,200 L0,200 Z" fill="url(#gradient)" opacity="0.1" />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                                            <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 0 }} />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            {[1, 2, 3, 4, 5, 6].map(m => (
                                <span key={m} className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Month {m}</span>
                            ))}
                        </div>
                    </div>

                    {/* Chart 2: Total Operational Cost Vertical Bars */}
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-8">Total Operational Cost</h3>
                        <div className="h-64 flex items-end justify-between gap-4 px-4 pb-2">
                            {[40, 25, 85, 65, 45, 95, 75].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full bg-blue-600 rounded-lg group-hover:brightness-110 transition-all cursor-pointer" style={{ height: `${h}%` }} />
                                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Sep {i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Summary Table */}
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-50">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">Summary</h3>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fuel</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cost</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Profit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {summary.map((row, i) => (
                                <tr key={i} className={`hover:bg-slate-50/30 transition-colors ${i === summary.length - 1 ? 'font-black bg-slate-50/50' : ''}`}>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-700">{row.vehicle}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{row.fuel}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{row.cost}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{row.count}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{row.total}</td>
                                    <td className="px-6 py-4 text-xs font-black text-slate-900">{row.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AnalyticsPage;
