const express = require('express');

const route = express.Router();

const SubCategoryCtl = require('../controllers/subCategoryController');

const Category = require('../models/Category');

route.get("/add_subcategory", SubCategoryCtl.addSubCategory);

route.post("/insertSubCategoryData", SubCategoryCtl.insertSubCategory);

route.get("/view_subcategory", SubCategoryCtl.viewSubCategory);

// route.get("/delete_category/:caId", CategoryCtl.deleteCategory);

module.exports = route;