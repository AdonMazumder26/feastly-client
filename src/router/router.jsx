import {
    createBrowserRouter,
} from "react-router";
import Home from "../Pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AllFoods from "../Pages/AllFoods/AllFoods";
import FoodDetails from "../components/FoodDetails/FoodDetails";
import FoodPurchase from "../Pages/FoodPurchase/FoodPurchase";
import PrivateRoute from "./PrivateRoute";
import AddFood from "../Pages/AddFood/AddFood";
import UpdateFood from "../Pages/UpdateFood/UpdateFood";
import MyFoods from "../Pages/MyFoods/MyFoods";
import MyOrders from "../Pages/MyOrders/MyOrders";
import Gallery from "../components/Gallery/Gallery";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <h2>page not found</h2>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/allFoods",
                element: <AllFoods></AllFoods>

            },
            {
                path: "/gallery",
                element: <Gallery></Gallery>
            },
            {
                path: "/allFoods/:id",
                element: <FoodDetails></FoodDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/foods/${params.id}`)
            },
            {
                path: "/purchase/:id",
                element: <PrivateRoute><FoodPurchase></FoodPurchase></PrivateRoute>
            },
            {
                path: "/addFood",
                element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
            },
            {
                path: "/updateFood/:id",
                element: <PrivateRoute><UpdateFood></UpdateFood></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/foods/${params.id}`)
            },
            {
                path: "/myFoods/:email",
                element: <MyFoods></MyFoods>
                // loader: ({ params }) => fetch(`http://localhost:5000/myFoods?email=${params.email}`)
            },
            {
                path: "/myOrders/:email",
                element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
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