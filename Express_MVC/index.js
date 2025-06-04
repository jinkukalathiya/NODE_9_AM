const express = require('express');

const port = 8000;

const app = express();

const path = require('path');

const db = require('./config/database');

app.set('view engine', 'ejs');

app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

app.use('/',require('./routes/index'));


// app.use('/',require('./routes/student'));

app.listen(port, (err) => {
    if(err){
        console.log("Something Wrong",err);
    }
    console.log("Server is Running on port : ",port);
})
