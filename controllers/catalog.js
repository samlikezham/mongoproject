// catalog controller
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Item = require('../models/items.js');

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
			items: allItems
		});
	});
});





module.exports = router;