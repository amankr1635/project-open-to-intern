const internModel = require("../models/internModels");
const collegeModel = require("../models/collegeModel");
const mongoose = require("mongoose");
const validators = require("../validations/validations");

//==============================CREATE COLLEGE=================================================

const createCollege = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0){
      return res.status(400).send({ status: false, message: "Enter the details" });
    }if (!data.name){
      return res.status(400).send({ status: false, message: "Name is mandatory" });
    }if (!data.fullName){
      return res.status(400).send({ status: false, message: "Full name is mandatory" });
    }if (!data.logoLink){
      return res.status(400).send({ status: false, message: "Logo link is mandatory" });
    }if (!validators.isValidName(data.name)){
      return res.status(400).send({ status: false, message: "enter valid name" });
    }
    data.name = data.name.toLowerCase().trim();
    if(data.name.length==0){
      return res.status(400).send({ status: false, message: "please Enter Name" });
    }
    data.fullName = data.fullName.trim();
    if(data.fullName.length==0){
      return res.status(400).send({ status: false, message: "please give fullName" });
    }
    data.logoLink = data.logoLink.trim();
    if(data.logoLink.length==0){
      return res.status(400).send({ status: false, message: "please give a logoLink" });
    }
    let findName = await collegeModel.findOne({name: data.name});
    if (findName){
    return res.status(400).send({ status: false, message: "name already taken" });
    }if (!(validators.isValidLink(data.logoLink) &&validators.isValidFormat(data.logoLink))){
      return res.status(400).send({ status: false, message: "invalid logo link" });
    }
    let newData = await collegeModel.create(data);
    return res.status(201).send({ status: true, Data: newData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//===========================CREATE INTERN==================================================

const createIntern = async function (req, res) {
  try {
    const data = req.body;
    if (Object.keys(data).length == 0){
      return res.status(400).send({status: false, message: "Please provide some Data" });
    }if (!data.name){
      return res.status(400).send({status: false, message: "Please provide name" });
    }if (!data.email){
      return res.status(400).send({status: false, message: "Please provide email" });
    }if (!data.mobile){
      return res.status(400).send({status: false, message: "Please provide mobile" });
    }if (!data.collegeName){
      return res.status(400).send({status: false, message: "Please provide collegeName" });
    }
    data.collegeName = data.collegeName.toLowerCase().trim();
    if(data.collegeName.length==0){
      return res.status(400).send({ status: false, message: "please give collegeName" });
    }
    data.name = data.name.trim();
    if(data.name.length==0){
      return res.status(400).send({ status: false, message: "please Enter Name" });
    }
    data.email = data.email.toLowerCase().trim();
    if(data.email.length==0){
      return res.status(400).send({ status: false, message: "please Eneter email" });
    }
    data.mobile = data.mobile.trim();
    if(data.mobile.length==0){
      return res.status(400).send({ status: false, message: "please Enter mobile number" });
    }
    if (!validators.isValidEmail(data.email)){
      return res.status(400).send({ status: false, message: "Invalid email" });
    }if (!validators.isValidName(data.name)){
      return res.status(400).send({ status: false, message: "Invalid name" });
    }if (!validators.isValidMobile(data.mobile)){
      return res.status(400).send({ status: false, message: "Invalid mobile" });
    }let internByEmail = await internModel.findOne({ email: data.email});
    if (internByEmail){
      return res.status(400).send({ status: false, message: "email is already in use" });
    }
    let internByMobile = await internModel.findOne({mobile: data.mobile});
    if (internByMobile){
      return res.status(400).send({ status: false, message: "mobile is already in use" });
    }
    let college = await collegeModel.findOne({ name: data.collegeName});
    if (!college){
      return res.status(404).send({ status: false, message: "No such college" });
    }
    data.collegeId = college._id;
    const createdIntern = await internModel.create(data);
    res.status(201).send({ satus: true, data: createdIntern });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
//======================================GET COLLEGE DETAILS========================================================

const collegeDetails = async function (req, res) {
  try {
    let queryParams = req.query;
    if (Object.keys(queryParams).length == 0) {
      return res.status(400).send({status: false, message: "Enter Query Params" });
    }
    if (!queryParams.collegeName) {
      return res.status(400).send({status: false, message: "Enter collegeName" });
    }
    queryParams.collegeName = queryParams.collegeName.toLowerCase()
    let collegeData = await collegeModel.findOne({ $and: [{name: queryParams.collegeName},{isDeleted:false}]}).select({ name: 1, fullName: 1, logoLink: 1, isDeleted: 1 });
    if (!collegeData) {
      return res.status(404).send({status: false, message: "no college found" });
    }
    collegeData = collegeData.toObject();
    let appliedIntern = await internModel.find({ $and: [{ collegeId: collegeData._id }, { isDeleted: false }] }).select({ name: 1, email: 1, mobile: 1 });
    if (appliedIntern.length == 0) collegeData.interns = "No interns applied";
    if (appliedIntern.length != 0) collegeData.interns = appliedIntern;
    delete collegeData._id;
    delete collegeData.isDeleted;
    return res.status(200).send({ data: collegeData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//===================================================================================================

module.exports.createCollege = createCollege;

module.exports.createIntern = createIntern;

module.exports.collegeDetails = collegeDetails;
