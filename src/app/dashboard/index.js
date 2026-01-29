import { useEffect, useState } from "react"
import { getDashboardHome } from "@/services/dashboard.service";
import { useLocation } from "react-router-dom";

export default function HomeView () {

    const location =  useLocation();

    const [loading, setLoading] = useState(true);
    const [lastBooks, setLastBooks] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [stats, setStats] = useState({
        bookingsToday: 0,
        experiencesPublished: 0,
        usersActive: 0,
        failedLogins: 0
    });

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                const data = await getDashboardHome();
                setLastBooks(data.lastBookings);
                setAlerts(data.alerts);
                setStats(data.stats);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div className="w-full h grid-center">
                <span className="text-xs text-gray">Cargando dashboard...</span>
            </div>
        );
    }

    return (

        <>

            <p className="text-xs text-gray">{location.pathname}</p>
            <h1 className="mb-4">Bienvenido al Dashboard</h1>
        
            <ul className="w-full grid grid-cols gap-4 mb-4" style={{"--grid-cols": "repeat(4, 1fr)"}}>
                <li className="w-full bg-white border rounded-md p-4">
                    <p className="text-xs text-gray">Reservas hoy</p>
                    <h3 className="text-3xl">{stats.bookingsToday}</h3>
                </li>
                <li className="w-full bg-white border rounded-md p-4">
                    <p className="text-xs text-gray">Usuario activos</p>
                    <h3 className="text-3xl">{stats.usersActive}</h3>
                </li>
                <li className="w-full bg-white border rounded-md p-4">
                    <p className="text-xs text-gray">Experiencias publicadas</p>
                    <h3 className="text-3xl">{stats.experiencesPublished}</h3>
                </li>
                <li className="w-full bg-white border rounded-md p-4">
                    <p className="text-xs text-gray">Accesos fallidos</p>
                    <h3 className="text-3xl">{stats.failedLogins}</h3>
                </li>
            </ul>

            <div className="w-full grid grid-cols gap-8" style={{"--grid-cols": "1fr 400px"}}>
                <div className="w-full bg-white border rounded-md p-4">
                    <ul className="flex w-full h align-center justify-between" style={{"--h": "40px"}}>
                        <li className="w-full text-nowrap flex items-center justify-center text-xs">Reserva</li>
                        <li className="w-full text-nowrap flex items-center justify-center text-xs">Experiencia</li>
                        <li className="w-full text-nowrap flex items-center justify-center text-xs">Fecha de viaje</li>
                        <li className="w-full text-nowrap flex items-center justify-center text-xs">Método de pago</li>
                        <li className="w-full text-nowrap flex items-center justify-center text-xs">Personas</li>
                        <li className="w-full text-nowrap flex items-center justify-center text-xs">Estado</li>
                        <li className="w-full text-nowrap flex items-center justify-center text-xs">Creada</li>
                    </ul>
                    {lastBooks.length > 0 ? (
                        <ul></ul>
                    ) : (
                        <li className="w-full h text-nowrap flex items-center justify-center text-xs bg-secondary rounded-xs" style={{"--h": "40px"}}>No hay reservas</li>
                    )}
                </div>  
                <div className="w rounded-md p-4 bg-white border" style={{"--w": "400px"}}>
                    <h3 className="mb-2">Alertas</h3>
                    <ul className="flex flex-col gap-2">
                        {alerts.length > 0 ? (
                            alerts.map((alert, idx) => (
                                <li key={idx} className={`w-full h bg-${alert.type}-transparent rounded-sm grid-center`} style={{"--h": "40px"}}>
                                    <p className={`text-${alert.type} text-medium text-xs p-2`}>{alert.message}</p>
                                </li>
                            ))
                        ) : (
                            <li className="w-full bg-secondary rounded-xs text-xs h grid-center" style={{"--h": "40px"}}>No hay alertas por el momento.</li>
                        )}
                    </ul>
                </div>
            </div>

        </>

    )

}