const { strict } = require("assert");
const mongoose = require("mongoose")
const validator = require("mongoose-type-email");
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    email:{
        type:validator,
        unique:true,
        required:true
    },
    mobile:{
        type:Number,
        min:10,
        max:10,
        unique:true
    },
    collegeId:{
        type:ObjectId,
        ref: "college"
    },
    isDeleted:{
        type:Boolean,
        default:false
    },

},{timestamps:true})
  

module.exports=mongoose.model("Intern",internSchema)






// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}