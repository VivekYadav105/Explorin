import mobile from '../assets/mobile.svg'
import admitted from '../assets/admitted.svg'

const Appointment = ()=>{
    return(
            <div className="border-2 w-screen max-w-xl border-cyan rounded-xl">
                <article className="bg-cyan text-white rounded-t-xl flex gap-3 p-3">
                    <article className='flex-1 flex gap-4'>
                        <span className='text-white'>Ip: 14</span>
                        <span className='text-white'>Prathusha Raj</span>
                        <span className='text-white'>27 y</span>
                    </article>
                    <article className='flex gap-2 items-center'>
                        <img src={mobile} alt="" />
                        <span className='text-white'>
                            1234567890
                        </span>
                    </article>
                </article>
                <article className='p-4'>
                    <p className='text-grey font-medium'>
                        <span className='inline-block w-[150px]'>Service Provider:</span>
                        <span className=''>Aditya Birla Health Insurance Company Ltd</span>
                    </p>
                    <p className='text-grey font-medium'>
                        <span className='inline-block w-[150px]'>Hospital:</span>
                        <span>Fortis Noida</span>
                    </p>
                    <p className='text-grey font-medium'>
                        <span className='inline-block w-[150px]'>Treatment:</span>
                        <span>Radiation Therapy</span>
                    </p>
                </article>
                <article className='flex flex-wrap md:flex-no-wrap justify-center p-3 gap-2 items-center'>
                    <button className='border-[1px] flex-1 border-slate-600 rounded-xl p-2'>
                        <article className='flex items-center gap-3 px-2'>
                            <img src={admitted} alt="" />
                            <p>
                                <p>Admitted</p>
                                <span>13-09-2023</span>
                            </p>
                        </article>
                    </button>
                    <button className='border-[1px] flex-1 border-slate-600 rounded-xl p-2'>
                        <p>Claim Status</p>
                        <span className='text-red-600 font-semibold'>Final pending</span>
                    </button>
                    <button className='border-[1px] flex-1 border-slate-600 rounded-xl p-2'>
                        <p>Hospital Ops Status</p>
                        <article className='font-medium'>
                            <span className='text-grey'>Status</span>
                            <span className='text-red-500 mx-2'>No</span>
                            <span className='bg-red-500 text-sm text-white p-1 rounded-md'>25</span>
                            <span className='text-sky-400 mx-1 underline'>View</span>
                        </article>
                    </button>
                </article>
            </div>
    )
}   
export default Appointment