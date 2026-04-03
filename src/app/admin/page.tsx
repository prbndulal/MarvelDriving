"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    CalendarDays, 
    DollarSign, 
    Users, 
    MessageSquare, 
    ArrowUpRight, 
    ArrowDownRight,
    Search,
    ChevronRight,
    TrendingUp,
    MoreVertical,
    CheckCircle,
    Clock,
    User
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        bookings: 0,
        revenue: 0,
        students: 0,
        enquiries: 0
    });
    const [recentBookings, setRecentBookings] = useState<any[]>([]);
    const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch total bookings
            const { count: bookingsCount } = await supabase
                .from('bookings')
                .select('*', { count: 'exact', head: true });

            // Fetch pending enquiries
            const { count: enquiriesCount } = await supabase
                .from('enquiries')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'new');

            // Fetch confirmed "students"
            const { count: studentsCount } = await supabase
                .from('bookings')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'confirmed');

            // Fetch recent bookings (last 5)
            const { data: recentB } = await supabase
                .from('bookings')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            // Fetch recent enquiries (last 5)
            const { data: recentE } = await supabase
                .from('enquiries')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            setStats({
                bookings: bookingsCount || 0,
                revenue: (studentsCount || 0) * 75, // Simplified revenue estimate ($75/lesson)
                students: studentsCount || 0,
                enquiries: enquiriesCount || 0
            });
            setRecentBookings(recentB || []);
            setRecentEnquiries(recentE || []);
        } catch (error) {
            console.error("Dashboard data fetch error:", error);
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const statCards = [
        {
            title: "Total Bookings",
            value: stats.bookings.toString(),
            change: "+12.5%",
            trend: "up",
            icon: CalendarDays,
            color: "from-emerald-500 to-[#1e5128]",
            id: "bookings"
        },
        {
            title: "Est. Revenue",
            value: `$${stats.revenue.toLocaleString()}`,
            change: "+8.2%",
            trend: "up",
            icon: DollarSign,
            color: "from-blue-500 to-indigo-600",
            id: "revenue"
        },
        {
            title: "Active Students",
            value: stats.students.toString(),
            change: "+4",
            trend: "up",
            icon: Users,
            color: "from-amber-400 to-orange-600",
            id: "students"
        },
        {
            title: "New Enquiries",
            value: stats.enquiries.toString(),
            change: "-2.4%",
            trend: "down",
            icon: MessageSquare,
            color: "from-rose-500 to-pink-600",
            id: "enquiries"
        },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#0a2f14] tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 font-medium mt-1">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-gray-200" asChild>
                        <Link href="/">View Site</Link>
                    </Button>
                    <Button className="rounded-xl bg-[#0a2f14] hover:bg-[#1e5128] shadow-lg shadow-[#0a2f14]/10">
                        <ArrowUpRight className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <Card key={stat.id} className="border-0 shadow-[0_15px_40px_rgba(0,0,0,0.04)] overflow-hidden rounded-[2rem] group hover:scale-[1.02] transition-transform duration-300">
                        <div className={`h-1.5 w-full bg-gradient-to-r ${stat.color}`} />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-gradient-to-br ${stat.color} group-hover:text-white transition-all duration-500`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold text-[#0a2f14] tracking-tight mb-2">{stat.value}</div>
                            <div className="flex items-center gap-1">
                                {stat.trend === "up" ? (
                                    <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4 text-rose-500" />
                                )}
                                <span className={`text-sm font-bold ${stat.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}>
                                    {stat.change}
                                </span>
                                <span className="text-xs text-gray-400 font-medium ml-1">vs last month</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-7">
                {/* Recent Bookings List */}
                <Card className="lg:col-span-4 border-0 shadow-[0_15px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between px-8 py-8 border-b border-gray-50 bg-gray-50/30">
                        <div>
                            <CardTitle className="text-xl font-extrabold text-[#0a2f14] tracking-tight">Recent Bookings</CardTitle>
                            <p className="text-sm text-gray-400 font-medium mt-1">Updates in the last 7 days</p>
                        </div>
                        <Button variant="ghost" className="rounded-xl font-bold text-[#1e5128]" asChild>
                            <Link href="/admin/bookings">View All <ChevronRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="px-6 py-4">
                        <div className="space-y-2">
                            {loading ? (
                                <div className="py-20 text-center animate-pulse">Loading bookings...</div>
                            ) : recentBookings.length === 0 ? (
                                <div className="py-20 text-center text-gray-500 font-bold">No recent bookings</div>
                            ) : (
                                recentBookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-4 rounded-3xl hover:bg-gray-50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-[#fbbf24]/10 flex items-center justify-center text-[#d97706] font-extrabold shadow-sm">
                                                {booking.customer_name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-[#0a2f14] tracking-tight">{booking.customer_name}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{booking.lesson_type}</span>
                                                    <span className="text-gray-200">|</span>
                                                    <span className="text-xs text-gray-400 font-medium">{format(new Date(booking.booking_date), 'MMM dd')} at {booking.booking_time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                                                booking.status === 'confirmed' ? 'bg-green-50 text-green-700' : 
                                                booking.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-400'
                                            }`}>
                                                {booking.status}
                                            </span>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-200 hover:text-gray-400 rounded-xl">
                                                <MoreVertical className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Enquiries List */}
                <Card className="lg:col-span-3 border-0 shadow-[0_15px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="px-8 py-8 border-b border-gray-50 bg-gray-50/30">
                        <CardTitle className="text-xl font-extrabold text-[#0a2f14] tracking-tight">New Enquiries</CardTitle>
                        <p className="text-sm text-gray-400 font-medium mt-1">Pending student responses</p>
                    </CardHeader>
                    <CardContent className="px-6 py-4">
                        <div className="space-y-4">
                            {loading ? (
                                <div className="py-20 text-center animate-pulse">Loading enquiries...</div>
                            ) : recentEnquiries.length === 0 ? (
                                <div className="py-20 text-center text-gray-500 font-bold">No pending enquiries</div>
                            ) : (
                                recentEnquiries.map((enquiry) => (
                                    <div key={enquiry.id} className="relative p-6 rounded-3xl border border-gray-50 hover:border-[#1e5128]/20 hover:shadow-lg hover:shadow-[#1e5128]/5 transition-all group overflow-hidden bg-white">
                                        {enquiry.status === 'new' && (
                                            <div className="absolute top-0 left-0 h-full w-1 bg-[#1e5128]" />
                                        )}
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <User className="h-4 w-4 text-[#1e5128]" />
                                                </div>
                                                <span className="font-extrabold text-[#0a2f14]">{enquiry.name}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-300 flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {format(new Date(enquiry.created_at), 'HH:mm')}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2 italic font-medium">"{enquiry.message}"</p>
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                                            <span className="text-[10px] font-extrabold uppercase text-[#1e5128] tracking-widest">{enquiry.type}</span>
                                            <Link href="/admin/enquiries" className="text-[10px] font-extrabold text-[#fbbf24] hover:underline uppercase tracking-widest flex items-center gap-1">
                                                Handle <ChevronRight className="h-3 w-3" />
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

