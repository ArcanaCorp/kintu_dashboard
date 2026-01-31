import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBookings } from "../../services/bookings.service";

export default function Bookings() {

    const location = useLocation();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("es-PE");

    const formatPrice = (price, currency) =>
        `${currency} ${Number(price).toFixed(2)}`;

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
                            <tr key={book.id} className="border-t hover:bg-secondary">
                                <td className="text-xs p-2">{book.id.slice(0, 8)}</td>
                                <td className="text-xs p-2">
                                    {book.experiences?.tour_name}
                                </td>
                                <td className="text-xs p-2">
                                    {formatDate(book.travel_date)}
                                </td>
                                <td className="text-center text-xs p-2">
                                    {book.number_of_people}
                                </td>
                                <td className="text-right text-xs p-2">
                                    {formatPrice(book.total_price, book.currency)}
                                </td>
                                <td className="text-xs p-2">
                                    {book.payment_method || "—"}
                                </td>
                                <td className="text-center text-xs p-2">
                                    <span className="px-2 py-1 rounded-md bg-info-transparent text-info">
                                        {book.status}
                                    </span>
                                </td>
                                <td className="text-center text-xs p-2">
                                    <button className="text-info">
                                        Ver
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}