const express = require('express');

const route = express.Router();

console.log("Main Routing....");

route.use(express.urlencoded({ extended: true }));

route.use("/admin",require("../routes/admin"));

route.use("/manager",require("../routes/manager"));

module.exports = route;
