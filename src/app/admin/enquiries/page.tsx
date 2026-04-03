"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone, Trash2, CheckCircle, Clock, MessageSquare, RefreshCw, User, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function EnquiriesPage() {
    const [filter, setFilter] = useState("");
    const [enquiries, setEnquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const supabase = createClient();

    const fetchEnquiries = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('enquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            toast({
                title: "Error fetching enquiries",
                description: error.message,
                variant: "destructive"
            });
        } else {
            setEnquiries(data || []);
        }
        setLoading(false);
    }, [supabase, toast]);

    useEffect(() => {
        fetchEnquiries();
    }, [fetchEnquiries]);

    const updateStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "new" ? "read" : "new";
        const { error } = await supabase
            .from('enquiries')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            toast({
                title: "Update failed",
                description: error.message,
                variant: "destructive"
            });
        } else {
            setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
            toast({
                title: `Marked as ${newStatus}`,
                description: "Enquiry status updated successfully.",
            });
        }
    };

    const deleteEnquiry = async (id: string) => {
        if (!confirm("Are you sure you want to delete this enquiry?")) return;

        const { error } = await supabase
            .from('enquiries')
            .delete()
            .eq('id', id);

        if (error) {
            toast({
                title: "Delete failed",
                description: error.message,
                variant: "destructive"
            });
        } else {
            setEnquiries(prev => prev.filter(e => e.id !== id));
            toast({
                title: "Enquiry deleted",
                description: "The record has been permanently removed.",
            });
        }
    };

    const filteredEnquiries = enquiries.filter(e => 
        e.name.toLowerCase().includes(filter.toLowerCase()) ||
        e.email.toLowerCase().includes(filter.toLowerCase()) ||
        e.message.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#0a2f14] tracking-tight">Enquiries</h1>
                    <p className="text-gray-500 font-medium">Manage student questions and NDIS requests</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by name, email or message..."
                            className="pl-10 h-11 border-gray-200 rounded-xl bg-white shadow-sm"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-11 w-11 rounded-xl border-gray-200 bg-white"
                        onClick={fetchEnquiries}
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                {loading ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm animate-pulse h-48" />
                    ))
                ) : filteredEnquiries.length === 0 ? (
                    <div className="bg-white py-20 rounded-[2.5rem] border border-dashed border-gray-200 text-center">
                        <MessageSquare className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500 font-bold">No enquiries found</p>
                    </div>
                ) : (
                    filteredEnquiries.map((enquiry) => (
                        <div 
                            key={enquiry.id} 
                            className={`group bg-white p-6 md:p-8 rounded-[2.5rem] border transition-all duration-300 ${
                                enquiry.status === 'new' ? 'border-[#1e5128]/20 shadow-[0_15px_40px_rgba(30,81,40,0.05)]' : 'border-gray-100 shadow-sm'
                            } flex flex-col md:flex-row justify-between gap-6 overflow-hidden relative`}
                        >
                            {enquiry.status === 'new' && (
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1e5128]" />
                            )}
                            
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center">
                                        <User className="h-5 w-5 text-[#1e5128]" />
                                    </div>
                                    <h3 className="font-extrabold text-xl text-[#0a2f14] tracking-tight">{enquiry.name}</h3>
                                    
                                    <div className="flex gap-2 ml-auto md:ml-0">
                                        <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${
                                            enquiry.type === "NDIS" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"
                                        }`}>
                                            {enquiry.type}
                                        </span>
                                        <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${
                                            enquiry.status === "new" ? "bg-green-50 text-green-700 animate-pulse" : "bg-gray-50 text-gray-400"
                                        }`}>
                                            {enquiry.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider">
                                    <a href={`mailto:${enquiry.email}`} className="flex items-center gap-2 hover:text-[#1e5128] transition-colors bg-gray-50 px-3 py-2 rounded-lg">
                                        <Mail className="h-3.5 w-3.5" /> {enquiry.email}
                                    </a>
                                    {enquiry.phone && (
                                        <a href={`tel:${enquiry.phone}`} className="flex items-center gap-2 hover:text-[#1e5128] transition-colors bg-gray-50 px-3 py-2 rounded-lg">
                                            <Phone className="h-3.5 w-3.5" /> {enquiry.phone}
                                        </a>
                                    )}
                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                                        <Clock className="h-3.5 w-3.5" /> 
                                        {format(new Date(enquiry.created_at), 'MMM dd, yyyy • HH:mm')}
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 text-gray-700 font-medium leading-relaxed italic text-sm">
                                        "{enquiry.message}"
                                    </div>
                                    <MessageSquare className="absolute -top-2 -right-2 h-10 w-10 text-gray-100/50 -z-0" />
                                </div>
                            </div>

                            <div className="flex md:flex-col gap-3 justify-center min-w-[200px]">
                                <Button 
                                    variant="outline" 
                                    className={`rounded-xl h-12 font-extrabold shadow-sm transition-all ${
                                        enquiry.status === 'new' 
                                        ? "border-green-200 text-green-700 hover:bg-green-50" 
                                        : "border-gray-100 text-gray-400 hover:bg-gray-50"
                                    }`}
                                    onClick={() => updateStatus(enquiry.id, enquiry.status)}
                                >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    {enquiry.status === 'new' ? 'Mark as Read' : 'Mark as New'}
                                </Button>
                                <Button 
                                    className="bg-[#0a2f14] hover:bg-[#1e5128] rounded-xl h-12 font-extrabold shadow-lg"
                                    asChild
                                >
                                    <a href={`mailto:${enquiry.email}?subject=Re: Marvel Driving Enquiry`}>
                                        <Mail className="h-4 w-4 mr-2" />
                                        Reply via Email
                                    </a>
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    className="rounded-xl h-12 text-red-500 hover:bg-red-50 hover:text-red-700 font-bold"
                                    onClick={() => deleteEnquiry(enquiry.id)}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

