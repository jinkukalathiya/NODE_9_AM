const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cruOp');

const db = mongoose.connection;

db.once('open',(err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log("Detabase Connected..")
})

module.exports = db;