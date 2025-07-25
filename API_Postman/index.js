const express = require('express');

const port = 8002;

const app = express();

const db = require('./config/db');

app.use(express.urlencoded());

app.use("/",require("./routes/studentRoutes"));

app.use("/faculty",require("./routes/facultyRoutes"));

app.use("/user",require("./routes/userRoutes"));

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log("Server is Running on Port : ", port);
})