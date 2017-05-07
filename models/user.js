var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Allows me to hash my passwords
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

userSchema.methods.encryptPassword = function(password){
	//Creates and gets encrypted password
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password){
	//this refers to the user which password is valid
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);