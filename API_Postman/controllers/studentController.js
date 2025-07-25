const Student = require('../models/StudentModal');

module.exports.getDetails = async(req, res) => {
    try{
        console.log(req.body);
        let studentDetails = await Student.find({});
        if(studentDetails){
            return res.status(200).json({"msg": "Response Received..",      allDetails : studentDetails
            });
        }
        else{
            return res.status(200).json({"msg": "No Record Found.."});
        }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong.."});
    }
}

module.exports.addStudentData = async (req, res) => {
    try{
        console.log(req.body);
        let studentDetails = await Student.create(req.body);
        if(studentDetails){
            return res.status(200).json({"msg": "Student Record Inserted Successfully...."});
        }
        else{
            return res.status(400).json({"msg": "Failed to Insert Record.."});
        }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong.."});
    }
}

module.exports.deleteStudent = async (req, res) => {
    try{
        console.log(req.params.id);
        let delStudent = await Student.findByIdAndDelete(req.params.id);
        if(delStudent){
            return res.status(200).json({"msg": "Student Record Deleted Successfully...."});
        }
        else{
            return res.status(400).json({"msg": "Record Not Found.."});
        }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong.."});
    }
}

module.exports.updateStudent = async (req, res) => {
    try{
        console.log(req.params.id);
        console.log(req.body);
        let upStudent = await Student.findByIdAndUpdate(req.params.id, req.body);
        if(upStudent){
            return res.status(200).json({"msg": "Student Record Updated Successfully...."});
        }
        else{
            return res.status(400).json({"msg": "Record Not Updated.."});
        }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong.."});
    }
}