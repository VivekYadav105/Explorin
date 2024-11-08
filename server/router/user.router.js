const express = require('express')
const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createMessage = require('../utils/sendMessage')
const auth = require('../middleware/auth.middleware')
const { default: mongoose } = require('mongoose')
const {sendVerificationMail,sendForgotEmail} = require('../utils/sendMail')
const employeeModel = require('../models/employeeSchema')
const { parser } = require('../utils/storage')

const router = express.Router()

function generateOtp(length) {
    const characters = '0123456789';
    return Array.from({ length }).reduce((result) => {
        return result + characters.charAt(Math.floor(Math.random() * characters.length));
        }, '');
}


router.post('/login',async(req,res,next)=>{
    try{
        const {username,password,mode} = req.body
        console.log(mode);
        let user;
        if(mode=='manager') {
            user = await userModel.findOne({$or:[{email:username},{username}]}).lean()
        }
        else user = await employeeModel.findOne({$or:[{email:username},{username}]}).lean()

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
        const {password,fname,lname,email} = req.body
        const existingUser = await userModel.findOne({$or:[{email}]})
        console.log(req.body);
        
        let token,otp;
        if(existingUser){
            res.statusCode = 409
            throw new Error("User alreasy exists")
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            token = jwt.sign({fname,lname,password:hashedPassword,email},process.env.JWT_SECRET_TEMP,{expiresIn:'10m'})
            let name = fname + " " + lname||''
            await sendVerificationMail(email,name,token)
        }
        return res.status(201).json({message:"please check your email for verification link"})
    }
    catch(err){
        next(err)
    }
})

router.post('/forgot',async(req,res,next)=>{
    try{
        const {username} = req.body
        const user = await userModel.findOne({$or:[{email:username},{username}]})
        if(!user){
            console.log("user not found");
            return res.json({message:"Please check the mobile for the otp code"})
        }
        const token = jwt.sign({id:user._id,mode:'resetPassword'},process.env.JWT_SECRET_TEMP,{expiresIn:'10m'})
        user.token = token;
        await user.save()
        await sendForgotEmail(user.email,user.username,token)
        return res.json({message:`check your email for reset link`,token:token})
    }
    catch(err){
        next(err)
    }
})

router.post('/verifyOtp',parser.single('profilePic'),async(req,res,next)=>{
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

router.post('/create',async(req,res,next)=>{
    try{
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error('Session Expired')
        }
        const token = req.headers.authorization.split(' ')[1]
        console.log("token:",token);
        const data = jwt.verify(token,process.env.JWT_SECRET_TEMP)
        const {username,profilePic} = req.body;
        const existingUser = await userModel.findOne({$or:[{email:username},{username}]})
        if(existingUser){
            res.statusCode = 409
            throw new Error("User alreasy exists or username is taken")
        }
        const user = await userModel.create({...data,username,profilePic:''})
        return res.json({message:"User Created Successfully",user})
    }catch(err){
        next(err)
    }
})

router.get('/verifyToken',async(req,res,next)=>{
    try{
        console.log(req.headers.authorization);
        
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error("Session Expired")
        }
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            res.statusCode = 403
            throw new Error("Session Expired")
        }
        const payload = jwt.verify(token,process.env.JWT_SECRET_TEMP)
        return res.json({message:"Token Verified Successfully"})
    }catch(err){
        switch(err.name){
            case 'JsonWebTokenError':
                err.message = "Invalid Token"
                break;
            default:
                err.message = "Session Expired"
                break;
        }
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
        const {id} = jwt.verify(token,process.env.JWT_SECRET_TEMP)
        const user = await userModel.findById(id)
        if(user.token!=token){
            res.statusCode = 403
            throw new Error("session expired or Invalid token")
        }
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


module.exports = router