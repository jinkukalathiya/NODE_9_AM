const Manager = require('../models/ManagerModel');

const path = require('path');

const fs = require('fs');

const bcrypt = require('bcrypt');

const moment = require("moment");

const jwt = require('jsonwebtoken');

module.exports.managerLogin = async (req, res) => {
    try{
        let existEmail = await Manager.findOne({ email : req.body.email });
        if(existEmail){
            if(await bcrypt.compare(req.body.password, existEmail.password)){       
                
                let token = jwt.sign({managerData : existEmail},'Manager',{expiresIn : '1h'});
                return res.status(200).json({msg: "Login Successfully...","Token": token});
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

module.exports.managerChangePassword = async (req, res) => {
    try{
        // let token = jwt.sign({managerData : existEmail},'Manager',{expiresIn : '1h'});

        console.log("Change Password...")
        // let existEmail = await Manager.findOne({ email : req.body.email });
        // if(existEmail){
        //     if(await bcrypt.compare(req.body.password, existEmail.password)){                
        //         return res.status(200).json({msg: "Login Successfully..."});
        //     }
        //     else{
        //         return res.status(400).json({"msg": "Invalid Password..."});
        //     }
        // }
        // else{
        //     return res.status(400).json({"msg": "Invalid Email ID..."});
        // }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong..."});
    }
}

//  