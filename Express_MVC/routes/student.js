const express = require('express');

const routes = express.Router();

const studCon = require('../controller/studentController');

routes.get('/', studCon.studentdetail);

routes.post('/addStudent', studCon.addStudentData);

routes.get('/deleteData', studCon.deleteStudentData);

routes.get('/updateData/:studentId', studCon.updateStudentData);

routes.post('/EditStudent/:studentId', studCon.EditStudentData);


module.exports = routes;