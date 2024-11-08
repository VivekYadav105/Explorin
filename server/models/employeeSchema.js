const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    fname:{type:String,required:true},
    lname:{type:String},
    id:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    mobile:{type:String,required:true,unique:true},
    gender:{type:String,required:true,enum:['M','F']},
    password:{type:String,required:true},
    course:[{type:String,required:true}],
    profilePic:{type:String},
    designation:{type:String,required:true}
},{ timestamps: true })

const employeeModel = new mongoose.model('employee',employeeSchema)

module.exports = employeeModel