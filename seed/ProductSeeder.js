var Product = require('../models/product');

var mongoose = require('mongoose');

var products = [ 
	new Product({
		imagePath: '../public/images/product1.jpg',
		title: "More Life",
		description: "The Legendary MC's fifth project",
		price: 15
	}),
	new Product({
		imagePath: '../public/images/product2.jpg',
		title: "CTRL",
		description: "The Maplewood Singer's Second Studio Album",
		price: 15
	}),
	new Product({
		imagePath: "../public/images/product3.jpg",
		title: "Cruel Winter",
		description: "Chicago's Prodigy's Second Compilation Album",
		price: 15
	})


];

var counter = 0;
for (var i = counter; i < products.length; i++) {
		if (counter === products.length) {
			console.log("Products already saved!");
		} else {
			products[i].save(function(err, result){
				counter++;
				if (err) {
					console.log(err);
				};
			});
		};

		
};



