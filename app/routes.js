var db = require('../models');
var passport = require('passport');
var path = require('path');
var axios = require('axios');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var secret = 'shhhyojeezitsasecret';

module.exports = function(app, passport) {

	// ============= ADDITIONAL ROUTE FILES =============
	// ==================================================
	app.use('/test',require('./test'));


	// ============= AUTH ROUTES =============
	// =======================================

	// ============= HOME PAGE (with login links) =============
	app.get('/', function(req, res){
		res.send('aloha'); //not really being used b/c react
	});

	// ============= LOGIN =============
	app.get('/login', function(req, res) {
		res.send('aloha');
	});

    app.post('/login', function(req, res, next) {
	  passport.authenticate('local-login', function(err, user, info) {
	    if (err) { return next(err); }
	    // FIX THIS...RETURN "THAT COMBINATION OF CREDENTIALS DOESN'T EXIST"
	    // if (!user) { return res.redirect('/login'); }
	    req.logIn(user, function(err) {
	    	if (err) { return next(err); }
	      	
	      	var token = jwt.sign(user.dataValues, secret, {
        		expiresIn: 60 * 60 * 24 // expires in 24 hours
      		});
	      	return res.send({user: user, token: token});
	    });
	  })(req, res, next);
	});

	// ============= REFRESH =============
	app.get('/me/from/token', function(req, res, next) {
		res.send('aloha');
	})

	app.post('/me/from/token', function(req, res, next) {
	  	// check header or url parameters or post parameters for token
	  	var token = req.body.token;
	  	if (!token) {
	    	return res.status(401).json({message: 'Must pass token'});
	  	}
	
	  	// get current user from token
	  	jwt.verify(token, secret, function(err, user) {
	    	req.logIn(user, function(err) {
	    		if (err) { return next(err); }
	      		return res.send({user: user, token: token});
	    	});
	  	});
	});


	// ============= SIGNUP =============
	// show the signup form
	app.get('/signup', function(req, res){
		res.send('aloha');
	});


	app.post('/signup', function(req, res, next) {
	  passport.authenticate('local-signup', function(err, user, info) {
	    if (err) { return next(err); }
	    // FIX THIS...IF USER EXISTS RETURN MESSAGE
	    // if (!user) { return res.redirect('/login'); }
	    req.logIn(user, function(err) {
	      	if (err) { return next(err); }
	      	
	      	var token = jwt.sign(user.dataValues, secret, {
        		expiresIn: 60 * 60 * 24 // expires in 24 hours
      		});
	      	return res.send({user: user, token: token});
	    });
	  })(req, res, next);
	});


	// ============= FACEBOOK =============
 	app.get('/auth/facebook', passport.authenticate('facebook', { 
      scope : ['public_profile', 'email']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        })
    );

    // app.get('/auth/facebook/callback',
    //     passport.authenticate('facebook', function(req,res,next){
    //     	console.log('BOO HISS')
    //     })
    // );

    // ============= TWITTER =============
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated
    app.get('/auth/twitter/callback',
    	passport.authenticate('twitter', {
    		successRedirect: '/profile',
    		failureRedirect: '/'
    	})
    );

    // ============= GOOGLE =============
    app.get('/auth/google', passport.authenticate('google', 
    	{ scope : ['profile', 'email'] }
    ));

    app.get('/auth/google/callback',
    	passport.authenticate('google', {
    		successRedirect: '/profile',
    		failureRedirect: '/'
    	})
    );

	// ============= LOGOUT =============
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
		// recommended implementation from stack overflow:
		// req.session.destroy(function (err) {
  		// 	res.redirect('/'); //Inside a callback… bulletproof!
  		// });
	});


	// The "catchall" handler: for any request that doesn't
	// match one above, send back React's index.html file.
	app.get('*', (req, res) => {
	  res.sendFile(path.join(__dirname+'/client/build/index.html'));
	});
};

// route middleware to make sure a user is logged in 
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, continue
	if(req.isAuthenticated()){
		return next();
	} // if not, redirect to home page
	else{
		res.redirect('/');
	}
};




















// THIs IS THE END MY FRIEND