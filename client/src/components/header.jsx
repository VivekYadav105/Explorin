import { useState } from 'react'
import close from '../assets/close.png'
import avatar from '../assets/avatar.jpg'
import { useUserContext } from '../context/user'

const Header = ()=>{
    const [expanded,setExpanded] = useState(false)
    const [showDetalis,setShowDetails] = useState(false)
    const {user} = useUserContext()
    
    const logOut = ()=>{
        localStorage.removeItem('token')
        window.location.reload()
    }
    
    return(
        <section className="bg-white flex items-center p-5 px-10 border-b-2 shadow-xl">
            <article>
                <img src="/logo.png" className="sm:w-[100px] md:w-[150px] h-10"/>
            </article>
            <div className="flex-1 flex items-center justify-end relative">
                <button onClick={()=>setExpanded(prev=>!prev)} className='flex items-center gap-2'>
                    <span className='hidden md:inline-block'>
                        {user&&user.userId?user.userId:'-'}
                    </span>
                    <img src={avatar} className='w-8 rounded-full'/>
                    <img className={`w-3 ${expanded?"rotate-180":""} duration-300`} src='/dropDown.png'/>
                </button>
                <div className={`fixed md:absolute top-0 md:top-full ${expanded?"w-screen bg-gray-400 md:bg-transparent h-screen md:inline-block md:w-fit md:h-fit":"h-0"} right-0 overflow-hidden`}>
                    <div className='border-2 flex flex-col bg-white p-1 h-full md:h-fit rounded-xl '>
                        <div className='flex md:hidden items-center justify-end'>
                            <button className='mb-2 hover:bg-main rounded-full p-2' onClick={()=>setExpanded(false)}>
                                <img src={close} className='w-8  h-8' alt="" />
                            </button>
                        </div>
                        <article className={`${showDetalis?"md:flex":"md:hidden"} flex bg-blue p-5 flex-col mb-4`}>
                            <h1 className='text-start font-semibold text-xl'>User Details</h1>
                            <p>
                                <span className='inline-block w-52'>
                                    User Id:
                                </span>
                                <span>
                                    {user&&user.userId?user.userId:'-'}
                                </span>
                            </p>
                            <p>
                                <span className='inline-block w-52'>
                                    First Name:
                                </span>
                                <span>
                                    {user&&user.fname?user.fname:'-'}
                                </span>
                            </p>
                            <p>
                                <span className='inline-block w-52'>
                                    Last Name:
                                </span>
                                <span>
                                    {user&&user.lname?user.lname:'-'}
                                </span>
                            </p>
                            <p>
                                <span className='inline-block w-52'>
                                    Mobile:
                                </span>
                                <span>
                                    {user&&user.mobile?user.mobile:'-'}
                                </span>
                            </p>
                        </article>
                        <button className='hover:bg-main p-2 rounded-xl hidden md:inline-block' onClick={()=>setShowDetails(prev=>!prev)}>{showDetalis?"Hide":"View"} Details</button>
                        <button className='hover:bg-main p-2 rounded-xl' onClick={()=>logOut()}>Log Out</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header