import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export interface TimeSlot {
    time: string; // HH:MM (24h)
    displayTime: string; // 12h format
    available: boolean;
}

export function useAvailability(date: Date | null) {
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!date) {
            setSlots([]);
            return;
        }

        async function fetchAvailability() {
            setLoading(true);
            try {
                const dateStr = format(date!, 'yyyy-MM-dd');
                const response = await fetch(`/api/availability?date=${dateStr}`);
                const data = await response.json();

                if (data.slots) {
                    setSlots(data.slots);
                } else {
                    setSlots([]);
                }
            } catch (err) {
                console.error("Error fetching availability:", err);
                setSlots([]);
            } finally {
                setLoading(false);
            }
        }

        fetchAvailability();
    }, [date]);

    return { slots, loading };
}
