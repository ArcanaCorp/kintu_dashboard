import { supabase } from "@/libs/supabase";

export const getBookings = async () => {
    try {
        const { data, error } = await supabase
            .from("bookings")
            .select(`
                id,
                travel_date,
                number_of_people,
                total_price,
                currency,
                payment_method,
                status,
                created_at,
                experiences (
                    id,
                    experience_name,
                    tour_name
                )
            `)
            .order("created_at", { ascending: false });

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Get bookings error:", error);
        throw error;
    }
};

export const updateBookingStatus = async (id, status) => {
    const { data, error } = await supabase
        .from('bookings')
        .update({status})
        .eq('id', id)
        .select()
        .single()
    
    if (error) throw error
    return data;
}