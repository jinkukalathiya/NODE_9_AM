const express = require('express');

const route = express.Router();

console.log("Routing....");

const Student = require('../models/StudentModal');

const stdCtl = require('../controllers/studentController')

route.get("/",stdCtl.getDetails);

route.post("/addStudentData", stdCtl.addStudentData);

route.delete("/deleteStudent/:id", stdCtl.deleteStudent);

route.put("/updateStudent/:id", stdCtl.updateStudent);

module.exports = route;