const errorMiddleware = (err,req,res,next)=>{
    try{
        console.log(err)
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
        return res.status(statusCode).json({message:err.message,status:statusCode})
    }catch(err){
        return res.status(500).json({message:"server error please try later",status:500})
    }
}

module.exports = errorMiddleware