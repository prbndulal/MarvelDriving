"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save } from "lucide-react";

interface DaySchedule {
    id?: number;
    day_of_week: number;
    label: string;
    start_time: string;
    end_time: string;
    is_active: boolean;
}

const DAYS = [
    { id: 0, label: "Sunday" },
    { id: 1, label: "Monday" },
    { id: 2, label: "Tuesday" },
    { id: 3, label: "Wednesday" },
    { id: 4, label: "Thursday" },
    { id: 5, label: "Friday" },
    { id: 6, label: "Saturday" },
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

            // Merge with default days structure
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
            for (const s of schedules) {
                const payload = {
                    day_of_week: s.day_of_week,
                    start_time: s.start_time,
                    end_time: s.end_time,
                    is_active: s.is_active
                };

                if (s.id) {
                    await supabase.from("availability").update(payload).eq('id', s.id);
                } else {
                    const { data: existing } = await supabase
                        .from('availability')
                        .select('id')
                        .eq('day_of_week', s.day_of_week)
                        .maybeSingle();

                    if (existing) {
                        await supabase.from("availability").update(payload).eq('id', existing.id);
                    } else {
                        await supabase.from("availability").insert(payload);
                    }
                }
            }

            toast({
                title: "Settings Saved",
                description: "Weekly availability has been updated.",
            });
        } catch (error: any) {
            toast({
                title: "Error saving",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Availability Settings</h1>
                <Button onClick={handleSave} disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <p className="text-sm text-gray-500">
                        Set your standard working hours for each day. Uncheck days you are closed.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {schedules.map((day, index) => (
                            <div key={day.day_of_week} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                                <div className="w-32 font-medium">{day.label}</div>

                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={day.is_active}
                                        onCheckedChange={(checked: boolean) => handleUpdate(index, "is_active", checked)}
                                    />
                                    <span className="text-sm w-16">{day.is_active ? "Open" : "Closed"}</span>
                                </div>

                                {day.is_active && (
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="time"
                                            value={day.start_time}
                                            onChange={(e) => handleUpdate(index, "start_time", e.target.value)}
                                            className="w-32"
                                        />
                                        <span className="text-gray-400">to</span>
                                        <Input
                                            type="time"
                                            value={day.end_time}
                                            onChange={(e) => handleUpdate(index, "end_time", e.target.value)}
                                            className="w-32"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
