import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Pages/Home/Home";
import ItemsDetails from "../../Pages/ItemsDetails/ItemsDetails";
import ProductDetails from "../../Pages/ProductDetails/ProductDetails";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import CheckOut from "../../Pages/CheckOut/CheckOut";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import Profile from "../../Pages/Profile/Profile";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import DashBoard from "../../Pages/DashBoard/DashBoard/DashBoard";
import AllReview from "../../Pages/DashBoard/AllReview/AllReview";
import AllOrders from "../../Pages/DashBoard/AllOrders/AllOrders";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allItem/:id',
                element: <ItemsDetails></ItemsDetails>,
                // loader: ({ params }) => fetch(`http://localhost:5000/allItem/${params.id}`)

            },
            {
                path: '/item/details/:id',
                element: <ProductDetails></ProductDetails>

            },
            {
                path: '/register',
                element: <Register></Register>
            }, {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/checkout',
                element: <PrivateRoutes><CheckOut></CheckOut></PrivateRoutes>
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element: <DashBoard></DashBoard>
            },
            {
                path: '/dashboard/allReview',
                element: <AllReview></AllReview>
            },
            {
                path: '/dashboard/allOrders',
                element: <AllOrders></AllOrders>
            }
        ]

    }
])