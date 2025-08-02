const express = require('express');

const port = 8000;

const app = express();

const db = require("./config/db");

var cookieParser = require('cookie-parser');

app.use(cookieParser())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/",require("./routes/index"));

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log("Server is Running on Port : ", port);
})