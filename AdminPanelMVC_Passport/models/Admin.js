const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imagePath = '/uploads/adminImages';

const adminStorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, path.join(__dirname,'..',imagePath));
    },
    filename : (req, file,cb) => {
        cb(null,file.fieldname+"-"+Date.now());
    }
})

const AdminSchema = mongoose.Schema({
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
        type : String,
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
    description : {
        type : String,
        required : true
    },
    avtar : {
        type : String,
        required : true
    }
})

AdminSchema.statics.uploadAdminImage = multer({
    storage: adminStorage
}).single('avtar');

AdminSchema.statics.adPath = imagePath;


const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin;