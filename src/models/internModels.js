const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    email:{
        unique:true,
        required:true
    },
    mobile:{
        type:Number,
        unique:true
    },
    collegeId:{
        type:ObjectId,
        ref: "collegeData"
    },
    isDeleted:{
        type:Boolean,
        default:false
    },

},{timestamps:true})
  

module.exports=mongoose.model("InternData",internSchema)






// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}