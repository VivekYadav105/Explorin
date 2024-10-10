const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    mobile:{type:String,required:true},
    password:{type:String,required:true},
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    otp:{type:String,length:6},
    verfied:{type:Boolean,default:false}
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel