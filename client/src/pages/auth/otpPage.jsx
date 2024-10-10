import { useState } from "react"
import toast from "react-hot-toast"
import axios, {isAxiosError} from 'axios'
import {BarLoader} from 'react-spinners';
import OtpInput from 'react-otp-input';
import {  useNavigate, useParams } from "react-router-dom"

const OtpPage = ()=>{
    const navigate = useNavigate()
    const [otp,setOtp] = useState('')
    const params = useParams()
    const [loading,setLoading] = useState(false)

    const submitForm = async(e)=>{
        try{
            e.preventDefault()
            if(otp.length!=6){
                toast.error('Please Enter complete OTP')
                return
            }
            setLoading(true)
            const token = `Bearer ${localStorage.getItem('verifyToken')}`
            const response = await axios.post('http://localhost:5000/user/verifyOtp',{otp},{headers:{Authorization:token}})
            if(response.status==200){
                setLoading(false)
                toast.success(response.data.message)
                if(params.type=='resetCred') {
                    localStorage.setItem('verifyToken',response.data.token)
                    navigate('/auth/reset')
                    return
                }
                navigate('/')
            }
            console.log(response)
        }catch(err){
            console.log(err);
            setLoading(false)
            setOtp('')
            if(isAxiosError(err)){
                toast.error(err.response.data.message)
            }
        }
    }


    return(
        <div className="flex justify-center sm:p-5 items-center ">
            <div className="p-5 sm:p-8 md:p-5 bg-lime-500/30  lg:bg-transparent rounded-xl shadow-xl lg:shadow-none">
                <img src="/logo.png" className="m-auto w-[180px] md:hidden h-[60px] mb-5 p-3 bg-white rounded-md"/>
                <article className="text-center md:mb-10">
                    <h1 className="text-2xl md:text-4xl font-semibold">Welcome to <span id="alt-text" className="text-main">Plunes AWC</span></h1>
                    <p className="font-semibold mt-3">Please Enter the Opt Sent to you registered Mobile</p>
                </article>
                <form className="max-w-sm m-auto flex flex-col gap-6" onSubmit={submitForm}>
                    <div className="input-field flex flex-col">
                        <label htmlFor="" className="text-xs">Otp Code</label>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            inputStyle={`input-box flex-1`}
                            containerStyle={`input-box mt-3 `}
                            renderSeparator={<span className="">-</span>}
                            renderInput={(props) => <input className="input-box" placeholder="X" {...props} />}                  
                        />
                    </div>
                    <div className="input-wrapper flex itemx-center gap-2">
                        <button type="submit" className={`bg-main flex items-center justify-center gap-2 ${loading?"cursor-none":""} text-white rounded-sm w-full shadow-md p-2`}>
                            Verify Otp
                            {loading&&(<BarLoader size={20} color="white"/>)}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OtpPage