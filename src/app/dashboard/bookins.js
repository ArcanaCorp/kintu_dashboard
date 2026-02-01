import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBookings } from "../../services/bookings.service";
import RowsBooks from "../../components/Books/Rows";

export default function Bookings() {

    const location = useLocation();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleUpdateStatus = (id, newStatus) => {
        setBookings(prev =>
            prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
        );
    }

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getBookings();
                setBookings(data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <>
            <p className="text-xs text-gray">{location.pathname}</p>
            <h1 className="mb-4">Reservas</h1>

            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-md overflow-hidden">
                    <thead className="bg-secondary">
                        <tr>
                            <th className="text-left text-xs text-gray p-2">Código</th>
                            <th className="text-left text-xs text-gray p-2">Experiencia</th>
                            <th className="text-left text-xs text-gray p-2">Fecha de viaje</th>
                            <th className="text-center text-xs text-gray p-2">Personas</th>
                            <th className="text-right text-xs text-gray p-2">Total</th>
                            <th className="text-left text-xs text-gray p-2">Pago</th>
                            <th className="text-center text-xs text-gray p-2">Estado</th>
                            <th className="text-center text-xs text-gray p-2">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="8" className="text-center text-xs text-gray p-4">
                                    Cargando reservas...
                                </td>
                            </tr>
                        )}

                        {!loading && bookings.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center text-xs text-gray p-4">
                                    No hay reservas aún
                                </td>
                            </tr>
                        )}

                        {!loading && bookings.map((book) => (
                            <RowsBooks key={book.id} book={book} onUpdateStatus={handleUpdateStatus} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}