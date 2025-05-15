const express = require('express');
const port = 9000;
const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded());
let studentData = [
    {
        userId : 1,
        name : 'Jinkal Kalathiya',
        email : 'jinkal@gmail.com',
        password : 'jinkal@123',
        phone : '7894561230'
    },
    {
        userId : 2,
        name : 'Vrushank Gotawala',
        email : 'vrushank@gmail.com',
        password : 'vrushank@123',
        phone : '9874561203'
    },
    {
        userId : 3,
        name : 'Yash lad',
        email : 'yash@gmail.com',
        password : 'yash@123',
        phone : '7485912630'
    },
    {
        userId : 4,
        name : 'Saloni Mudrakh',
        email : 'saloni@gmail.com',
        password : 'saloni@123',
        phone : '7485758491'
    },
    {
        userId : 5,
        name : 'Poorab Jate',
        email : 'poorab@gmail.com',
        password : 'poorab@123',
        phone : '8471523609'
    },
    {
        userId : 6,
        name : 'Vansh Sukhiyaji',
        email : 'vansh@gmail.com',
        password : 'vansh@123',
        phone : '9584762130'
    }
]
app.post('/insertData', (req, res) => {
    console.log(req.body.updateId);
    let updateId = req.body.updateId;
    // console.log(req.body);
        let userId = req.body.userId;
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let phone = req.body.phone;
    if (updateId && updateId.trim() !== "") {
        console.log("update");
        let result = studentData.filter((item) => {
            if(item.userId == updateId){
                item.name = name;
                item.email = email;
                item.password = password;
                item.phone = phone;
            }
            return item;
        })
        studentData = result;
        console.log("Record Updated...");
        return res.redirect('/');
    }else{        
        let obj = {
            userId : userId,
            name : name,
            email : email,
            password : password,
            phone : phone
        }
        studentData.push(obj)
        console.log("Student Data Add Successfully");
        return res.redirect('/');
    }
    
});

app.get('/', (req, res) => {
    console.log(studentData)
    return res.render('form', {
        student : studentData,
    });
});

app.get('/deleteData', (req, res) => {
    let userId = req.query.userId;
    let data = studentData.filter((item) => {
        return item.userId != userId;
    })
    studentData = data;
    console.log("Student data Deleted Successfully..");
    return res.redirect('/');
})

app.get('/updateData', (req, res) => {
    let userId = req.query.userId;
    let data = studentData.filter((item) => {
        return item.userId == userId;
    })
    return res.render('update', {
        student: data[0]
    });
});

app.post('/updateData', (req, res) => {
    console.log(req.body);
    let updateId = req.body.updateId;
    let result = studentData.filter((curElem) => {
        if(curElem.userId == updateId){
            console.log(curElem);
            curElem.name = req.body.name;
            curElem.email = req.body.email;
            curElem.password = req.body.password;
            curElem.phone = req.body.phone;
        }
        return curElem
    });
    console.log(result);
    studentData = result;
    console.log("Record Updated...");
    return res.redirect('/');    
})


app.listen(port,(err) => {
    if(err){
        console.log("Server not start");
    }
    console.log("Server start on port : " +port);
})