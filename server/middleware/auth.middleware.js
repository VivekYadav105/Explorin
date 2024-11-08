const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    try{
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error('user not authenticated')
        }
        const secret = process.env.JWT_SECRET_MAIN
        
        const token = req.headers.authorization.split(' ')[1]
        const isValidToken = jwt.verify(token,secret||'',{complete:true});
        if(!isValidToken){
            res.statusCode = 403
            console.log('not a valid token')
            throw new Error("session expired")
        }
        const user = isValidToken.payload
        req.user = user
        next()
    }catch(err){
        if (err.name === 'JsonWebTokenError') {
            res.status(401).send({ message: 'Session expired, please log in again.' });
        } else {
            res.statusCode = 403
            next(err);
        }
    }
}

const isManager = (req,res,next)=>{
    try{
        if(req.user.role=='manager') next()
        else{
            res.statusCode = 403
            throw new Error("User is not manager");
        }
    }catch(err){
        next(err)
    }
}


module.exports = {auth,isManager}