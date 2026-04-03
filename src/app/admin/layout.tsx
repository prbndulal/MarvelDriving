import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // Check for Admin Role
    if (!session || (session.user as any)?.role !== "admin") {
        redirect("/login?redirect=/admin");
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in duration-700">
                {children}
            </main>
        </div>
    );
}
