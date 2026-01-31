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
                        path: '/dashboard/blog'
                    },
                    {
                        path: '/dashboard/faqs'
                    },
                    {
                        path: '/dashboard/users'
                    },
                    {
                        path: '/dashboard/settings'
                    }
                ],
            },
        ],
    },
]);