// user models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//USER model
const userSchema = Schema({
	username: String,
	password: String,
});



//Create USER CREATE ROUTE
const User = mongoose.model('User', userSchema);



module.exports = User;