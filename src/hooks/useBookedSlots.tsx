import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { format } from 'date-fns';

export function useBookedSlots(date: Date | null) {
    const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        if (!date) {
            setBookedSlots(new Set());
            return;
        }

        async function fetchBookings() {
            setIsLoading(true);
            try {
                // Using date-fns to format date to match Supabase date column (YYYY-MM-DD)
                // date is definitely not null here due to check above
                const dateString = format(date!, "yyyy-MM-dd");

                const { data, error } = await supabase
                    .from("bookings")
                    .select("booking_time")
                    .eq("booking_date", dateString)
                    .neq("status", "cancelled"); // Filter out cancelled bookings

                if (error) {
                    console.error("Error fetching bookings:", error);
                    return;
                }

                if (data) {
                    // Extract time string HH:MM
                    const slots = new Set<string>(data.map((b: any) => b.booking_time.slice(0, 5)));
                    setBookedSlots(slots);
                }
            } catch (err) {
                console.error("Unexpected error fetching bookings:", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchBookings();
    }, [date]);

    return { bookedSlots, isLoading };
}
