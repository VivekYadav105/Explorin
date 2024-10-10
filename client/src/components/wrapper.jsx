/* eslint-disable react/prop-types */
const Wrapper = (props)=>{
    return(
        <div className="border-2 w-full h-full border-cyan rounded-xl flex flex-col items-center">
            <h1 className="bg-cyan rounded-t-xl py-2 px-2 text-white text-center w-full">{props.header}</h1>
            <div className="flex w-full flex-col grow items-center justify-center">
                {props.children}
            </div>
        </div>
    )
}

export default Wrapper