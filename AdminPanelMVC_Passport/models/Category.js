const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const categoryImagePath = '/uploads/categoryImages';

const categoryStorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, path.join(__dirname,'..',categoryImagePath));
    },
    filename : (req, file,cb) => {
        cb(null,file.fieldname+"-"+Date.now());
    }
})

const CategorySchema = mongoose.Schema({
    cname : {
        type : String,
        required : true
    },
    cimage : {
        type : String,
        required : true
    }
})

CategorySchema.statics.uploadCategoryImage = multer({
    storage: categoryStorage
}).single('cimage');

CategorySchema.statics.caPath = categoryImagePath;

const Category = mongoose.model('Category',CategorySchema);

module.exports = Category;