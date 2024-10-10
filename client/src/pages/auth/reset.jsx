import { useState } from "react"
import { useForm } from "react-hook-form"
import fetcherInstance from '../../api/axiosUtils'
import toast from "react-hot-toast"
import { ErrorMessage } from "@hookform/error-message"
import { BarLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"

const Reset = ()=>{
    const {handleSubmit,register,formState,setError} = useForm()
    const [showPassword,setShowPassword] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const submitForm = async(data)=>{
        try{
            if(data.password!=data.cnfrmPassword){
                setError('password',{message:"Passwords doesn't match"})
                setError('cnfrmPassword',{message:"Passwords doesn't match"})
                return 
            }
            const axios = fetcherInstance()
            setLoading(true)
            const response = await axios.post('/user/reset',{password:data.password},{headers:{Authorization:`Bearer ${localStorage.getItem('verifyToken')}`}})
            if(response.status==200){
                toast.success(response.data.message)
                localStorage.removeItem('verifyToken')
                navigate('/')
            }
            console.log(data);
        }catch(err){
            console.log(err);
            toast.error(err.message)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="grow flex justify-center p-5 items-center">
            <div className="p-5 sm:p-8 md:p-5 bg-lime-500/30 lg:bg-transparent rounded-xl shadow-xl lg:shadow-none">
                <img src="/logo.png" className="m-auto w-[180px] md:hidden h-[60px] mb-5 p-3 bg-white rounded-md"/>
                <article className="text-center mb-10">
                    <h1 className="text-4xl font-semibold">Welcome to <span id="alt-text" className="text-main">Plunes AWC</span></h1>
                    <p className="font-semibold mt-3">Reset your Credentials</p>
                </article>
                <form className="max-w-sm m-auto flex flex-col gap-6" onSubmit={handleSubmit(submitForm)}>
                    <div className="input-field flex flex-col">
                        <label htmlFor="">Password</label>
                        <article className="w-full border-2 border-blue rounded-xl bg-white flex items-center">
                            <input placeholder="Enter your password" className="bg-transparent p-2.5 rounded-lg outline-none  h-full flex-1" type={showPassword?"text":"password"} {...register('password',{required:{value:true,message:"Password cannot be empty"},minLength:{value:6,message:"Minimum length of password is 6"}})}/>   
                            <button type="button" className="p-2 pe-4" onClick={()=>setShowPassword(prev=>!prev)}>
                                {showPassword?
                                    <img className="w-5 h-5" src="/lock.svg" alt="hide" />
                                    :<img className="w-5 h-5" src="/lockStrike.svg" alt="hide" />
                                }
                            </button>
                        </article>
                        <ErrorMessage 
                            render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} 
                            name="password" 
                            errors={formState.errors}
                        />
                    </div>
                    <div className="input-field flex flex-col">
                        <label htmlFor="" className="text-xs">Confirm Password</label>
                        <input type={showPassword?"text":"password"} placeholder="Enter your Password" className="input-box" {...register('cnfrmPassword')}/>
                        <ErrorMessage render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} errors={formState.errors} name="cnfrmPassword"/>
                    </div>
                    <div className="input-wrapper">
                    <button type="submit" className={`bg-main flex flex-col gap-1 items-center justify-center gap-2 ${loading?"cursor-none":""} text-white rounded-sm w-full shadow-md p-2`}>
                            Reset Password
                            {loading&&(<BarLoader size={20} color="white"/>)}
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Reset