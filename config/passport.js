var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var db = require('../models'); // load user model
var configAuth = require('./auth'); // load the auth variables

//expose the function to the app by using module.exports
module.exports = function(passport) {

	// ============= PASSPORT SESSION SETUP =============
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done){
		db.user.findById(id, function(err, user){
			done(err, user);
		});
	});

	// ============= GOOGLE =============
	passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));

	// ============= TWITTER =============

	passport.use(new TwitterStrategy({
		consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL
	},
	function(token, tokenSecret, profile, done){
		// asynchronous
		process.nextTick(function(){
			User.findOne({ 'twitter.id' : profile.id }, function(err, user){

				//if there's an error, return it
				if(err){
					return done(err);
				}

				if(user){
					return done(null, user); //user found, return that user
				} else {
					//if there's no user, create one
					var newUser = new User();

					// set all of the user data that we need
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.token       = token;
                    newUser.twitter.username    = profile.username;
                    newUser.twitter.displayName = profile.displayName;

                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
				}
			});
		});
	}));

	// ============= FACEBOOK =============

	passport.use(new FacebookStrategy({
		// pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL
	},

		// facebook will send back the token and profile
		function(token, refreshToken, profile, done){
			// asynchronous
			process.nextTick(function(){

				// find the user in the database based on FB ID
				User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
					
					// if there is an error, stop everything and return that
					if(err){
						return done(err);
					}

					// if user is found, log them in
					if(user){
						return done(null, user);
					} else {
						// if no user is found, create them
						var newUser = new User();

						// set all of the FB info in our user model
						newUser.facebook.id = profile.id;
						newUser.facebook.token = token;
						newUser.facebook.name = profile.displayName;
						if(profile.emails){
							newUser.facebook.email = profile.emails[0].value;
						}
						
						// save user to DB
						newUser.save(function(err){
							console.log(err)
							if(err){
								throw err;
							} else{
								return done(null, newUser)
							}
							
						})
					}
				})
			})
		}
	));


	// ============= LOCAL SIGNUP =============
	// we are using namded strategies since we have one for a signup
	// by default, if there was no name, it would just be called "local"

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email', //overriding default strategy
		passwordField: 'password',
		passReqToCallback: true //so we can pass back entire req to callback
	},
	function(req, email, password, done) {
		// asynchronous
		// User.findOne won't fire unless data is sent back
		process.nextTick(function(){
		// 	// find a user whose email is the same as the form's email
		// 	// checking to see if the user trying to login already exists
			db.user.findOrCreate({
				where: { 
					'email' : req.body.email 
				}
			})
			.spread((user, created) => {
				console.log('#####CREATED##',created)
				if (created){ return done(null, user); }
				if (!created){
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
				} 
			});
		}); // end of process.nextTick
	})); //end of localstrategy and passport.use


	// ============= LOCAL LOGIN =============
	// by default, if there was no name, it would just be called "local"
	passport.use('local-login', new LocalStrategy({
        usernameField : 'email', // overriding default strategy
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        db.user.findOne({ where: { 'email' :  email }})
        	.then((user) => {
        	    // if there are any errors, return the error before anything else
        	    if (user===null){
        	        return done("error");
        	    }

        	    // if no user is found, return the message
        	    if (!user){
        	        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
        	    }

        	    // if the user is found but the password is wrong
        	    if (!user.validPassword(password)){
        	        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        	    }

        	    // all is well, return successful user
        	    return done(null, user);
        }); // end User.findOne
    })); // end of localstrategy and passport.use
}