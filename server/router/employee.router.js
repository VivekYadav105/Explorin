const { Router } = require('express');
const employeeModel = require('../models/employeeSchema');
const employeeJoiSchema = require('../validators/employee.validator');
const {auth,isManager} = require('../middleware/auth.middleware');
const {parser} = require('../utils/storage')
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const {sendCreationMail} = require('../utils/sendMail')
const router = Router()

function generateOtp(length) {
    const characters = '0123456789';
    return Array.from({ length }).reduce((result) => {
        return result + characters.charAt(Math.floor(Math.random() * characters.length));
        }, '');
}

router.get('/all',auth,async(req,res,next)=>{
    try{
        const employees = await employeeModel.find({});
        return res.status(200).json({employees})
    }catch(err){
        next(err)
    }
})

router.post('/create',auth,isManager,parser.single('profilePic'),async(req,res,next)=>{
    try{
        let url = ''
        const valid = employeeJoiSchema.validate(req.body)
        if(!valid){
            res.statusCode = 400
            throw new Error("One or more fields is missing")
        }    
        console.log(req.file);
        if(req.file) url = req.file.path 
        const {fname,lname,email,mobile,course,gender,designation} = req.body
        const existingUser = await employeeModel.find({$or:[{email:email},{mobile:mobile}]})
        if(existingUser.length){
            res.statusCode = 409
            throw new Error("User with email or number already exists")
        }
        const id = "EM"+String(Math.floor(Math.random()*100))+generateOtp(4);
        const password = crypto
        .randomBytes(8)
        .toString('base64')
        .slice(0, 8) 
        .replace(/\+/g, 'A') 
        .replace(/\//g, 'B'); 
        console.log(password);
        const hashedPassword = await bcrypt.hash(password,10)
        const employee = await employeeModel.create({id,fname,lname,email,mobile,course,gender,designation,password:hashedPassword,profilePic:url})
        await sendCreationMail(employee,password)
        return res.status(201).json({message:'Employee created successfully'})
    }catch(err){
        next(err)
    }
})

router.post('/edit/:id',auth,isManager,parser.single('profilePic'),async(req,res,next)=>{
    try{
        const {fname,lname,email,mobile,course,gender,designation} = req.body
        console.log(req.file);
        
        const valid = employeeJoiSchema.validate(req.body)
        if(!valid){
            res.statusCode = 400
            throw new Error("One or more fields is missing")
        }    
        const url = req.file.path || ''
        const employee = await employeeModel.findByIdAndUpdate(req.params.id,{fname,lname,email,mobile,course,gender,designation,profilePic:url},{new:true})
        return res.status(200).json({message:'Employee updated successfully',employee:employee})
    }catch(err){
        next(err)
    }
})

router.get('/delete/:id',auth,isManager,async(req,res,next)=>{
    try{
        const employee = await employeeModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:'Employee deleted successfully'})
    }catch(err){
        next(err)
    }
})

module.exports = router