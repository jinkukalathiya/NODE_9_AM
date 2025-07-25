const mongoose = require("mongoose");

const multer = require('multer');

const path = require('path');

const fs = require('fs');

const imagePath = "uploads/faculties";

const FacultySchema = mongoose.Schema ({
    name : {
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
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    image : {
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

FacultySchema.statics.uploadImage = multer({
    storage: imgStorage
}).single('image');

FacultySchema.statics.facultyImagePath = imagePath;

const Faculty = mongoose.model('Faculty',FacultySchema);

module.exports = Faculty;