const express = require('express');
const port = 8000;
const app = express();
app.set('view engine','ejs');

app.get('/', (req, res) => {
    return res.render('index');
});
app.get('/about', (req, res) => {
    return res.render('about');
});
app.get('/service', (req, res) => {
    return res.render('service');
});
app.get('/contact', (req, res) => {
    return res.render('contact');
});
app.listen(port,(err) => {
    if(err){
        console.log("Server not start");
    }
    console.log("Server start");
})
