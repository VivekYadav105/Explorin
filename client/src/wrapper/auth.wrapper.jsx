import { Outlet,Navigate } from "react-router-dom"
import illustration from '../assets/illustration.svg'

const AuthWrapper = ()=>{

    if(localStorage.getItem('token')){
        return <Navigate to='/'/>
    }

    return(
        <section className="wrapper login-wrapper flex flex-col h-screen overflow-y-auto ">
            <img src="/logo.png" className="hidden md:inline-block wrapper-logo"/>
            <div className="flex flex-row grow h-px w-full">
                <div className="h-full flex-1 p-20 hidden lg:flex items-center justify-center">
                    <img src={illustration} className="object-contain w-full max-h-full" alt=""/>
                </div>
                <div className="flex-1 flex flex-col">
                    <Outlet/>
                </div>
            </div>
        </section>
    )
}

export default AuthWrapper