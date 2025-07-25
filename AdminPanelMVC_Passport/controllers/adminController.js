
const Admin = require('../models/Admin');

const path = require('path');

module.exports.loginpage = (req, res) => {
    try{
        if(req.isAuthenticated()){
            req.flash('success',"Login Successfully....");
            return res.redirect('/dashboard');
        }
        else{
            return res.render('login');
        }
    }catch(err){
        console.log(err);
        
    }
};

module.exports.checkLogin = async (req, res) => {
    try {
        req.flash('success',"Login Successfully....");
        return res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        return res.render('login');
    }   
};

module.exports.changePassword = async (req,res) => {
    try{
        if(req.user == undefined){
            return res.redirect('/');
        }
        let adminId = req.user._id;
        let adminData = await Admin.findById(adminId);
        if(adminData){
            let adminRecord = req.user;
            return res.render('change_password', {
                adminRecord 
            });
        }

    }catch(err){
        console.log(err);
        return res.render('login');
    }
}

module.exports.checkChangePassword = async (req,res) => {
    try{
        let oldPass = req.user.password;
        let adminId = req.user._id;
        console.log(req.body);    
        if(oldPass == req.body.oldPassword){
            if(req.body.oldPassword != req.body.newPassword){
                if(req.body.newPassword == req.body.confirmPassword){
                    let adminData = await Admin.findByIdAndUpdate(adminId,
                        {
                            password : req.body.newPassword
                        }
                    );
                    if(adminData){
                        return res.redirect('/logout');
                    }
                }
            }
        }
        else{
            console.log("Old Password not Macth..");
            return res.redirect('/changePassword')    
        }

    }catch(err){
        console.log(err);
        return res.render('login');
    }
}

module.exports.logout = async (req,res) => {
    try{
        req.session.destroy(function(err) {
            if(err){
                console.log(err);
                return false;
            }
            return res.redirect('/');
        })          
    }catch(err){
        console.log(err);
        return res.redirect('/');
    }
}

module.exports.adminpage = async (req, res) => {
    try{
        return res.render('dashboard');
    }catch(err){
        console.log(err);        
        return res.redirect('/'); 
    }
};

module.exports.add_admin = async (req, res) => {
    try{
        if(req.user == undefined){
            return res.render('login');
        }
        else{
            let adminId = req.user._id;
            let adminData = await Admin.findById(adminId);
            if(adminData){
                return res.render('add_admin', {
                    adminRecord: adminData
                });
            }
            else{
                return res.redirect('/');
            }
        }
    }catch(err){
        console.log(err);
        return res.render('login');
    }
};

module.exports.deleteAdmin = async (req, res) => {
    try {
        let adminId = req.params.adId;
        let adminData = await Admin.findById(adminId);
        
        if (adminData) {
            if (adminData.avtar) {
                let imgPath = path.join(__dirname, "..", adminData.avtar);
                try {
                    await fs.unlinkSync(imgPath);
                    console.log("Avatar file deleted successfully");
                } catch (err) {
                    console.log("Error while deleting avatar:", err);
                }
            }
            
            let deleteAdminData = await Admin.findByIdAndDelete(adminId);
            
            if (deleteAdminData) {
                console.log("Admin Record Deleted Successfully");
                req.flash('success',"Admin Record Deleted Successfully....");
                return res.redirect('/view_admin');
            } else {
                console.log("Error While Deleting Admin Record...");
                req.flash('success',"Error While Deleting Admin Record....");
                return res.redirect('/view_admin');
            }
        } else {
            console.log("Admin Record Not Found");
            return res.redirect('/view_admin');
        }

    } catch (err) {
        console.log(err);
        return res.redirect('/view_admin');
    }
}

module.exports.update_admin = async (req, res) => {
    try{
        let adminId = req.query.adminId;
        let oldAdminData = await Admin.findById(adminId);
        if(oldAdminData){
            return res.render('update_admin', {
                oldAdminData
            });
        }
        else{
            console.log("Record not Found...");
            return res.redirect('/view_admin')
        }

    }catch(err){
        console.log(err);
    }
}

module.exports.view_admin = async (req, res) => {
    try{
        let adminRecord = await Admin.find({});
        // console.log(adminRecord);
        if(adminRecord){
            return res.render('view_admin', {
                adminRecord
            });
        }else{
            return res.render('view_admin');
        } 
    }catch(err){
        console.log(err);        
    }    
};

module.exports.insertAdminData = async (req, res) => {
    try{
        // console.log(req.body);
        // console.log(req.file);

        req.body.name = req.body.fname+" "+req.body.lname;

        req.body.avtar = '';
        
        if(req.file){
            req.body.avtar = Admin.adPath+"/"+req.file.filename;
        }
        
        let adminRecord = await Admin.create(req.body);

        if(adminRecord){
            console.log("Admin Record Inserted");
            req.flash('success',"Admin Record Inserted Successfully....");
            return res.redirect('/add_admin');
        }
        else{
            console.log("Error in Inserting Admin Record..");
            req.flash('error',"Error in Inserting Admin Record....");
            return res.redirect('/add_admin');
        }
    }catch(err){
        console.log(err);
        
    }
}