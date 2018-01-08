
// setup ================================================
require('dotenv').config();
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080;

var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(express.static(path.join(__dirname, 'client/build')));

require('./config/passport')(passport);

// set up router to separate routes
// var auth = require('./routes/auth');

// set up express app
app.use(morgan('dev')); //logs requests to the console
app.use(cookieParser()); //read cookies (needed for auth)
app.use(bodyParser()); //get info from html forms

// routes part deux
// app.use('/auth', auth);


// required for passport
app.use(session({secret: 'shhhyojeezitsasecret'})); //worst ever secret
app.use(passport.initialize());
app.use(passport.session());  //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session

// routes ===============================================
require('./app/routes.js')(app, passport);  //loads routes and passes in app and passport

// launch ===============================================
app.listen(port);
console.log("Tune in on port ", port);