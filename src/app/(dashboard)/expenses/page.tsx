import React from 'react';
import { Fuel, DollarSign, Calendar, TrendingUp, Filter, Download, Plus, ArrowUpRight } from 'lucide-react';

const ExpensesPage = () => {
    const expenseLogs = [
        { id: 'LOG-4421', vehicle: 'Volvo FH16', plate: 'FLT-001', trip: 'T-1004', liters: '450 L', cost: '$1,350', date: '2024-02-21', status: 'Verified' },
        { id: 'LOG-4420', vehicle: 'Mercedes Sprinter', plate: 'FLT-042', trip: 'T-1003', liters: '65 L', cost: '$195', date: '2024-02-21', status: 'Pending' },
        { id: 'LOG-4419', vehicle: 'Scania R500', plate: 'FLT-009', trip: 'T-1002', liters: '520 L', cost: '$1,560', date: '2024-02-20', status: 'Verified' },
    ];

    return (
        <div className="p-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Fuel & Expense Logging</h1>
                    <p className="text-slate-500 mt-1">Audit operational spend and fuel efficiency per asset.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 text-slate-700 font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                        <Download className="h-5 w-5" />
                        <span>Export Logs</span>
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-100">
                        <Plus className="h-5 w-5" />
                        <span>Log Fuel Entry</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                            <Fuel className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded">THIS WEEK</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">4,250 Liters</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Total Consumption</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                            <DollarSign className="h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 text-xs font-black">
                            <ArrowUpRight className="h-3 w-3" /> 4.2%
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">$12,750.00</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Total Fuel Spend</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">$0.85</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Avg. Cost per KM</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-slate-400" />
                        Recent Expense Activity
                    </h3>
                    <button className="text-xs font-bold text-slate-400 flex items-center gap-2 hover:text-indigo-600 transition-colors">
                        <Filter className="h-3.5 w-3.5" /> Filter by Asset
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Detail</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Linked Trip</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Liters</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Cost</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {expenseLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                                                <Fuel className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">{log.vehicle}</p>
                                                <p className="text-[10px] font-black text-slate-400 tracking-tighter uppercase">{log.id} • {log.date}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-indigo-600">
                                        {log.trip}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                                        {log.liters}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-black text-slate-900">
                                        {log.cost}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`status-pill ${log.status === 'Verified' ? 'status-pill-green' : 'status-pill-yellow'}`}>
                                            {log.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-slate-50 text-center">
                    <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors">
                        Load More Expenditure Logs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExpensesPage;
