import { supabase } from "@/libs/supabase";

export const serviceLogin = async (username, password) => {
    try {
        const { data, error } = await supabase.rpc("login_user", {
            p_username: username,
            p_password: password
        });

        if (error) throw error;
        if (!data || data.length === 0) {
            throw new Error("Credenciales inválidas");
        }

        return data[0];
        
    } catch (error) {
        console.error(error);
    }
}