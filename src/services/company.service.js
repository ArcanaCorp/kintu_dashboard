import { supabase } from "@/libs/supabase";

export const getCompanyProfile = async () => {
  const { data, error } = await supabase
    .from("company")
    .select(`
        id,
        legal_name,
        brand_name,
        description,
        mission,
        vision,
        company_address (
            id,
            street,
            city,
            province,
            region,
            country
        ),
        company_contact (
            id,
            phone,
            email
        ),
        company_values (
            id,
            value,
            order_index
        ),
        company_slogans (
            id,
            slogan,
            order_index
        ),
        company_limits (
            id,
            title,
            company_limits_paragraphs (
                id,
                paragraph,
                order_index
            )
        ),
        company_social_media (
            id,
            platform,
            url
        )
    `)
    .single();

    if (error) throw error;

    return data;
};

export const CompanyRepository = {

    async updateCompany(id, payload) {
        const { data, error } = await supabase
        .from("company")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

        if (error) throw error;
        return data;
    },

    async updateAddress(id, payload) {
        const { data, error } = await supabase
        .from("company_address")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

        if (error) throw error;
        return data;
    },

    async updateContact(id, payload) {
        const { data, error } = await supabase
        .from("company_contact")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

        if (error) throw error;
        return data;
    },

    async updateValue(id, payload) {
        const { data, error } = await supabase
        .from("company_values")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

        if (error) throw error;
        return data;
    },

    async updateSlogan(id, payload) {
        const { data, error } = await supabase
        .from("company_slogans")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

        if (error) throw error;
        return data;
    },

    async updateSocialMedia(id, payload) {
        const { data, error } = await supabase
        .from("company_social_media")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

        if (error) throw error;
        return data;
    }
};