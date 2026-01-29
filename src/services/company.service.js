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

    updateCompany(id, payload) {
        return supabase
            .from("company")
            .update(payload)
            .eq("id", id);
    },

    updateAddress(id, payload) {
        return supabase
            .from("company_address")
            .update(payload)
            .eq("id", id);
    },

    updateContact(id, payload) {
        return supabase
            .from("company_contact")
            .update(payload)
            .eq("id", id);
    },

    updateValue(id, payload) {
        return supabase
            .from("company_values")
            .update(payload)
            .eq("id", id);
    },

    updateSlogan(id, payload) {
        return supabase
            .from("company_slogans")
            .update(payload)
            .eq("id", id);
    },

    updateLimit(id, payload) {
        return supabase
            .from("company_limits")
            .update(payload)
            .eq("id", id);
    },

    updateLimitParagraph(id, payload) {
        return supabase
            .from("company_limits_paragraphs")
            .update(payload)
            .eq("id", id);
    },

    updateSocialMedia(id, payload) {
        return supabase
            .from("company_social_media")
            .update(payload)
            .eq("id", id);
    }

};