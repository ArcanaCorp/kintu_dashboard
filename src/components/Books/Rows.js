import { Icon } from "@/helpers/icons";
import { useState } from "react";
import { statusBooksClases, statusBooksList } from "../../helpers/status";
import { updateBookingStatus } from "../../services/bookings.service";
import { toast } from "sonner";
export default function RowsBooks ({ book, onUpdateStatus }) {

    const [editing, setEditing] = useState(false);
    const [status, setStatus] = useState(book.status);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("es-PE");

    const formatPrice = (price, currency) =>
        `${currency} ${Number(price).toFixed(2)}`;

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        if (newStatus === status) return;
        setStatus(newStatus);
        setEditing(false);
        try {
            await updateBookingStatus(book.id, newStatus)
            if (onUpdateStatus) onUpdateStatus(book.id, newStatus)
            toast.success('Éxito', { description: 'Se actualizó con éxito la reserva' })
        } catch (error) {
            toast.error('Error', { description: `No se pudo actualizar la reserva: ${error.message}` })
            console.error(error);
        }
    };

    return (

        <tr className="border-t hover:bg-secondary">
            <td className="text-xs p-2">{book.id.slice(0, 8)}</td>
            <td className="text-xs p-2">{book.experiences?.tour_name}</td>
            <td className="text-xs p-2">{formatDate(book.travel_date)}</td>
            <td className="text-center text-xs p-2">{book.number_of_people}</td>
            <td className="text-right text-xs p-2">{formatPrice(book.total_price, book.currency)}</td>
            <td className="text-xs p-2">{book.payment_method || "—"}</td>
            <td className="text-center text-xs p-2">
                {!editing ? (
                    <span className={`ph-2 pv-2 rounded-md ${statusBooksClases[book.status]}`} onClick={() => setEditing(true)}>{statusBooksList[book.status]}</span>
                ) : (
                    <select className={`ph-2 pv-2 rounded-md bg-secondary`} value={status} onChange={handleStatusChange} onBlur={() => setEditing(false)} autoFocus>
                        {Object.keys(statusBooksList).map((key) => (
                            <option key={key} value={key}>{statusBooksList[key]}</option>
                        ))}
                    </select>
                )}
            </td>
            <td className="text-center text-xs p-2">
                <button className="w h grid-center text-dark m-auto rounded-md" style={{"--w": "30px", "--h": "30px"}}><Icon name={'eye'} /></button>
            </td>
        </tr>

    )

}