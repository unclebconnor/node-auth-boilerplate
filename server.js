
// setup ================================================
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
// var Sequelize = require('sequelize');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// configuration ========================================
mongoose.connect(configDB.url);  //connect to database (Mongo temporarily)

require('./config/passport')(passport);

// set up express app
app.use(morgan('dev')); //logs requests to the console
app.use(cookieParser()); //read cookies (needed for auth)
app.use(bodyParser()); //get info from html forms

// replace with react view engine: https://www.npmjs.com/package/react-view-engine
app.set('view engine','ejs'); // set up ejs for templating

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