const mongoose = require("mongoose");

const multer = require('multer');

const path = require('path');

const fs = require('fs');
const { type } = require("os");

const imagePath = "uploads/adminImages";

const AdminSchema = mongoose.Schema ({
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
    admin_image : {
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

AdminSchema.statics.uploadImage = multer({
    storage: imgStorage
}).single('admin_image');

AdminSchema.statics.adminImagePath = imagePath;

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin;