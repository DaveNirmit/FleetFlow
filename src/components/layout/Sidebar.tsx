"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Truck,
    MapPin,
    Wrench,
    FileText,
    Users,
    BarChart2,
    LogOut,
    Bell,
    Search
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: Truck, label: 'Vehicle Registry', href: '/vehicles' },
        { icon: MapPin, label: 'Trip Dispatcher', href: '/dispatch' },
        { icon: Wrench, label: 'Maintenance', href: '/maintenance' },
        { icon: Users, label: 'Drivers', href: '/drivers' },
        { icon: FileText, label: 'Expenses', href: '/expenses' },
        { icon: BarChart2, label: 'Reports', href: '/reports' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-50 shadow-sm">
            <div className="p-6 flex items-center gap-3 border-b border-slate-50">
                <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                    <Truck className="text-white h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-slate-800 tracking-tight">FleetFlow</span>
            </div>

            <nav className="flex-1 mt-6 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                ? 'bg-blue-50 text-blue-600 font-bold'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'group-hover:text-blue-500 transition-colors'}`} />
                            <span className="text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-50 mt-auto">
                <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all">
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden text-blue-600 font-bold text-xs ring-2 ring-blue-50/50">
                        JD
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-900 truncate">John Doe</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Fleet Manager</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
