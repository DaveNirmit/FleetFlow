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
        <aside className="fixed left-0 top-0 h-screen w-64 bg-odoo-purple flex flex-col z-50 shadow-lg">
            <div className="p-6 flex items-center gap-3 border-b border-white/10">
                <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Truck className="text-white h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">FleetFlow</span>
            </div>

            <nav className="flex-1 mt-6 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${isActive
                                ? 'bg-white/10 text-white font-semibold'
                                : 'text-white/70 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white transition-colors'}`} />
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 mt-auto">
                <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-rose-500/10 hover:text-rose-400 transition-all">
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>

            <div className="p-4 border-t border-white/10 bg-black/10">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shadow-sm overflow-hidden text-white font-bold text-xs">
                        JD
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">John Doe</p>
                        <p className="text-[10px] text-white/50 font-medium uppercase tracking-tighter">Fleet Manager</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
