const Admin = require('../models/AdminModel');

const Manager = require('../models/ManagerModel');

const path = require('path');

const fs = require('fs');

const bcrypt = require('bcrypt');

const moment = require("moment");

const jwt = require('jsonwebtoken');

module.exports.adminRegister = async (req, res) => {
    try{
        let existEmail = await Admin.findOne({ email : req.body.email });
        if(!existEmail){
            var image = '';
            if(req.file){
                image = Admin.adminImagePath+"/"+req.file.filename;
            }
            req.body.admin_image = image;
            req.body.password = await bcrypt.hash(req.body.password,10);
            req.body.created_date = moment().format('DD/MM/YYYY, h:mm:ss A');
            req.body.updated_date = moment().format('DD/MM/YYYY, h:mm:ss A');
            let adminDetails = await Admin.create(req.body);
            console.log(adminDetails);
            if(adminDetails){
                return res.status(200).json({"msg": "Admin Register Successfully...."});
            }
            else{
                return res.status(400).json({"msg": "Failed to Admin Register.."});
            }
        }
        else{
            return res.status(400).json({"msg": "Email Id is Already Exist...."});
        }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong.."});
    }
}

module.exports.adminLogin = async (req, res) => {
    try{
        let existEmail = await Admin.findOne({ email : req.body.email });
        if(existEmail){
            if(await bcrypt.compare(req.body.password, existEmail.password)){
                let token = jwt.sign({adminData : existEmail},'Admin',{expiresIn : '1h'});
                return res.status(200).json({msg: "Login Successfully...",token : token});
            }
            else{
                return res.status(400).json({"msg": "Invalid Password..."});
            }
        }
        else{
            return res.status(400).json({"msg": "Invalid Email ID..."});
        }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong..."});
    }
}

module.exports.managerRegister = async (req, res) => {
    try{
        let existEmail = await Manager.findOne({ email : req.body.email });
        if(!existEmail){
            var image = '';
            if(req.file){
                image = Manager.managerImagePath+"/"+req.file.filename;
            }
            req.body.manager_image = image;
            req.body.password = await bcrypt.hash(req.body.password,10);
            req.body.created_date = moment().format('DD/MM/YYYY, h:mm:ss A');
            req.body.updated_date = moment().format('DD/MM/YYYY, h:mm:ss A');
            let managerDetails = await Manager.create(req.body);
            console.log(managerDetails);
            if(managerDetails){
                return res.status(200).json({"msg": "Manager Register Successfully...."});
            }
            else{
                return res.status(400).json({"msg": "Failed to Registered Manager.."});
            }
        }
        else{
            return res.status(400).json({"msg": "Manager Email Id is Already Exist...."});
        }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong.."});
    }
}