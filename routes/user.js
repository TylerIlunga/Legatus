var express = require('express'),
	csrf = require('csurf'),
	passport = require('passport');

var csrfProtection = csrf({ cookie: true });

var router = express.Router();
router.use(csrf());

router.use(function (req, res, next){
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals.csrftoken = req.csrfToken();
  next();
})

router.get('/signup', csrfProtection, function(req, res, next){
	//check 
	var messages = req.flash('error');
	//might still not work, will check at home
	res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});

});	

router.post('/signup', passport.authenticate('local.signup', {
	successRedirect: '/user/profile',
	failureRedirect: '/user/signup',
	failureFlash: true
}));

router.get('/signin', csrfProtection, function(req, res, next){
	var messages = req.flash('error');
	//might still not work, will check at home
	res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});

});

router.post('/signin', passport.authenticate('local.signin', {
	successRedirect: '/user/profile',
	failureRedirect: '/user/signin',
	failureFlash: true
}));

router.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('/');
})

router.get('/profile', isLoggedIn, function(req, res, next){
	res.render('user/profile');
});

module.exports = router;

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
};

function isLoggedOut(req, res, next){

}