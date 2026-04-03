"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, Clock, Calendar, AlertCircle } from "lucide-react";

interface DaySchedule {
    id?: number;
    day_of_week: number;
    label: string;
    start_time: string;
    end_time: string;
    is_active: boolean;
}

const DAYS = [
    { id: 1, label: "Monday" },
    { id: 2, label: "Tuesday" },
    { id: 3, label: "Wednesday" },
    { id: 4, label: "Thursday" },
    { id: 5, label: "Friday" },
    { id: 6, label: "Saturday" },
    { id: 0, label: "Sunday" },
];

export default function AvailabilityPage() {
    const { toast } = useToast();
    const supabase = createClient();
    const [schedules, setSchedules] = useState<DaySchedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchSchedules() {
            setLoading(true);
            const { data, error } = await supabase
                .from("availability")
                .select("*")
                .order("day_of_week", { ascending: true });

            if (error) {
                toast({
                    title: "Error fetching settings",
                    description: error.message,
                    variant: "destructive",
                });
            }

            const mergedSchedules = DAYS.map((day) => {
                const existing = data?.find((d) => d.day_of_week === day.id);
                return {
                    day_of_week: day.id,
                    label: day.label,
                    start_time: existing?.start_time || "07:00",
                    end_time: existing?.end_time || "18:00",
                    is_active: existing?.is_active ?? true,
                    id: existing?.id,
                };
            });

            setSchedules(mergedSchedules);
            setLoading(false);
        }

        fetchSchedules();
    }, [toast]);

    const handleUpdate = (index: number, field: keyof DaySchedule, value: any) => {
        const newSchedules = [...schedules];
        newSchedules[index] = { ...newSchedules[index], [field]: value };
        setSchedules(newSchedules);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const upsertData = schedules.map(s => ({
                day_of_week: s.day_of_week,
                start_time: s.start_time,
                end_time: s.end_time,
                is_active: s.is_active,
                id: s.id // If ID exists, Supabase will update
            }));

            const { error } = await supabase
                .from("availability")
                .upsert(upsertData, { onConflict: 'day_of_week' });

            if (error) throw error;

            toast({
                title: "Schedule Updated",
                description: "Your weekly availability has been saved successfully.",
            });
        } catch (error: any) {
            toast({
                title: "Error saving changes",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#1e5128]" />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#0a2f14] tracking-tight">Availability</h1>
                    <p className="text-gray-500 font-medium">Set your standard working hours for the booking engine</p>
                </div>
                <Button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="rounded-xl bg-[#0a2f14] hover:bg-[#1e5128] h-12 px-8 font-extrabold shadow-lg shadow-[#0a2f14]/10"
                >
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Schedule
                </Button>
            </div>

            <Card className="border-0 shadow-[0_15px_50px_rgba(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
                <CardHeader className="bg-gray-50/50 px-8 py-8 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#fbbf24]/10 rounded-xl">
                            <Clock className="h-5 w-5 text-[#d97706]" />
                        </div>
                        <CardTitle className="text-xl font-extrabold text-[#0a2f14]">Weekly Schedule</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="space-y-4">
                        {schedules.map((day, index) => (
                            <div 
                                key={day.day_of_week} 
                                className={`flex flex-col sm:flex-row items-center gap-6 p-6 rounded-[2rem] border transition-all duration-300 ${
                                    day.is_active 
                                    ? "bg-white border-gray-100 shadow-sm" 
                                    : "bg-gray-50/50 border-transparent opacity-60 grayscale-[0.5]"
                                }`}
                            >
                                <div className="w-full sm:w-32 font-black text-[#0a2f14] flex items-center gap-3">
                                    <span className="h-2 w-2 rounded-full bg-[#fbbf24]" />
                                    {day.label}
                                </div>

                                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl">
                                    <Switch
                                        checked={day.is_active}
                                        onCheckedChange={(checked: boolean) => handleUpdate(index, "is_active", checked)}
                                        className="data-[state=checked]:bg-[#1e5128]"
                                    />
                                    <span className={`text-xs font-extrabold uppercase tracking-widest min-w-[60px] ${day.is_active ? "text-[#1e5128]" : "text-gray-400"}`}>
                                        {day.is_active ? "Active" : "Oﬀ Duty"}
                                    </span>
                                </div>

                                {day.is_active ? (
                                    <div className="flex items-center gap-4 flex-1 justify-end">
                                        <div className="relative">
                                            <Input
                                                type="time"
                                                value={day.start_time}
                                                onChange={(e) => handleUpdate(index, "start_time", e.target.value)}
                                                className="w-36 h-12 bg-white border-gray-100 rounded-xl font-bold text-[#0a2f14] px-4 focus:ring-[#1e5128]/20 transition-all"
                                            />
                                        </div>
                                        <span className="text-gray-300 font-bold">to</span>
                                        <div className="relative">
                                            <Input
                                                type="time"
                                                value={day.end_time}
                                                onChange={(e) => handleUpdate(index, "end_time", e.target.value)}
                                                className="w-36 h-12 bg-white border-gray-100 rounded-xl font-bold text-[#0a2f14] px-4 focus:ring-[#1e5128]/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex justify-end">
                                        <span className="text-xs font-bold text-gray-400 italic">No bookings accepted on this day</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-extrabold text-amber-900 mb-1 tracking-tight">Important Note</h4>
                    <p className="text-sm text-amber-800/80 font-medium leading-relaxed">
                        Changes to your weekly schedule will only affect **future** bookings. Any existing confirmed 
                        appointments that fall outside new hours will need to be rescheduled manually via the Bookings page.
                    </p>
                </div>
            </div>
        </div>
    );
}

