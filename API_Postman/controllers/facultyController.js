const Faculty = require('../models/FacultyModal');

const bcrypt = require("bcrypt");

const moment = require("moment");

const path = require('path');

const fs = require('fs');


module.exports.addFacultyData = async (req, res) => {
    try{
        console.log(req.body);
        console.log(req.file);
        var image = '';
        if(req.file){
            image = Faculty.facultyImagePath+"/"+req.file.filename;
        }
        req.body.image = image;
        req.body.name = req.body.fname+" "+req.body.lname;
        req.body.password = await bcrypt.hash(req.body.password,10);
        req.body.created_date = moment().format('DD/MM/YYYY, h:mm:ss A');
        req.body.updated_date = moment().format('DD/MM/YYYY, h:mm:ss A');
        let facultyDetails = await Faculty.create(req.body);
        if(facultyDetails){
            return res.status(200).json({"msg": "Faculty Record Inserted Successfully...."});
        }
        else{
            return res.status(400).json({"msg": "Failed to Insert Record.."});
        }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong.."});
    }
}

module.exports.viewFaculty = async(req, res) => {
    try{
        console.log(req.body);
        let allFaculties = await Faculty.find({});
        if(allFaculties){
            return res.status(200).json({"msg": "Response Received..", 
                allDetails : allFaculties           
            });
        }
        else{
            return res.status(200).json({"msg": "No Record Found.."});
        }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong.."});
    }
}

module.exports.deleteFaculty = async (req, res) => {
    try{
        console.log(req.params.id);

        let singleFaculty = await Faculty.findById(req.params.id);
        if(singleFaculty){
            try{
                let imgPath = path.join(__dirname,'..',singleFaculty.image);
                try{
                    await fs.unlinkSync(imgPath);
                }
                catch(err){
                    return res.status(400).json({"msg": "Something Wrong.."});
                }
                let delFaculty = await Faculty.findByIdAndDelete(req.params.id);
                if(delFaculty){
                    return res.status(200).json({"msg": "Faculty Record Deleted Successfully...."});
                }
                else{
                    return res.status(400).json({"msg": "Record Not Deleted.."});
                }                

            }catch(err){
                return res.status(400).json({"msg": "Something Wrong.."});
            }
        }
        else{
            return res.status(400).json({"msg": "Record Not Found.."});
        }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong.."});
    }
}

module.exports.updateFaculty = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log the body
        console.log("Uploaded File:", req.file); // Log the uploaded file

        let oldFaculty = await Faculty.findById(req.params.id);
        if (oldFaculty) {
            let image = '';
            if (req.file) {
                try {
                    let oldImagePath = path.join(__dirname, '..', oldFaculty.image);
                    await fs.unlinkSync(oldImagePath);
                } catch (err) {
                    console.log("Image not Found...");
                }
                image = Faculty.facultyImagePath + '/' + req.file.filename;
                req.body.image = image;
            } else {
                req.body.image = oldFaculty.image;
            }

            req.body.name = req.body.fname + " " + req.body.lname;
            req.body.password = await bcrypt.hash(req.body.password, 10);
            req.body.created_date = oldFaculty.created_date;
            req.body.updated_date = moment().format('DD/MM/YYYY, h:mm:ss A');

            let updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedFaculty) {
                return res.status(200).json({ "msg": "Faculty Record Updated Successfully." });
            } else {
                return res.status(400).json({ "msg": "Faculty Record Not Updated." });
            }
        } else {
            return res.status(400).json({ "msg": "Faculty Record Not Found." });
        }
    } catch (err) {
        console.error("Error:", err);
        return res.status(400).json({ "msg": "Something went wrong." });
    }
};



module.exports.updateFaculty = async (req, res) => {
    try{
        console.log(req.params.id);
        let oldFaculty = await Faculty.findById(req.params.id);
        if(oldFaculty){
            var image = '';
            if(req.file){
                try{
                    let oldImagePath = path.join(__dirname,'..',oldFaculty.image);
                    await fs.unlinkSync(oldImagePath);
                }catch(err){
                    console.log("Image not Found...");
                }
                image = Faculty.facultyImagePath+'/'+req.file.filename;
                req.body.image = image;
            }
            else{
                req.body.image = oldFaculty.image;
            }
            req.body.name = req.body.fname+" "+req.body.lname;
            req.body.password = await bcrypt.hash(req.body.password,10);
            req.body.created_date = oldFaculty.created_date;
            req.body.updated_date = moment().format('DD/MM/YYYY, h:mm:ss A');
            let updaFaculty = await Faculty.findByIdAndUpdate(req.params.id, req.body);
            if(updaFaculty){
                return res.status(200).json({"msg": "Faculty Record Updated Successfully......"});
            }
            else{
                return res.status(400).json({"msg": "Faculty Record Not Updated.."});
            }
        }
        else{
            return res.status(400).json({"msg": "Faculty Record Not Found.."});
        }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong.."});
    }
}