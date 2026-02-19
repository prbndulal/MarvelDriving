"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    MessageSquare,
    Settings,
    LogOut,
    Car
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Bookings",
        href: "/admin/bookings",
        icon: CalendarDays,
    },
    {
        title: "Enquiries",
        href: "/admin/enquiries",
        icon: MessageSquare,
    },
    {
        title: "Instructors",
        href: "/admin/instructors",
        icon: Users,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-gray-900 text-white">
            <div className="p-6">
                <div className="flex items-center gap-2 font-bold text-xl text-[#fbbf24]">
                    <Car className="h-6 w-6" />
                    <span>Marvel Admin</span>
                </div>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid gap-1 px-4">
                    {sidebarItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-800",
                                pathname === item.href ? "bg-[#1e5128] text-white" : "text-gray-400"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="p-4 border-t border-gray-800">
                <Button variant="ghost" className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-gray-800">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
