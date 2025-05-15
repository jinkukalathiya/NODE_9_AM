const express = require('express');
const port = 9000;
const app = express();
const path = require('path');
app.set('view engine', 'ejs');

app.use('/',express.static(path.join(__dirname,'/public')));
// const check = (req, res, next) => {
//     console.log(req.query.age);
//     if(req.query.age >= 18){
//         return next();
//     }
//     else{
//         return res.render('index');
//     }
// }
app.get('/',(req,res) => {
    return res.render('index');
})
app.get('/contact',(req,res) => {
    return res.render('contact');
})
// app.get('/', check, (req, res) => {
//     return res.render('index');
// })
// app.get('/home', check, (req, res) => {
//     return res.render('home');
// })
// app.get('/about', check, (req, res) => {
//     return res.render('about');
// })
// app.get('/contact', check, (req, res) => {
//     return res.render('contact');
// })
// app.use(check);

app.listen(port,(err) => {
    if(err){
        console.log("Server is Not Start");
        return false;
    }
    console.log("Server is Start on Port : " +port);
})