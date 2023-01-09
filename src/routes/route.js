const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers')


router.post('/functionup/colleges',controller.createCollege)



router.post('/functionup/interns',controller.createIntern)



router.get('/functionup/collegeDetails',controller.collegeDetails)



router.all("/*",function(req,res){
    res.status(400).send({status : false, msg:"invalid http request"})
})






module.exports = router