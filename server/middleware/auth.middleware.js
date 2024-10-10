const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    try{
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error('user not authenticated')
        }
        const secret = process.env.AUTH_SECRET
        console.log(secret);
        
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
            next(err);
        }
    }
}


module.exports = auth