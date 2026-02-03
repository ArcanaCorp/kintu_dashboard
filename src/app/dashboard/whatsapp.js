import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { fetchQr, fetchStatus } from "@/services/whatsapp.service";

export default function WhatsappView () {

    const location = useLocation();
    const [status, setStatus] = useState("INIT")
    const [qr, setQr] = useState(null)
    const [hint, setHint] = useState("Esperando inicialización…")
    const [error, setError] = useState(false)

    const refresh = async () => {
        try {
            const currentStatus = await fetchStatus()
            setStatus(currentStatus.status)
            setError(false)

            if (currentStatus.status === "QR") {
                const qrData = await fetchQr()
                if (qrData) {
                setQr(qrData)
                setHint("Escanea el QR desde WhatsApp")
                }
            } else if (currentStatus.status === "READY") {
                setQr(null)
                setHint("WhatsApp conectado correctamente")
            } else {
                setQr(null)
                setHint("Inicializando sesión…")
            }
        } catch (err) {
            setError(true)
            setHint("Error conectando con el servidor")
        }
    }

    useEffect(() => {
        refresh()
        const interval = setInterval(refresh, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
    
        <>
        
            <p className="text-xs text-gray">{location.pathname}</p>
            <h1 className="mb-4">WhatsApp</h1>

            <div className="w-full grid-center p-2 border bg-white rounded-md h" style={{"--h": "400px"}}>
                <div>
                    <h3>Estado: <span>{status}</span></h3>
                    {qr && (
                        <img src={qr} alt="QR WhatsApp" className="w-48 h-48 border rounded"/>
                    )}
                    <p className={`text-sm ${error ? "text-red-600" : "text-gray-600"}`}>{hint}</p>
                </div>
            </div>

        </>
    
    )

}