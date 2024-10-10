import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ErrorMessage } from "@hookform/error-message"
import fetcherInstance from '../../api/axiosUtils'
import { useNavigate } from "react-router-dom"

const ForgotPassword = ()=>{
    const {handleSubmit,register,formState} = useForm()
    const navigate = useNavigate()
    const [mode,setMode] = useState(0)

    const submitForm = async(data)=>{
        try{
            const axios = fetcherInstance()
            const response = await axios.post('/user/forgot',data)
            if(response.status==200){
                localStorage.setItem('verifyToken',response.data.token)
                toast.success(response.data.message)
                navigate('/auth/verifyOtp/resetCred')
            }
        }catch(err){
            console.log(err);
            toast.error(err.message)
        }
    }

    return(
        <div className="flex justify-center sm:p-5 items-center grow">
            <div className="p-5 h-full sm:p-8 md:p-5 bg-lime-500/30 lg:bg-transparent rounded-xl shadow-xl lg:shadow-none">
                <img src="/logo.png" className="m-auto w-[180px] md:hidden h-[60px] mb-5 p-3 bg-white rounded-md"/>
                <article className="text-center mb-3">
                    <h1 className="text-4xl font-semibold">Welcome to <span id="alt-text" className="text-main">Plunes AWC</span></h1>
                    <p className="font-semibold mt-3">Reset your Credentials</p>
                </article>
                <form className="max-w-sm m-auto flex flex-col gap-6" onSubmit={handleSubmit(submitForm)}>
                    <div className="input-field flex gap-4 justify-center">
                        <article className="p-1.5 bg-blue gap-2 flex items-center shadow-lg rounded-2xl">
                            <button type="button" onClick={()=>setMode(0)} className={`${mode==0?"bg-main text-white shadow-sm":""} duration-300 p-2 rounded-xl`}>By UserId</button>
                            <button type="button" onClick={()=>setMode(1)} className={`${mode==1?"bg-main text-white shadow-sm":""} duration-300 p-2 rounded-xl`}>By Mobile</button>
                        </article>
                    </div>
                    {mode==0&&(
                        <div className="input-field flex flex-col">
                            <label htmlFor="" className="text-xs">User ID</label>
                            <input type="text" placeholder="Enter your User ID" className="input-box" {...register('userId',{required:{value:true,message:"UserId is required"}})}/>
                            <ErrorMessage render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} errors={formState.errors} name="userId"/>
                        </div>
                    )}
                    {mode==1&&(
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
                    )}
                    <div className="input-wrapper">
                        <button type="submit" className="bg-main text-white rounded-sm w-full shadow-md p-2">Send Otp</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword