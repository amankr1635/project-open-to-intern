const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
const multer = require("multer");
const route = require('./routes/route');

app.use(express.json());
app.use(multer().any())
mongoose.connect("mongodb+srv://Amankr:pwwELCe59UIUh9mj@cluster0.oxwexg5.mongodb.net/group13Database")
.then(()=>console.log("Mongo DB is connected"))
.catch(err=> console.log(err))

app.use('/',route);

app.listen(3001,function(){
    console.log("server active on port "+3001)
});
