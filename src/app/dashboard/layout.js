import { IconBooks, IconBuildingSkyscraper, IconHome, IconListDetails, IconListNumbers, IconLogout, IconQuestionMark, IconSettings2, IconUsers } from "@tabler/icons-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout () {

    const location = useLocation();
    const { user } = useAuth();

    return (
        
        <div className="w-screen flex overflow-hidden">
        
            <nav className="w h-screen bg-white pv-4" style={{"--w": "250px"}}>
                <ul className="w h-screen m-auto flex flex-col gap-4" style={{"--w": "90%"}}>
                    <li className="w-full h border rounded-md flex flex-col items-start justify-center ph-2" style={{"--h": "50px"}}>
                        <h3 aria-label={user.name}>{user.name}</h3>
                        <p className="text-xs text-gray" aria-label={user.roles[0]}>{user.roles[0]}</p>
                    </li>
                    <li>
                        <Link to={'/dashboard'} className={`flex w-full h items-center ph-2 gap-2 rounded-md ${location.pathname === '/dashboard' ? 'text-semibold bg-secondary': 'text-medium'}`} style={{"--h": "40px"}}><IconHome/> Inicio</Link>
                    </li>
                    <li>
                        <Link to={'/dashboard/company'} className={`flex w-full h items-center ph-2 gap-2 rounded-md ${location.pathname === '/dashboard/company' ? 'text-semibold bg-secondary': 'text-medium'}`} style={{"--h": "40px"}}><IconBuildingSkyscraper/> Compañia</Link>
                    </li>
                    <li>
                        <Link to={'/dashboard/experiences'} className={`flex w-full h items-center ph-2 gap-2 rounded-md ${location.pathname === '/dashboard/experiences' ? 'text-semibold bg-secondary': 'text-medium'}`} style={{"--h": "40px"}}><IconListDetails/> Experiencias</Link>
                    </li>
                    <li>
                        <Link to={'/dashboard/bookings'} className={`flex w-full h items-center ph-2 gap-2 rounded-md ${location.pathname === '/dashboard/bookings' ? 'text-semibold bg-secondary': 'text-medium'}`} style={{"--h": "40px"}}><IconBooks/> Reservas</Link>
                    </li>
                    <li>
                        <Link to={'/dashboard/blog'} className={`flex w-full h items-center ph-2 gap-2 rounded-md ${location.pathname === '/dashboard/blog' ? 'text-semibold bg-secondary': 'text-medium'}`} style={{"--h": "40px"}}><IconListNumbers/> Blog</Link>
                    </li>
                    <li>
                        <Link to={'/dashboard/faqs'} className={`flex w-full h items-center ph-2 gap-2 rounded-md ${location.pathname === '/dashboard/faqs' ? 'text-semibold bg-secondary': 'text-medium'}`} style={{"--h": "40px"}}><IconQuestionMark/> Faqs</Link>
                    </li>
                    <li>
                        <Link to={'/dashboard/users'} className={`flex w-full h items-center ph-2 gap-2 rounded-md ${location.pathname === '/dashboard/users' ? 'text-semibold bg-secondary': 'text-medium'}`} style={{"--h": "40px"}}><IconUsers/> Usuarios</Link>
                    </li>
                    <li>
                        <Link to={'/dashboard/settings'} className={`flex w-full h items-center ph-2 gap-2 rounded-md ${location.pathname === '/dashboard/settings' ? 'text-semibold bg-secondary': 'text-medium'}`} style={{"--h": "40px"}}><IconSettings2/> Configuración</Link>
                    </li>
                    <li>
                        <button className="flex w-full h items-center ph-2 gap-2 rounded-md bg-danger-transparent text-danger" style={{"--h": "40px"}}><IconLogout/> Cerrar Sesión</button>
                    </li>
                </ul>
            </nav>

            <main className="w h-screen p-4" style={{"--w": "calc(100dvw - 250px)"}}>
                <Outlet/>
            </main>

        </div>

    )
}