const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePic:{type:String},
    role:{type:String,required:true,default:'manager'},
    token:{type:String}
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel
