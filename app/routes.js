
module.exports = function(app, passport) {
	

	// ============= HOME PAGE (with login links) =============
	app.get('/', function(req, res){
		res.render('index.ejs'); //load the index.ejs file
	});

	// ============= LOGIN =============
	// show the login form
	app.get('/login', function(req, res) {
		// render the page and pass in flash if it exists
		res.render('login.ejs', {message; req.flash('loginMessage') });
	});

	// process the login form
	// app.post('/login', PASSPORT STUFF HERE)

	// ============= SIGNUP =============
	// show the signup form
	app.get('/signup', function(req, res){
		//render the page and pass in flash if it exists
		res.render('signup.ejs', {message: req.flash('signupMessage') });
	});

	// process the signup form
	// app.post('/signup', PASSPORT STUFF HERE);

	// ============= PROFILE SECTION =============
	// protected so you have to be logged in to visit
	// route middleware will verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user: req.user //get the user from session and pass to template
		});
	});

	// ============= LOGOUT =============
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in 
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, continue
	if(req.isAuthenticaed()){
		return next;
	} // if not, redirect to home page
	else{
		res.redirect('/');
	}
};




















// THIs IS THE END MY FRIEND