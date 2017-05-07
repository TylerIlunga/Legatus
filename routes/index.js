var express = require('express'),
	router = express.Router();

var Product = require('../models/product');

router.get('/', function(req, res, next){
	Product.find(function(err, docs){
		var productChunks = [];
		var chunkSize = 3;
		for (var i = 0; i < docs.length; i += chunkSize) {
			productChunks.push(docs.slice(i, i + chunkSize));
		}
		res.render('shop/index', {title: 'WAVE', products: productChunks});
	});
});

router.get('/buy5', function(req, res, next){
	res.render('checkout/buy5');
});

router.get('/buy10', function(req, res, next){
	res.render('checkout/buy10');
});

router.get('/buy20', function(req, res, next){
	res.render('checkout/buy20');
});

router.get('/buy25', function(req, res, next){
	res.render('checkout/buy25');
});

router.get('/buy50', function(req, res, next){
	res.render('checkout/buy50');
});

router.get('/buy100', function(req, res, next){
	res.render('checkout/buy100');
});



module.exports = router;
