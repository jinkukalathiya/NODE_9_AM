const express = require('express');

const route = express.Router();

console.log("Routing");

const UserCtl = require('../controllers/userController');

route.get("/", UserCtl.userpage);

module.exports = route;
