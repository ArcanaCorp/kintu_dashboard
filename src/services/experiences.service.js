import { supabase } from "@/libs/supabase";

export const getExperiences = async () => {
    try {
        const { data, error } = await supabase
            .from('experiences')
            .select(`
                *,
                experience_images (
                    *
                )
            `)
            .eq("published", true)
            .order("created_at", { ascending: false });
        
            if (error) throw error;

        return data;
    } catch (error) {
        console.error("Dashboard error:", error);
        throw error;
    }
}