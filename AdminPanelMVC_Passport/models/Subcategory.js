const mongoose = require('mongoose');

const Category = require('../models/Category');

const SubcategorySchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required : true
    },
    subcategoryname : {
        type : String,
        required : true
    }
})

const SubCategory = mongoose.model('Subcategory',SubcategorySchema);

module.exports = SubCategory;