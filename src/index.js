import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Providers } from "@/providers/index.provider";
import { routes } from "@/routes/index.route";

import '@/shared/css/global.css'
import '@/shared/css/system.css'

createRoot(document.getElementById('root')).render(
    <>
        <Providers>
            <RouterProvider router={routes} />
        </Providers>
    </>
)