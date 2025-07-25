const express = require('express');

const route = express.Router();

const CategoryCtl = require('../controllers/categoryController');

const Category = require('../models/Category');

route.get("/add_category", CategoryCtl.addCategory);

route.post("/insertCategoryData", Category.uploadCategoryImage, CategoryCtl.insertCategory);

route.get("/view_category", CategoryCtl.viewCategory);

route.get("/delete_category/:caId", CategoryCtl.deleteCategory);

module.exports = route;