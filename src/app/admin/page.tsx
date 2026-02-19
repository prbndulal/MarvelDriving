"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, DollarSign, Users, MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        bookings: 0,
        revenue: 0,
        students: 0,
        enquiries: 0
    });
    const supabase = createClient();

    useEffect(() => {
        async function fetchStats() {
            // Fetch total bookings
            const { count: bookingsCount } = await supabase
                .from('bookings')
                .select('*', { count: 'exact', head: true });

            // Fetch pending enquiries
            const { count: enquiriesCount } = await supabase
                .from('enquiries')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'new');

            // Fetch revenue (mock calculation based on booking types for now, or just sum if we had amount column)
            // For now, let's just count confirmed bookings as "students"
            const { count: studentsCount } = await supabase
                .from('bookings')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'confirmed');

            setStats({
                bookings: bookingsCount || 0,
                revenue: 0, // Placeholder
                students: studentsCount || 0,
                enquiries: enquiriesCount || 0
            });
        }

        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Total Bookings",
            value: stats.bookings.toString(),
            change: "All time",
            icon: CalendarDays,
        },
        {
            title: "Revenue",
            value: "$0", // Placeholder
            change: "Needs payment integration",
            icon: DollarSign,
        },
        {
            title: "Confirmed Students",
            value: stats.students.toString(),
            change: "Active learners",
            icon: Users,
        },
        {
            title: "New Enquiries",
            value: stats.enquiries.toString(),
            change: "Pending response",
            icon: MessageSquare,
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-10 text-gray-500">
                            View "Bookings" page for details.
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Enquiries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-10 text-gray-500">
                            View "Enquiries" page for details.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
