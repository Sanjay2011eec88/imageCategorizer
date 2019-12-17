var User = require('../models/users/users');
var async = require('async');
const imageCategorizer = require('./imageTaggingService');
var UserService = module.exports = {};

UserService.signUp = function createUser(req, callback) {
    var user = new User();
    user.profile.firstName = req.firstName;
    user.profile.lastName = req.lastName;
    user.password = req.password;
    user.email = req.username;
    User.findOne({ email: req.email }, function(err, existingUser) {
        if (existingUser) {
            console.log("Account with that email address already exists");
            callback({status:409,msg:"Account with that email address already exists"},null);
        } else {
            user.save(function(err, user) {
                if (err) {
                    callback(err,null);
                }else {
                    imageCategorizer.categorizeImage(user);
                    callback(null, user);
                }
            });
        }
    });

};

UserService.getUser = function getUser(user, callback) {
    var userProfile = {};
    userProfile.firstName = user.profile.firstName;
    userProfile.lastName = user.profile.lastName;
    userProfile.email = user.email;
    callback(null, userProfile);
};