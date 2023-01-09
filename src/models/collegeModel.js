const mongoose = require("mongoose");

//=====*College Schema*=====

const collegeSchema = new mongoose.Schema({
    name : {
        type: String,
        required :true,
        unique : true,
        toLowerCase : true
    },
    fullName :{
        type : String,
        required : true
    },
    logoLink: {
        type :String,
        required: true,
    },
    isDeleted :{
        type : Boolean,
        default:false
    }
},{timeStamps : true})

module.exports = mongoose.model("collegeData", collegeSchema)