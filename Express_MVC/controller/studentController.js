const Student = require('../models/studentModel');

module.exports.studentdetail = async (req,res) => {
    try{
        let allStudentData = await Student.find({});
        return res.render('student_detail',{
            allStudentData
        });
    }catch(err){
        console.log(err);
        return res.render('404');
    }
}

module.exports.addStudentData = async (req,res) => {
    try{
        let studentData = await Student.create(req.body);
        if(studentData){
            return res.redirect('/student');
        }
        else{
            console.log("Something Wrong....");
            return res.redirect('/student');
        }
    }catch(err){
        console.log(err);
        return res.render('404');
    }    
}

module.exports.deleteStudentData = async (req, res) => {
    try{
        const studentId = req.query.stdId;
        let delStd = await Student.findByIdAndDelete(studentId);
        try{
            if(delStd){
                console.log("Student Deleted Successfully...");
                return res.redirect('/student');
            }
            else{
                console.log("Something Wrong....");
                return res.redirect('/student');
            }
        }catch(err){
            console.log('Student Record Not Find..');
            return res.render('404');
        }
        
    }catch(err){
        console.log(err);
        return res.render('404');
    }
}

module.exports.updateStudentData = async (req, res) => {
    // console.log(req.params);
    try{
        let sId = req.params.studentId;
        let singleData = await Student.findById(sId);
        if(singleData){ 
            return res.render('updateStudent',{
                singleData
            })
        }
        else{
            console.log("Something Wrong....");
            return res.redirect('/student');
        }
    }catch(err){
        console.log(err);
        return res.render('404');
    }
}

module.exports.EditStudentData = async (req, res) => {
    try{
        // console.log(req.params.studentId);
        // console.log(req.body);
        let upData = await Student.findByIdAndUpdate(req.params.studentId,req.body);
        if(upData){
            console.log("Student Updated Successfully...");
            return res.redirect('/student');
        }
        else{
            console.log("Something Wrong....");
            return res.redirect('/student');
        }
    }catch(err){
        console.log(err);
        return res.render('404');
    }    
}