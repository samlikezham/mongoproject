const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adminSchema = Schema({
	username: String,
	password: String
});



//Create admin
const Admin = mongoose.model('Admin', adminSchema);



module.exports = Admin;