const mongoose = require("mongoose");

const multer = require('multer');

const path = require('path');

const fs = require('fs');

const { type } = require("os");

const imagePath = "uploads/managerImages";

const ManagerSchema = mongoose.Schema ({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    manager_image : {
        type : String,
        required : true
    },
    created_date: {
        type : String,
        required : true
    },
    updated_date: {
        type : String,
        required : true
    }
})

const imgStorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, path.join(__dirname,'..',imagePath));
    },
    filename : (req, file,cb) => {
        cb(null,file.fieldname+"-"+Date.now());
    }
})

ManagerSchema.statics.uploadImage = multer({
    storage: imgStorage
}).single('manager_image');

ManagerSchema.statics.managerImagePath = imagePath;

const Manager = mongoose.model('Manager',ManagerSchema);

module.exports = Manager;