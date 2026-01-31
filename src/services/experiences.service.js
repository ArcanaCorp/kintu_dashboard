import { supabase } from "@/libs/supabase";

export const generateSlug = (text) =>
    text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");


export const generateExperienceCode = (list) => {
    if (!list.length) return "EXP-1";

    const lastCode = list
        .map(item => item.code)
        .filter(code => code.startsWith("EXP-"))
        .map(code => Number(code.replace("EXP-", "")))
        .sort((a, b) => b - a)[0];

    return `EXP-${lastCode + 1}`;
};

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

export const createExperience = async (list, payload) => {
    try {

        const code = generateExperienceCode(list);
        const slug = generateSlug(payload.tour_name);
        
        const { data, error } = await supabase
            .from("experiences")
            .insert({
                code: code,
                slug: slug,
                experience_name: payload.experience_name,
                tour_name: payload.tour_name,
                availability: payload.availability,
                difficulty_level: payload.difficulty_level,
                duration: payload.duration,
                price_min: payload.price_min,
                price_max: payload.price_max,
                currency: payload.currency || "PEN",
                published: payload.published ?? true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Create experience error:", error);
        throw error;
    }
};

export const updateExperience = async (id, payload) => {
    try {
        const { data, error } = await supabase
            .from("experiences")
            .update({
                experience_name: payload.experience_name,
                tour_name: payload.tour_name,
                availability: payload.availability,
                difficulty_level: payload.difficulty_level,
                duration: payload.duration,
                price_min: payload.price_min,
                price_max: payload.price_max,
                updated_at: new Date().toISOString()
            })
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Update experience error:", error);
        throw error;
    }
};

export const deleteExperience = async (id) => {
    try {
        const { error } = await supabase
            .from("experiences")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return id;
    } catch (error) {
        console.error("Delete experience error:", error);
        throw error;
    }
};