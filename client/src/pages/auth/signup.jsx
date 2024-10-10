import { useState } from "react"
import { useForm } from "react-hook-form"
import fetcherInstance from '../../api/axiosUtils'
import toast from "react-hot-toast"
import { ErrorMessage } from "@hookform/error-message"
import { BarLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"

const Signup = ()=>{
    const {handleSubmit,register,watch,formState,setError} = useForm()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [showPassword,setShowPassword] = useState(false)

    const password = watch('password')

    const submitForm = async(data)=>{
        try{
            const axios = fetcherInstance()
            if(data.password!=data.cnfrmPassword){
                setError('password',{message:"Passwords doesn't match"})
                setError('cnfrmPassword',{message:"Passwords doesn't match"})
                return 
            }
            setLoading(true)
            const response = await axios.post('/user/signup',data,{headers:{Authorization:undefined}})
            if(response.status==201){
                toast.success(response.data.message)
                localStorage.setItem('verifyToken',response.data.token)
                navigate('/auth/verifyOtp/create')
            }
        }catch(err){
            console.log(err);
            toast.error(err.message)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="flex justify-center sm:p-5 items-center">
            <div className="p-3 sm:p-8 md:p-5 h-full relative overflow-y-auto bg-lime-500/30 lg:bg-transparent rounded-xl shadow-xl lg:shadow-none">
                <img src="/logo.png" className="m-auto w-[180px] md:hidden h-[60px] mb-5 p-3 bg-white rounded-md"/>
                <article className="text-center md:mb-10">
                    <h1 className="text-xl md:text-4xl font-semibold">Welcome to <span id="alt-text" className="text-main">Plunes AWC</span></h1>
                    <p className="font-semibold my-3 md:mb-0 mt-3">Create your account Here</p>
                </article>
                <form className="max-w-sm w-full flex flex-col gap-6" onSubmit={handleSubmit(submitForm)}>
                    <div className="input-field w-full flex gap-2 items-center">
                        <article className="flex flex-col flex-1">
                            <label htmlFor="" className="text-xs">First Name</label>
                            <input type="text" placeholder="Enter your First Name" className="w-full border-2 border-blue rounded-xl p-2" {...register('fname',{required:{value:true,message:"fname required"}})}/>
                            <ErrorMessage render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} errors={formState.errors} name="fname"/>
                        </article>
                        <article className="flex flex-col flex-1">
                            <label htmlFor="" className="text-xs">Last Name</label>
                            <input type="text" placeholder="Enter your Last Name" className="w-full border-2 border-blue rounded-xl p-2"  {...register('lname')}/>
                        </article>
                    </div>
                    {/* <div className="input-field flex flex-col">
                        <label htmlFor="" className="text-xs">User ID</label>
                        <input type="text" placeholder="Enter your User ID" className="input-box" {...register('userId',{required:{value:true,message:"UserId is required"}})}/>
                        <ErrorMessage render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} errors={formState.errors} name="userId"/>
                    </div> */}
                    <div className="input-field flex gap-2">
                        <article className="flex flex-col pe-2">
                            <label className="hidden sm:inline">Country code</label>
                            <label className="sm:hidden">Code</label>
                            <select className="input-box text-center" {...register('countryCode')}>
                                <option value="">-</option>
                                <option value={'+91 IN'} selected>+91 (IN) </option>
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
                        <label htmlFor="">Confirm Password</label>
                        <input placeholder="Enter your password" className="input-box" type={showPassword?"text":"password"} {...register('cnfrmPassword',{required:{value:true,message:"Password cannot be empty"},pattern:{value:password,message:"password's doesn't match"}})}/>   
                        <ErrorMessage 
                            render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} 
                            name="password" 
                            errors={formState.errors}
                        />
                    </div>
                    <div className="input-wrapper">
                    <button type="submit" className={`bg-main flex flex-col gap-1 items-center justify-center gap-2 ${loading?"cursor-none":""} text-white rounded-sm w-full shadow-md p-2`}>
                            Create account
                            {loading&&(<BarLoader size={20} color="white"/>)}
                    </button>
                    </div>
                    <div className="input-wrapper">
                        <article className="text-xs text-center">
                            Already have an account?<button onClick={()=>navigate('/auth/login')} type="button" className="text-xs mx-1 underline text-medium text-main">Log in Here</button>
                        </article>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup