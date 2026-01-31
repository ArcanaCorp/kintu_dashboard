import { Outlet } from "react-router-dom";
import Nav from "@/app/layout/nav";

export default function DashboardLayout () {

    return (
        
        <div className="w-screen flex overflow-hidden">

            <Nav/>

            <main className="w h-screen p-4 scroll-y" style={{"--w": "calc(100dvw - 250px)"}}>
                <Outlet/>
            </main>

        </div>

    )
}