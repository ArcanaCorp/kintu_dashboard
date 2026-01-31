import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function AuthLayout () {
    return (
        <>
            <div className="w-screen h-screen grid-center">
                <Outlet/>
            </div>
            <Toaster position="top-center" duration={3000} closeButton richColors />
        </>
    )
}