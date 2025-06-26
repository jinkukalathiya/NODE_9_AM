const express = require('express');

const port = 8000;

const app = express();

const path = require('path');

const db = require('./config/database');

const session = require('express-session'); 

const flash = require('connect-flash');

const flashConnect = require('./config/connectFlash');

const passport = require('passport');

const localst = require('./config/passport-local-strategy');

const cookieparser = require('cookie-parser');

// const { url } = require('inspector');

app.set("view engine", 'ejs');

app.set('views',path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,'assets')));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(cookieparser());

app.use(express.urlencoded());

app.use(session({
    name: "testing",
    secret: "nodeBatch",
    resave: true,
    saveUninitialized : false,
    cookie : {
        maxAge : 100*100*10000
    }
}))

app.use(passport.session());

app.use(passport.initialize());

app.use(passport.setAuthenticationUser);

app.use(flash());

app.use(flashConnect.setFlash);

app.use("/", require('./routes/'));

app.listen(port,(err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log(`Server is Running on Port : ${port}`);
})