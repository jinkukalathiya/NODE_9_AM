const express = require('express');

const port = 9000;

const app = express();

const db = require('./config/database');

const adminTbl = require('./models/adminTbl');

const path = require('path');

const fs = require('fs');

const multer = require('multer');

app.set('view engine', 'ejs');

app.use(express.urlencoded());

app.use('/uploads', express.static(path.join(__dirname,'uploads')));

const fileUpload = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null, 'uploads/');
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const imageUpload = multer ({
    storage : fileUpload,
}).single('image');

app.get('/',(req,res) => {
    adminTbl.find({}).then((allData) => {
        // console.log(allData);
        return res.render('form', {
            record: allData
        });
    })
})
app.post('/insertData',imageUpload, (req,res) => {
    let updateId = req.body.updateId;
    const {name, email, password, gender, hobby, city, phone, image} = req.body;
    console.log(req.body);
    if(updateId) {
        // console.log(req.file);
        // let images = "";
        if(req.file){
            adminTbl.findById(updateId).then((oldImage) => {
                fs.unlinkSync(oldImage.image);
                let image = req.file.path;
                console.log("New Image");
                adminTbl.findByIdAndUpdate(updateId, {
                    name: name,
                    email: email,
                    password: password,
                    gender: gender,
                    hobby: hobby,
                    city: city,
                    phone: phone,
                    image: image
                }).then((success) => {
                    console.log("Record Updated Successfully...");
                    return res.redirect('/');
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
            }).catch((err) => {
                console.log(err);
                return false;
            })
            
        }
        else{
            console.log("Ool Image");
        }
        
    }
    else{
        adminTbl.create({
            name: name,
            email: email,
            password: password,
            gender: gender,
            hobby: hobby,
            city: city,
            phone: phone,
            image: images
        }).then((data) => {
            console.log("Record Added Successfully");
        }).catch((err) => {
            console.log(err);
            return false;
        })
    }
})
app.get('/deleteData/:id',(req,res) => {
    // console.log(req.id);
    let id = req.params.id;
    console.log(id);

    adminTbl.findById(id).then((singleRecord) => {
        fs.unlinkSync(singleRecord.image);
    })

    adminTbl.findByIdAndDelete(id).
        then((data) => {
            console.log("Record Delete Successfully..");
            return res.redirect('/');
        }).catch((err) => {
            console.log("Record Not Deleted..");
            return false;
        })
})
app.get('/updateData',(req, res) => {
    
    // return res.render('update');
    let id = req.query.id;
    console.log(id);
    adminTbl.findById(id).then((single) => {
        console.log(single);
        return res.render('update', { single });
    }).catch((err) => {
        console.log(err);
        return false;
    })
})
// app.post('/updateData', (req,res) => {
//     let id = req.body.updateId;
//     adminTbl.findByIdAndUpdate(id,{
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         gender: req.body.gender,
//         hobby: req.body.hobby,
//         city: req.body.city,
//         phone: req.body.phone,
//     }).then((succes) => {
//         console.log("Record Updated Successfully...");
//         return res.redirect('/');
//     }).catch((err) => {
//         console.log(err);
//         return false;
//     })
// })
app.listen(port,(err) => {
    if(err){
        console.log("Server not start");
        return res.render('form');
        // return false;
    }
    console.log("Server start on port : " +port);
})