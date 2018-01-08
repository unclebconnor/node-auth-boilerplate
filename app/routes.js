var db = require('../models');
var passport = require('passport');
var path = require('path');
var axios = require('axios');

module.exports = function(app, passport) {
	

	// ============= HOME PAGE (with login links) =============
	app.get('/', function(req, res){
		res.render('index.ejs'); //load the index.ejs file
	});

	// ============= LOGIN =============
	// show the login form
	app.get('/login', function(req, res) {
		// render the page and pass in flash if it exists
		res.render('login.ejs', {message: req.flash('loginMessage') });
	});

    app.post('/login', function(req, res, next) {
	  passport.authenticate('local-login', function(err, user, info) {
	    if (err) { return next(err); }
	    // FIX THIS...RETURN "THAT COMBINATION OF CREDENTIALS DOESN'T EXIST"
	    // if (!user) { return res.redirect('/login'); }
	    req.logIn(user, function(err) {
	      if (err) { return next(err); }
	      return res.send(user);
	    });
	  })(req, res, next);
	});


	// ============= SIGNUP =============
	// show the signup form
	app.get('/signup', function(req, res){
		//render the page and pass in flash if it exists
		res.render('signup.ejs', {message: req.flash('signupMessage') });
	});


	app.post('/signup', function(req, res, next) {
	  passport.authenticate('local-signup', function(err, user, info) {
	    if (err) { return next(err); }
	    // FIX THIS...IF USER EXISTS RETURN MESSAGE
	    // if (!user) { return res.redirect('/login'); }
	    req.logIn(user, function(err) {
	      if (err) { return next(err); }
	      return res.send(user);
	    });
	  })(req, res, next);
	});

	// ============= PROFILE SECTION =============
	// protected so you have to be logged in to visit
	// route middleware will verify this (the isLoggedIn function)

	// this version for using EJS as view engine
	// app.get('/profile', isLoggedIn, function(req, res) {
	// 	res.render('profile.ejs', {
	// 		user: req.user //get the user from session and pass to template
	// 	});
	// });

	// app.get('/profile', isLoggedIn, function(req, res) {
	// 	res.send('profile.ejs', {
	// 		user: req.user //get the user from session and pass to template
	// 	});
	// });

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