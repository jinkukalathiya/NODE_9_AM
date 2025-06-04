const express = require('express');
const port = 9000;
const app = express();
const db = require('./config/database');

app.listen(port,(err) => {
    if(err){
        console.log("Server not start");
    }
    console.log("Server start on port : " +port);
})