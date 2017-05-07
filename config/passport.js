var passport = require('passport'),
	User = require('../models/user'),
	LocalStrategy = require('passport-local').Strategy;

//how to store user in the session
passport.serializeUser(function(user, done){
	//when done serialize by ID
	done(null, user.id)
});

passport.deserializeUser(function(id, done){
	//find user by ID
	User.findById(id, function(err, user){
		done(err, user);
	});
});

passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done){
	req.checkBody('email', 'Invalid email').notEmpty().isEmail();
	req.checkBody('password', 'Invalid password').notEmpty().isLength({min:3});
	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(err){
			messages.push(error.msg);
		});
		return done(null, false, req.flash('error', messages));
	}
	User.findOne({'email': email}, function(err, user){
		if (err) {
			return done(err);
		}
		if (!user) {
			//Flash message stored in Session and flashed in the view
			return done(null, false, {message: 'Email is already in use.'});
		}
		var newUser = new User();
			newUser.email = email;
			newUser.password = newUser.encryptPassword(password);
			newUser.save(function(err, result){
				if (err) {
					return done(err);
				}
				return done(null, newUser);
			});
	});
}));

passport.use('local.signin', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'passport',
	passReqToCallback: true
}, function(req, email, password, done){
	req.checkBody('email', 'Invalid email').notEmpty().isEmail();
	req.checkBody('password', 'Invalid password').notEmpty()
	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(err){
			messages.push(error.msg);
		});
		return done(null, false, req.flash('error', messages));
	}
	User.findOne({'email': email}, function(err, user){
		if (err) {
			return done(err);
		}
		if (!user) {
			//Flash message stored in Session and flashed in the view
			return done(null, false, {message: 'No user found.'});
		}
		if (!user.validPassword(password)) {
			return done(null, false, {message: 'Wrong password.'});	
		}
		return done(null, user);
	});

}));