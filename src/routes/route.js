const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers')


router.all("/*",function(req,res){
    res.status(400).send({status : false, msg:"invalid http request"})
})










mongoose.exports.route = route