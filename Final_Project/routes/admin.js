const express = require('express');

const multer = require('multer');

const route = express.Router();

console.log("Admin Routing....");

const authAdmin = require('../config/authAdmin')

const Admin = require('../models/AdminModel');

const Manager = require('../models/ManagerModel');

const nodemailer = require("nodemailer");

var cookieParser = require('cookie-parser');

route.use(cookieParser());

const adminCtl = require('../controllers/adminController');

route.post("/registerAdmin", Admin.uploadImage, adminCtl.adminRegister);

route.post("/loginAdmin", authAdmin.authAdmin ,adminCtl.adminLogin);

route.post("/checkEmail", async (req,res) => {
    try{
        console.log(req.body);
        let emailExist = await Admin.findOne({email: req.body.email});
        if(emailExist){
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "rnw1webjinkal@gmail.com",
                    pass: "cjryfqvinjffwdss",
                },
            });
            const otp = Math.round(Math.random()*10000);
            // const otp = Math.floor(1000 + Math.random() * 9000);
            console.log(otp);
            res.cookie("otp", otp);
            res.cookie("email",req.body.email);
            const info = await transporter.sendMail({
                from: 'rnw1webjinkal@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Send OTP", // Subject line
                text: "Your OTP is Here...", // plain text body
                html: `Your OTP is : ${otp}`, // html body
            });
            if(info){
                return res.status(200).json({"msg" : "OTP Send Successfully", otp: otp});
            }
            else{
                return res.status(400).json({"msg": "Failed to send OTP..."});
            }
        }
        else{
            return res.status(400).json({"msg": "Email is not Exist..."});
        }
    }
    catch(err){
        return res.status(400).json({"msg": "Something Wrong..."});
    }
});

route.post("/checkOTP", (req, res) => {
    try{
        console.log(req.body);
        let otp = req.headers.cookie;
        let checkPostOtp = otp.slice(20,otp.length);
        if(req.body.otp == checkPostOtp){
            return res.status(200).json({"msg": "Otp Match SuccesFully..."});
        }
        else{
            return res.status(400).json({"msg": "Otp Not Match..."});
        }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong..."});
    }

});

route.post("/registerManager", Manager.uploadImage ,adminCtl.managerRegister);

module.exports = route;