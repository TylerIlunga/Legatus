var express = require('express'),
	router = express.Router();

var userData = require('../models/userData.js');

router.get('/', function(req, res, next){
		res.render('shop/index', {title: 'Legatus'});
});

router.get('/order', function(req, res, next){
	res.render('checkout/order', {title: 'Order'})
});

router.get('/buy', function(req, res, next){
	res.render('checkout/buy', {title: 'Buy'})
});

router.get('/success', function(req, res, next){
	res.render('outcomes/success')
});

router.get('/canceled', function(req, res, next){
	res.render('outcomes/canceled')
});

router.get('/:page', function(req, res, next) {
	var page = req.params.page;
	res.send(

		"<p><strong>Page Not Found, Sorry :(</strong><p><br><a href=\'/ \'>Come Back!</a>"

		);
})

router.post('/api/order', function(req, res, next){
	var body = req.body;

	//submit to mongo

	var data = new userData({
		name: req.body.name,
		email: req.body.email
	});

	//save

	data.save(function(err){
		if (err) {
			throw err;
		} else {
			console.log('user info saved sucessfully');
			res.render('checkout/buy');
		}	
	});
});


module.exports = router;
