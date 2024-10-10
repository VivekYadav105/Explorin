import { createBrowserRouter, Navigate } from "react-router-dom";
import MainWrapper from "./wrapper/main.wrapper";
import AuthWrapper from "./wrapper/auth.wrapper";
import Dashboard from "./pages/dashboard";
import {Login,Signup,ForgotPassword,ResetPassword,OtpPage} from './pages/auth'

const router = createBrowserRouter([
    {
        path:"/",
        element:<MainWrapper/>,
        children:[{
            index:true,
            element:<Dashboard/>
        }]
    },
    {
        path:'/auth',
        element:<AuthWrapper/>,
        children:[
            {
                path:'login',
                element:<Login/>
            },
            {
                index:true,
                element:<Navigate to={'/auth/login'} replace={true}/>
            },
            {
                path:'signup',
                element:<Signup/>
            },
            {
                path:'forgot',
                element:<ForgotPassword/>
            },
            {
                path:'verifyOtp/:type',
                element:<OtpPage/>
            },
            {
                path:'reset',
                element:<ResetPassword/>
            }
        ]
    }
])

export default router