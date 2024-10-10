import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import FetcherInstance from '../../api/axiosUtils'
import {BarLoader} from 'react-spinners';
import { ErrorMessage } from "@hookform/error-message"
import { Link, useNavigate } from "react-router-dom"

const Login = ()=>{
    const {handleSubmit,register,formState,setValue} = useForm()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [showPassword,setShowPassword] = useState(false)

    const submitForm = async(data)=>{
        try{
            setLoading(true)
            const axios = FetcherInstance()
            const response = await axios.post('/user/login',data)
            if(response.status==200){
                setLoading(false)
                localStorage.setItem('token',response.data.token)
                navigate('/')
            }
            console.log(response)
        }catch(err){
            console.log(err);
            toast.error(err.message)
        }
    }

    const demoCred = ()=>{
        const userId = import.meta.env.VITE_DUMMY_USERID
        const password = import.meta.env.VITE_DUMMY_PASS
        const mobile = import.meta.env.VITE_DUMMY_MOBILE
        setValue('userId',userId)
        setValue('password',password)
        setValue('mobile',mobile)
    }

    return(
        <div className="flex justify-center sm:p-5 items-center ">
            <div className="p-5 sm:p-8 md:p-5 bg-lime-500/30  lg:bg-transparent rounded-xl shadow-xl lg:shadow-none">
                <img src="/logo.png" className="m-auto w-[180px] md:hidden h-[60px] mb-5 p-3 bg-white rounded-md"/>
                <article className="text-center md:mb-10">
                    <h1 className="text-2xl md:text-4xl font-semibold">Welcome to <span id="alt-text" className="text-main">Plunes AWC</span></h1>
                    <p className="font-semibold mt-3">Login to your account</p>
                </article>
                <form className="max-w-sm m-auto flex flex-col gap-6" onSubmit={handleSubmit(submitForm)}>
                    <div className="input-field flex flex-col">
                        <label htmlFor="" className="text-xs">User ID</label>
                        <input type="text" placeholder="Enter your User ID" className="input-box" {...register('userId',{required:{value:true,message:"UserId is required"}})}/>
                        <ErrorMessage render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} errors={formState.errors} name="userId"/>
                    </div>
                    <div className="input-field flex gap-2">
                        <article className="flex flex-col pe-2">
                            <label className="hidden sm:inline">Country code</label>
                            <label className="sm:hidden">Code</label>
                            <select className="input-box text-center" {...register('countryCode')}>
                                <option value="">-</option>
                                <option value={'+91'} selected>+91 (IN) </option>
                            </select>
                        </article>
                        <article className="flex flex-col grow">
                            <label htmlFor="">Mobile No</label>
                            <input 
                                placeholder="Enter your Mobile No" 
                                type="text" 
                                className="input-box" 
                                {...register(
                                    'mobile',
                                    {
                                        required:{value:true,message:"Mobile No is required"},
                                        maxLength:{value:10,message:"Mobile number should be of 10 digits"},
                                        minLength:{value:10,message:"Mobile number should be of 10 digits"}
                                    }
                                )}
                            />
                            <ErrorMessage 
                                render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} 
                                name="mobile" 
                                errors={formState.errors}
                            />
                        </article>
                    </div>
                    <div className="input-field flex flex-col">
                        <label htmlFor="">Password</label>
                        <article className="w-full border-2 border-blue rounded-xl bg-white flex items-center">
                            <input placeholder="Enter your password" className="bg-transparent p-2.5 rounded-lg outline-none  h-full flex-1" type={showPassword?"text":"password"} {...register('password',{required:{value:true,message:"Password cannot be empty"}})}/>   
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
                        <Link to={'/auth/forgot'} className="self-end mt-2">
                            <span type="button" className="text-xs hover:text-violet-500 cursor-pointer duration-300">Forgot Password</span>
                        </Link>
                    </div>
                    <div className="input-wrapper flex itemx-center gap-2">
                        <button type="submit" className={`bg-main flex items-center justify-center gap-2 ${loading?"cursor-none":""} text-white rounded-sm w-full shadow-md p-2`}>
                            Login
                            {loading&&(<BarLoader size={20} color="white"/>)}
                        </button>
                        <button type="button" onClick={demoCred} className="bg-blue text-sm p-1 rounded-md shadow-md text-white">use demo credentials</button>
                    </div>
                    <article className="border-t-2 hidden md:inline-block relative border-gray-500">
                        <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#F3FFDA] p-1 text-xs inline-block rounded-xl">Or</span>
                    </article>
                    <div className="input-wrapper">
                        <article className="text-xs text-center">
                            Don&apos;t have account?<button onClick={()=>navigate('/auth/signup')} type="button" className="text-xs mx-1 underline text-medium text-main">Create Here</button>
                        </article>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login