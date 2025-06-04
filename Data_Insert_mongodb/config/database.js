const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/crud");


const db = mongoose.connection;

db.on('connected',(err) => {
    if(err){
        console.log("Database is not Connected");
        return false;
    }
    console.log("Database is Connected..");
})
module.exports = db;