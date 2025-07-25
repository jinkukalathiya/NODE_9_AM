const express = require('express');

const route = express.Router();

console.log("Routing....");

const jwt = require('jsonwebtoken');

const Faculty = require('../models/FacultyModal');

const facCtl = require('../controllers/facultyController');

const authUser = require('../config/authUser');

route.get("/viewFaculty",authUser.authUser,facCtl.viewFaculty);

route.post("/addFacultyData",authUser.authUser, Faculty.uploadImage,facCtl.addFacultyData);

route.delete("/deleteFaculty/:id",authUser.authUser, facCtl.deleteFaculty);

route.put("/updateFaculty/:id",authUser.authUser, Faculty.uploadImage, facCtl.updateFaculty);

module.exports = route;