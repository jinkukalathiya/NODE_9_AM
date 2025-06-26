const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Admin = require('../models/Admin');

passport.use('local',new LocalStrategy({
    usernameField : 'email'
}, async function(email, password, done) {
    let adminRecord = await Admin.findOne({
        email : email
    });
    if(adminRecord){
        if(password == adminRecord.password){
            return done(null, adminRecord);
        }
    }
    else{
        return done(null, false);
    }
}));

passport.serializeUser(function(user, done){
    return done(null,user.id);
});

passport.deserializeUser(async function(id,done){
    let adminData = await Admin.findById(id);
    if(adminData){
        return done(null, adminData);
    }
    else{
        return done(null, false);
    }
})

passport.checkAuthentication = function(req, res, next){
    console.log("Testing:"+req.isAuthenticated());
    
    if(req.isAuthenticated()){
        return next();
    }
    else{
        return res.redirect('/');
    }
}

passport.setAuthenticationUser = function(req, res, next) {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;