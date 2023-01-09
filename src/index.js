const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
const route = require('./routes/route');

app.use(express.json());

mongoose.connect("mongodb+srv://sandy_varanasi:sRzKkk5zN4u6uAZG@sandy-clusture.eimj9vg.mongodb.net/group13Database", {
    useNewUrlParser: true
})
.then(()=>console.log("Mongo DB is connected"))
.catch(err=> console.log(err))

app.use('/',route);

app.listen(3000,function(){
    console.log("server active on port "+3000)
});