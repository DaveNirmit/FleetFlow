import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { StatusPill } from '@/components/common/StatusPill';
import { format } from 'date-fns';
import { Users, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Drivers() {
    const [drivers, setDrivers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    const fetchDrivers = async () => {
        try {
            setLoading(true);
            const { data, error: sbError } = await supabase
                .from('drivers')
                .select('*')
                .order('created_at', { ascending: false });

            if (sbError) throw sbError;
            setDrivers(data || []);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to fetch drivers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrivers();

        const channel = supabase
            .channel('drivers_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'drivers' }, () => {
                fetchDrivers();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const filtered = drivers.filter(d =>
        d.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Drivers</h2>
                {/* Potentially add "Create Driver" button here later if requested */}
            </div>

            {error && (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
                    {error}
                </div>
            )}

            <div className="bg-card rounded-xl border border-border overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
                <div className="p-4 border-b border-border">
                    <div className="relative max-w-sm">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search drivers by name..."
                            className="pl-9"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                                <th className="text-left px-4 py-3 font-medium text-muted-foreground">License Expiry</th>
                                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Safety Score</th>
                                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && drivers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                        Loading drivers...
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                        {search ? 'No drivers match your search.' : 'No drivers found.'}
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(d => (
                                    <tr key={d.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-4 text-foreground font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                                    {d.name?.charAt(0) || <Users size={14} />}
                                                </div>
                                                {d.name}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-muted-foreground">
                                            {d.license_expiry_date ? format(new Date(d.license_expiry_date), 'MMM dd, yyyy') : 'N/A'}
                                        </td>
                                        <td className="px-4 py-4">
                                            <StatusPill status={d.status} />
                                        </td>
                                        <td className="px-4 py-4 text-foreground font-medium">
                                            {d.safety_score}
                                        </td>
                                        <td className="px-4 py-4 text-muted-foreground">
                                            {d.created_at ? format(new Date(d.created_at), 'MMM dd, yyyy HH:mm') : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
