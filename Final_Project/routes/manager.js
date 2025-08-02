const express = require('express');

const route = express.Router();

console.log("Manager Routing....");

const authManager = require('../config/authManager');

const managerCtl = require('../controllers/managerController');

route.post("/loginManager",managerCtl.managerLogin);

route.get("/changePassword",authManager.authManager,managerCtl.managerChangePassword);

module.exports = route;