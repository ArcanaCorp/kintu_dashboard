import { useLocation } from "react-router-dom"

export default function Bookins () {

    const location = useLocation();

    return (

        <>
        
            <p className="text-xs text-gray">{location.pathname}</p>
            <h1 className="mb-4">Reservas</h1>
        
        </>

    )

}