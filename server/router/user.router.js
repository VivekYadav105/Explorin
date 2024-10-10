const express = require('express')
const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createMessage = require('../utils/sendMessage')
const auth = require('../middleware/auth.middleware')
const { default: mongoose } = require('mongoose')

const router = express.Router()

function generateOtp(length) {
    const characters = '0123456789';
    return Array.from({ length }).reduce((result) => {
        return result + characters.charAt(Math.floor(Math.random() * characters.length));
        }, '');
}


router.post('/login',async(req,res,next)=>{
    try{
        console.log(req.body)
        const {userID,mobile,password} = req.body
        const user = await userModel.findOne({userID,mobile}).lean()
        if(!user){
            res.statusCode = 404
            throw new Error("Invalid Credentials!!")
        }
        const hashedPassword = await bcrypt.compare(password,user.password)
        
        if(!hashedPassword){
            res.statusCode = 400
            throw new Error("Credentials doesn't match")
        }
        const {password:userPassword,...userDoc} = user
        const token = jwt.sign(userDoc,process.env.JWT_SECRET_MAIN,{expiresIn:'1h'})
        return res.json({message:"User Logged In succssfully",token:token})
    }
    catch(err){
        next(err)
    }
})

router.post('/signup',async(req,res,next)=>{
    try{
        const {mobile,password,fname,lname,countryCode} = req.body
        const existingUser = await userModel.findOne({$or:[{mobile}]})
        console.log(req.body);
        
        let token,otp;
        if(existingUser){
            if(existingUser.verfied){
                res.statusCode = 409
                throw new Error("User alreasy exists")
            }
            else{
                token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET_TEMP,{expiresIn:'10m'})
                otp = generateOtp(6)
                existingUser.otp = otp
                await existingUser.save()
                await createMessage(existingUser.mobile,`Your one time login is ${otp} and is valid for 10mins`) 
            }
            
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const [code,country] = countryCode.split(' ')
            const userId = country + JSON.stringify(Date.now())
            otp = generateOtp(6)
            const user = await userModel.create({userId,mobile,password:hashedPassword,fname,lname,otp})
            token = jwt.sign({id:user._id,mode:'verifyUser'},process.env.JWT_SECRET_TEMP,{expiresIn:'10m'})
            const res = await createMessage(mobile,`Your one time login is ${otp} and is valid for 10mins`) 
        }
        return res.status(201).json({message:`Your otp is ${otp}`,token:token})
    }
    catch(err){
        next(err)
    }
})

router.post('/forgot',async(req,res,next)=>{
    try{
        const {userId,mobile} = req.body
        const user = await userModel.findOne({$or:[{userId},{mobile}]})
        if(!user){
            console.log("user not found");
            return res.json({message:"Please check the mobile for the otp code"})
        }
        const otp = generateOtp(6)
        user.otp = otp;
        await user.save()
        const token = jwt.sign({id:user._id,mode:'resetPassword'},process.env.JWT_SECRET_TEMP,{expiresIn:'10m'})
        return res.json({message:`Your Otp is ${otp}`,token:token})
    }
    catch(err){
        next(err)
    }
})

router.post('/verifyOtp',async(req,res,next)=>{
    try{
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error('Session Expired')
        }
        const token = req.headers.authorization.split(' ')[1]
        const {otp} = req.body
        const {id,mode} = jwt.verify(token,process.env.JWT_SECRET_TEMP)
        console.log(id,mode,otp);
        const user = await userModel.findById(id)
        if(!user){
            res.statusCode = 400
            throw new Error("User not found!")
        }
        if(user.otp!=otp){
            res.statusCode = 400
            throw new Error("Invalid Otp Code")
        }
        if(mode==='verifyUser'){
            user.otp = ''
            user.verfied = true
            await user.save()
            const messageResponse = await createMessage(user.mobile,`Your UserId is ${user.userId}.`) 
            return res.json({message:`Your User Id is ${user.userId}`})
        }else{
            const resettoken = jwt.sign({id},process.env.JWT_SECRET_TEMP)
            return res.json({message:"Otp Verified Successfullt",token:resettoken})
        }
    }catch(err){
        console.log(err.name);
        if (err.name === 'JsonWebTokenError') {
            res.status(401).send({ message: 'Session expired, please log in again.' });
        } else {
            next(err);
        }
    }
})


router.post('/verifyToken',async(req,res,next)=>{
    try{
        if(!req.headers.authorization||req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error("Session Expired")
        }
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            res.statusCode = 403
            throw new Error("Session Expired")
        }
        const verify = jwt.verify(token,process.env.JWT_SECRET_MAIN)
        if(mongoose.isValidObjectId(verify._id)){
            return res.json({message:"Valid Token"})
        }
        else{
            res.statusCode = 400
            throw new Error("Invalid Token")
        }
    }catch(err){
        next(err)
    }
})

router.post('/reset',async(req,res,next)=>{
    try{
        const {password} = req.body
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error('Session Expired')
        }
        const token = req.headers.authorization.split(' ')[1]
        const {id} = await jwt.verify(token,process.env.JWT_SECRET_TEMP)
        const user = await userModel.findById(id)
        if(!user){
            res.statusCode = 403
            throw new Error("Session Expired. Please try again!!")
        }
        user.password = await bcrypt.hash(password,10)
        await user.save()
        return res.json({message:`Password reset sucessfully`})
    }catch(err){
        next(err)
    }
})

router.get('/reset/:token',async(req,res,next)=>{
    try{
        const token = req.params.token
        const success = jwt.verify(token,process.env.JWT_SECRET_TEMP)
        return res.json({message:'correct token'})
    }
    catch(err){
        res.statusCode = 403
        err.message = 'Session Expired or invalid token'
        next(err)
    }
})

router.post('/dashboard',auth,async(req,res,next)=>{
    try{
        
    }catch(err){
        next(err)
    }
})


module.exports = router