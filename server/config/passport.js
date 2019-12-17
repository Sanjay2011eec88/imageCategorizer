var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users/users');

//Serialize and desearalize

passport.serializeUser(function (user, done) {
   done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
});

//Middleware
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    User.findOne({email: email}, function (err, user) {
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false);
        }
        if(!user.comparePassword(password)){
            return done(null, false);
        }
        return done(null, user);
    })
}));
