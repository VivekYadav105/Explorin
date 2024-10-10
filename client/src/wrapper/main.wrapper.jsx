import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import Header from "../components/header"
import { useUserContext } from "../context/user"

const MainWrapper = ()=>{
    const {setUser} = useUserContext()
    // useEffect(()=>{
    //     (async function() {
    //         try{
    //             const response = await verifyToken();
    //             if(response.status==403){
    //                 toast.error('Session Expired! Please Login')
    //                 // token is being removed in interceptor
    //             }
    //         }catch(err){
    //             toast.error(err.message)
    //         }
    //     })();
    // },[])

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            setUser(JSON.parse(atob(token.split('.')[1])))
        }
    },[])

    if(!localStorage.getItem('token')){
       return <Navigate to='/auth/login'/>
    }
    
    return(
        <section className="min-h-screen flex flex-col">
            <Header/>
            <Outlet/>
        </section>
    )
}

export default MainWrapper