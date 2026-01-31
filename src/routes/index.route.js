import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/app/auth/AuthLayout";
import LoginPage from "@/app/auth/LoginPage";
import DashboardLayout from "@/app/dashboard/layout";
import ProtectedRoute from "./protected.route";
import PublicRoute from "./public.route";
import HomeView from "../app/dashboard";
import CompanyView from "../app/dashboard/company";
import ExperiencesView from "../app/dashboard/experiences";
import Bookins from "../app/dashboard/bookins";
import Loading from "../app/dashboard/loading";

export const routes = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    {
                        index: true,
                        element: <LoginPage />,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/dashboard",
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <HomeView/>,
                    },
                    {
                        path: '/dashboard/company',
                        element: <CompanyView/>
                    },
                    {
                        path: '/dashboard/experiences',
                        element: <ExperiencesView/>
                    },
                    {
                        path: '/dashboard/bookings',
                        element: <Bookins/>
                    },
                    {
                        path: '/dashboard/blog',
                        element: <Loading/>
                    },
                    {
                        path: '/dashboard/faqs',
                        element: <Loading/>
                    },
                    {
                        path: '/dashboard/users',
                        element: <Loading/>
                    },
                    {
                        path: '/dashboard/settings',
                        element: <Loading/>
                    }
                ],
            },
        ],
    },
]);