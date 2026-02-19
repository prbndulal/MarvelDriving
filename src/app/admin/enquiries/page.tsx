"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone } from "lucide-react";

// Mock Data
const enquiries = [
    { id: "1", name: "David Kim", email: "david@test.com", type: "NDIS", status: "New", message: "Looking for NDIS lessons..." },
    { id: "2", name: "Sarah Connor", email: "sarah@test.com", type: "General", status: "Replied", message: "Do you cover Wolli Creek?" },
];

export default function EnquiriesPage() {
    const [filter, setFilter] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Enquiries</h1>
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search enquiries..."
                        className="pl-8"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {enquiries.filter(e => e.name.toLowerCase().includes(filter.toLowerCase())).map((enquiry) => (
                    <div key={enquiry.id} className="bg-white p-6 rounded-lg border shadow-sm flex flex-col md:flex-row justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-bold text-lg">{enquiry.name}</h3>
                                <span className={`text-xs px-2 py-1 rounded-full ${enquiry.type === "NDIS" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                                    }`}>
                                    {enquiry.type}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-full ${enquiry.status === "New" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                    }`}>
                                    {enquiry.status}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500 mb-2">
                                <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {enquiry.email}</span>
                            </div>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-md text-sm">
                                "{enquiry.message}"
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 justify-center">
                            <Button variant="outline" size="sm">Mark as Read</Button>
                            <Button size="sm" className="bg-[#1e5128]">Reply</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
