var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Product export
module.exports = mongoose.model('Product', new Schema({
	name: String,
	email: String
}));