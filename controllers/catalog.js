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

// accessed catalog index route
router.get('/', (req, res) => {
	Item.find({}, (err, allItems) => {
		res.render('accessed/index.ejs', {
			items: allItems,
			currentUser: req.session.currentUser
		});
	});
});

//show route
router.get('/:id', (req, res) => {
	Item.findById(req.params.id, (err, foundItem) => {
		res.render('accessed/show.ejs', {
			items: foundItem
		});
	});
});

//buy route
router.put('/:id/buy', (req, res) => {
	Item.update(
		{_id: req.params.id}, 
		{$inc: {qty: -1}}, (error, foundProduct) => {
			res.redirect('/catalog/' + req.params.id)
		});
});




module.exports = router;