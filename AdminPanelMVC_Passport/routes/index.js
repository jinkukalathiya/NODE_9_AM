const express = require('express');

const route = express.Router();

console.log("Routing");

const AdminCtl = require('../controllers/adminController');

const Admin = require('../models/Admin');

const passport = require('passport');

route.get("/",AdminCtl.loginpage);

// route.post("/checkLogin",passport.authenticate('local',{failureRedirect : '/'}),AdminCtl.checkLogin);

route.post("/checkLogin", passport.authenticate('local', { failureRedirect: '/' }), AdminCtl.checkLogin);

route.get("/changePassword",AdminCtl.changePassword);

route.post("/checkChangePassword",AdminCtl.checkChangePassword);

route.get("/logout",passport.checkAuthentication,AdminCtl.logout);

route.get("/dashboard",passport.checkAuthentication,AdminCtl.adminpage);

route.get("/add_admin",passport.checkAuthentication,AdminCtl.add_admin);

route.get("/view_admin",passport.checkAuthentication,AdminCtl.view_admin);

route.get("/deleteAdmin/:adId",passport.checkAuthentication, AdminCtl.deleteAdmin);

route.get("/update_admin",passport.checkAuthentication,AdminCtl.update_admin);

route.post("/insertAdminData",Admin.uploadAdminImage,AdminCtl.insertAdminData);

module.exports = route;
