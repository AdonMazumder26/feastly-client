import {
    createBrowserRouter,
} from "react-router";
import Home from "../Pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <h2>page not found</h2>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/auth/register",
                element: <Register></Register>
            },
            {
                path: "/auth/login",
                element: <Login></Login>
            }
        ]
    }
]);

export default router;