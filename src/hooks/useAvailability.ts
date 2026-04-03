import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { format, getDay, addMinutes, isBefore, set } from 'date-fns';

export interface TimeSlot {
    time: string; // HH:MM (24h)
    displayTime: string; // 12h format
    available: boolean;
}

export function useAvailability(date: Date | null) {
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        if (!date) {
            setSlots([]);
            return;
        }

        async function fetchAvailability() {
            setLoading(true);
            try {
                const dateStr = format(date!, 'yyyy-MM-dd');
                const dayOfWeek = getDay(date!); // 0-6

                // 1. Fetch configured availability for this day of week
                const { data: rules, error: rulesError } = await supabase
                    .from('availability')
                    .select('*')
                    .eq('day_of_week', dayOfWeek)
                    .eq('is_active', true)
                    .maybeSingle(); // Changed from single() to maybeSingle() to avoid 406 error

                // 2. Fetch existing bookings for this date
                const { data: bookings, error: bookingsError } = await supabase
                    .from('bookings')
                    .select('booking_time')
                    .eq('booking_date', dateStr)
                    .neq('status', 'cancelled');

                if (rulesError && rulesError.code !== 'PGRST116') {
                    // Log more detail but don't show the error overlay unless we have to
                    console.log("Supabase Availability Fetch Error:", rulesError.message || rulesError);
                }

                let startH, startM, endH, endM;

                if (rules) {
                    [startH, startM] = rules.start_time.split(':').map(Number);
                    [endH, endM] = rules.end_time.split(':').map(Number);
                } else {
                    // FALLBACK: If no rule found (or table missing), use default hours
                    // This prevents "no slots" error on fresh install
                    // Default: 7am - 6pm
                    console.warn("No availability rule found for day " + dayOfWeek + ", using defaults.");
                    startH = 7; startM = 0;
                    endH = 18; endM = 0;
                }

                // Generate slots
                const baseDate = set(date!, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

                let current = set(baseDate, { hours: startH, minutes: startM });
                const end = set(baseDate, { hours: endH, minutes: endM });

                const generatedSlots: TimeSlot[] = [];
                const bookedTimes = new Set(bookings?.map((b: any) => b.booking_time.slice(0, 5))); // HH:MM

                while (isBefore(current, end)) {
                    const timeStr = format(current, 'HH:mm'); // 24h format for DB check

                    // Format for display (e.g. 7:00 AM)
                    const displayTime = format(current, 'h:mm a');

                    generatedSlots.push({
                        time: timeStr,
                        displayTime: displayTime,
                        available: !bookedTimes.has(timeStr)
                    });

                    current = addMinutes(current, 60); // Increment by 1 hour
                }

                setSlots(generatedSlots);

            } catch (err) {
                console.error("Error calculating availability:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchAvailability();
    }, [date]);

    return { slots, loading };
}
