var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var routes = require('./routes/routes');
var config = require('./config/config');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('express-flash');

var app = express();


//Connecting database
mongoose.connect(config.database, function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Database connected");
    }
});
// view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    resave:true,
    saveUnitialized: true,
    secret: config.secretKey,
    store: new MongoStore({url: config.database, autoReconnect: true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client/public')));
var routerV1 = express.Router();
routes.setRoutes(routerV1);
app.use(routerV1);

app.use('/*', function (req, res, next) {
  res.sendFile(path.join(__dirname+"/../client/public","index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
