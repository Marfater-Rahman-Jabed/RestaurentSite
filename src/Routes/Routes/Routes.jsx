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
import AdminRoutes from "../AdminRoutes/AdminRoutes";
import OrderDetails from "../../Pages/DashBoard/OrderDetails/OrderDetails";
import SuccessPage from "../../Pages/SuccessPage/SuccessPage";
import ProfileOrderDetails from "../../Pages/ProfileOrderDetails/ProfileOrderDetails";
import PaymentFailPage from "../../Pages/PaymentFailPage/PaymentFailPage";
import PaymentCancelPage from "../../Pages/PaymentCancelPage/PaymentCancelPage";
import NotFoundPage from "../../Pages/NotFoundPage/NotFoundPage";

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
                // loader: ({ params }) => fetch(`https://resturent-manager-server.vercel.app/allItem/${params.id}`)

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
                element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
            },
            {
                path: '/paymentSuccess',
                element: <PrivateRoutes><SuccessPage></SuccessPage></PrivateRoutes>
            },
            {
                path: '/paymentFail',
                element: <PrivateRoutes><PaymentFailPage></PaymentFailPage></PrivateRoutes>
            },
            {
                path: '/paymentCancel',
                element: <PrivateRoutes><PaymentCancelPage></PaymentCancelPage></PrivateRoutes>
            },
            {
                path: '/profileOrderDetails',
                element: <ProfileOrderDetails></ProfileOrderDetails>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <AdminRoutes><DashboardLayout></DashboardLayout></AdminRoutes>,
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
            },
            {
                path: '/dashboard/seeOrderDetails',
                element: <OrderDetails></OrderDetails>
            }
        ]


    },
    {
        path: '*',
        element: <NotFoundPage></NotFoundPage>
    }
])