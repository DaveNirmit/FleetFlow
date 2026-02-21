import React from 'react';
import Link from 'next/link';
import { ArrowRight, Truck, ShieldCheck, BarChart3, Clock } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <nav className="p-6 flex justify-between items-center border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-indigo-600 rounded flex items-center justify-center">
                        <Truck className="text-white h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">FleetFlow</span>
                </div>
                <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                    Sign In
                </Link>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-24 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-8 uppercase tracking-wider">
                    <ShieldCheck className="h-4 w-4" />
                    Enterprise Fleet Intelligence
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8">
                    The Central Nervous System <br />
                    <span className="text-indigo-600">for Your Logistics.</span>
                </h1>

                <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-12 font-medium">
                    Replace manual logs with a rule-based digital hub. Optimize lifecycle, monitor safety, and audit financial performance in one premium dashboard.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-24">
                    <Link href="/dashboard" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-slate-200 group">
                        Go to Command Center
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/dispatch" className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center">
                        View Dispatch Hub
                    </Link>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 text-left">
                        <Clock className="h-10 w-10 text-indigo-600 mb-6" />
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Dispatch</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">Validate cargo vs capacity and driver compliance instantly before any transit begins.</p>
                    </div>
                    <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 text-left">
                        <ShieldCheck className="h-10 w-10 text-emerald-600 mb-6" />
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Safety Enforcement</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">Automatic blocking of expired licenses and tracking of individual safety scores.</p>
                    </div>
                    <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 text-left">
                        <BarChart3 className="h-10 w-10 text-amber-600 mb-6" />
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Financial Audits</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">Analyze cost-per-km and vehicle ROI with automated fuel and maintenance aggregation.</p>
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t border-slate-100 text-center">
                <p className="text-slate-400 text-sm font-medium">© 2024 FleetFlow • Precision Logistics Management</p>
            </footer>
        </div>
    );
};

export default LandingPage;
