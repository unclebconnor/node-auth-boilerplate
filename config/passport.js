var bcrypt = require('bcrypt-nodejs');
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

	passport.deserializeUser(function(id, done) {
        db.user.findOne({ where: {id: id} }).then(function(user) {
            done(null, user);
        }).catch(function(error) {
            done(error);
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
			db.user.findOne({where: { twitterId : profile.id }})
			.then((user) => {

				if(user){
					return done(null, user); //user found, return that user
				} else {
					db.user.create({
							twitterId: profile.id,
							twitterToken: token,
							twitterUsername: profile.username,
							twitterDisplayName: profile.displayName
						})
						.then(function(newUser, created) {
                    	    if (!newUser) {
                    	        return done(null, false);
                    	    }
                    	    if (newUser) {
                    	        return done(null, newUser);
                    	    }
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
				db.user.findOne({where: { facebookId : profile.id }})
				.then((user) => {
					// if user is found, log them in
					if(user){
						return done(null, user);
					} else {
						db.user.create({
							facebookId: profile.id,
							facebookToken: token,
							facebookName: profile.displayName,
						})
						.then(function(newUser, created) {
                    	    if (!newUser) {
                    	        return done(null, false);
                    	    }
                    	    if (newUser) {
                    	        return done(null, newUser);
                    	    }
                    	});
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
            db.user.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user){
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else{
                    db.user.create({
                    	email: email,
                        password: password
                    }).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
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
        	    if (user===null){
        	        return done("error");
        	    }
        	    if (!user){
        	        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
        	    }
        	    if (!user.validPassword(password)){
        	        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        	    }
        	    // all is well, return successful user
        	    return done(null, user);
        }); // end User.findOne
    })); // end of localstrategy and passport.use
}