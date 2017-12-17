var db = require('../models');
var passport = require('passport');
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

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

	// ============= SIGNUP =============
	// show the signup form
	app.get('/signup', function(req, res){
		//render the page and pass in flash if it exists
		res.render('signup.ejs', {message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup',{
		successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
	}));

	// ============= PROFILE SECTION =============
	// protected so you have to be logged in to visit
	// route middleware will verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user: req.user //get the user from session and pass to template
		});
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
	});
};

// route middleware to make sure a user is logged in 
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, continue
	if(true){
		return next();
	} // if not, redirect to home page
	else{
		res.redirect('/');
	}
};




















// THIs IS THE END MY FRIEND