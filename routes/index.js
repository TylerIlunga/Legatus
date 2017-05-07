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

router.get('/buy', function(req, res, next){
	res.render('checkout/buy');
});

module.exports = router;
