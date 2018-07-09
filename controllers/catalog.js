// catalog controller
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Item = require('../models/items.js');


const session = require('express-session');
const methodOverride = require('method-override');


// router.get('/', (req, res) => {
// 	User.find({}, (err, foundUsers) => {
// 		res.render('accessed/index.ejs', {
// 			users: foundUsers
// 		});
// 	});
// });

router.get('/', (req, res) => {
	Item.find({}, (err, allItems) => {
		res.render('accessed/index.ejs', {
			items: allItems,
			currentUser: req.session.currentUser
		});
	});
});




module.exports = router;