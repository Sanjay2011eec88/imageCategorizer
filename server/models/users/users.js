var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
   email: {
       type:String,
       unique: true,
       lowercase: true
   },
   password : {
       type:String,
       required: true
   },
   profile: {
       firstName: {
           type: String,
           default: ''
       },
       lastName: {
           type: String,
           default: ''
       },
       picture: {
           type: String,
           default:''
       }
   },
   address: String
});

//Before saving password first we check if it is modified or not,
// if it is not modified than we bucrypt the password before savig it to db
UserSchema.pre('save',function (next) {
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err,salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        })
    })
});

//Compare the passwrord in the database and the password received in from the server
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.gravatar = function(size) {
    if (!this.size) size = 200;
    if (!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
  }
  
module.exports = mongoose.model('User', UserSchema);