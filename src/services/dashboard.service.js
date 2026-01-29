import { supabase } from "@/libs/supabase";

export const getDashboardHome = async () => {
    try {
        // 1️⃣ KPIs
        const today = new Date().toISOString().split("T")[0];

        const [usersActive, bookingsToday, experiencesPublished, failedLogins, lastBookings] = await Promise.all([
            supabase
                .from("app_users")
                .select("id", { count: "exact", head: true })
                .eq("is_active", true),

            supabase
                .from("bookings")
                .select("id", { count: "exact", head: true })
                .gte("created_at", `${today}T00:00:00`),

            supabase
                .from("experiences")
                .select("published", { count: "exact", head: true })
                .eq("published", true),

            supabase
                .from("login_audit")
                .select("id", { count: "exact", head: true })
                .eq("success", false)
                .gte("created_at", `${today}T00:00:00`),

            supabase
                .from("bookings")
                .select(`
                    id,
                    travel_date,
                    number_of_people,
                    payment_method,
                    status,
                    created_at,
                    experiences (
                        experience_name
                    )
                `)
                .order("created_at", { ascending: false })
                .limit(5)
        ]);

        if (usersActive.error || bookingsToday.error || experiencesPublished.error || failedLogins.error || lastBookings.error) {
            throw usersActive.error || bookingsToday.error || experiencesPublished.error || failedLogins.error || lastBookings.error;
        }

        // 2️⃣ Alertas simples (reglas de negocio)
        const alerts = [];

        if (failedLogins.count > 5) {
            alerts.push({
                type: "danger",
                message: `⚠️ ${failedLogins.count} accesos fallidos hoy`
            });
        }

        if (bookingsToday.count === 0) {
            alerts.push({
                type: "warning",
                message: "No hay reservas registradas hoy"
            });
        }

        lastBookings.data.forEach(b => {
            if (b.status === "pending") {
                alerts.push({
                    type: "info",
                    message: `Reserva pendiente para ${b.experiences?.experience_name}`
                });
            }
        });

        return {
            stats: {
                bookingsToday: bookingsToday.count,
                experiencesPublished: experiencesPublished.count,
                usersActive: usersActive.count,
                failedLogins: failedLogins.count
            },
            lastBookings: lastBookings.data,
            alerts
        };

    } catch (error) {
        console.error("Dashboard error:", error);
        throw error;
    }
};