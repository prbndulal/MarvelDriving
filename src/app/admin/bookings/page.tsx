"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { format } from "date-fns";

export default function BookingsPage() {
    const [filter, setFilter] = useState("");
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchBookings() {
            setLoading(true);
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching bookings:", error);
            } else {
                setBookings(data || []);
            }
            setLoading(false);
        }

        fetchBookings();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Bookings Management</h1>
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search bookings..."
                        className="pl-8"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-md border bg-white">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Customer</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date & Time</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Type</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Payment</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center">Loading bookings...</td>
                                </tr>
                            ) : bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center">No bookings found.</td>
                                </tr>
                            ) : (
                                bookings.filter(b => b.customer_name.toLowerCase().includes(filter.toLowerCase())).map((booking) => (
                                    <tr key={booking.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">
                                            {booking.customer_name}
                                            <div className="text-xs text-gray-500">{booking.customer_email}</div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            {booking.booking_date} at {booking.booking_time}
                                        </td>
                                        <td className="p-4 align-middle">{booking.lesson_type}</td>
                                        <td className="p-4 align-middle">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${booking.status === "confirmed" ? "bg-green-100 text-green-800" :
                                                    booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                                        "bg-gray-100 text-gray-800"
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${booking.payment_status === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                }`}>
                                                {booking.payment_status}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <Button variant="ghost" size="sm">Edit</Button>
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
