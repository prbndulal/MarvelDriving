"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, Check, X, RefreshCw, Filter, Calendar, Mail, Phone, CreditCard, MoreHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BookingsPage() {
    const [filter, setFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const { toast } = useToast();
    const supabase = createClient();

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        let query = supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (statusFilter !== "all") {
            query = query.eq('status', statusFilter);
        }

        const { data, error } = await query;

        if (error) {
            toast({
                title: "Error fetching bookings",
                description: error.message,
                variant: "destructive"
            });
        } else {
            setBookings(data || []);
        }
        setLoading(false);
    }, [statusFilter, supabase, toast]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const updateBookingStatus = async (id: string, newStatus: string) => {
        setUpdatingId(id);
        const { error } = await supabase
            .from('bookings')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            toast({
                title: "Update failed",
                description: error.message,
                variant: "destructive"
            });
        } else {
            toast({
                title: "Booking updated",
                description: `Status changed to ${newStatus}`,
            });
            // Update local state instead of refetching for speed
            setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
        }
        setUpdatingId(null);
    };

    const deleteBooking = async (id: string) => {
        if (!confirm("Are you sure you want to delete this booking?")) return;

        const { error } = await supabase
            .from('bookings')
            .delete()
            .eq('id', id);

        if (error) {
            toast({
                title: "Delete failed",
                description: error.message,
                variant: "destructive"
            });
        } else {
            setBookings(prev => prev.filter(b => b.id !== id));
            toast({
                title: "Booking deleted",
                description: "The record has been permanently removed.",
            });
        }
    };

    const filteredBookings = bookings.filter(b => 
        b.customer_name.toLowerCase().includes(filter.toLowerCase()) ||
        b.customer_email.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#0a2f14] tracking-tight">Bookings</h1>
                    <p className="text-gray-500 font-medium">Manage driving lessons and equipment hire</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Student name or email..."
                            className="pl-10 h-11 border-gray-200 rounded-xl bg-white shadow-sm"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-11 w-11 rounded-xl border-gray-200 bg-white"
                        onClick={fetchBookings}
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'confirmed', 'cancelled'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-5 py-2 rounded-full text-sm font-bold capitalize transition-all ${
                            statusFilter === status 
                            ? "bg-[#1e5128] text-white shadow-md" 
                            : "bg-white text-gray-500 border border-gray-200 hover:border-[#1e5128]/30"
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-5 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Student</th>
                                <th className="px-6 py-5 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Date & Time</th>
                                <th className="px-6 py-5 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Lesson Type</th>
                                <th className="px-6 py-5 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-5 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Payment</th>
                                <th className="px-6 py-5 text-xs font-extrabold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="px-6 py-10 text-center text-gray-400">Loading data...</td>
                                    </tr>
                                ))
                            ) : filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Calendar className="h-10 w-10 text-gray-200" />
                                            <p className="text-gray-500 font-bold">No bookings found matching your criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-extrabold text-[#0a2f14] tracking-tight">{booking.customer_name}</span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1.5 mt-1 font-medium italic">
                                                    <Mail className="h-3 w-3" /> {booking.customer_email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col text-sm font-bold text-gray-600">
                                                <span className="flex items-center gap-2">
                                                    <Calendar className="h-3.5 w-3.5 text-[#1e5128]" />
                                                    {format(new Date(booking.booking_date), 'MMM dd, yyyy')}
                                                </span>
                                                <span className="mt-1 text-gray-400 font-medium">at {booking.booking_time}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-extrabold">
                                                {booking.lesson_type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${
                                                booking.status === "confirmed" ? "bg-green-100 text-green-700" :
                                                booking.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                                "bg-red-100 text-red-700"
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <CreditCard className={`h-4 w-4 ${booking.payment_status === "paid" ? "text-green-500" : "text-gray-300"}`} />
                                                <span className={`text-xs font-bold ${booking.payment_status === "paid" ? "text-green-600" : "text-gray-400"}`}>
                                                    {booking.payment_status?.toUpperCase()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-gray-100">
                                                        <MoreHorizontal className="h-5 w-5 text-gray-400" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-gray-100 shadow-xl">
                                                    <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Update Status</DropdownMenuLabel>
                                                    <DropdownMenuItem 
                                                        onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                                        className="rounded-xl flex items-center gap-3 py-3 px-3 cursor-pointer focus:bg-green-50 focus:text-green-700"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                        <span className="font-bold">Confirm Booking</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                                        className="rounded-xl flex items-center gap-3 py-3 px-3 cursor-pointer focus:bg-red-50 focus:text-red-700"
                                                    >
                                                        <X className="h-4 w-4" />
                                                        <span className="font-bold">Cancel Booking</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="my-2 bg-gray-50" />
                                                    <DropdownMenuItem 
                                                        onClick={() => deleteBooking(booking.id)}
                                                        className="rounded-xl flex items-center gap-3 py-3 px-3 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
                                                    >
                                                        <X className="h-4 w-4" />
                                                        <span className="font-bold">Permanently Delete</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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

