// catalog controller
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Item = require('../models/items.js');
const Cart = require('../models/cart.js');


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
			currentUser: req.session.currentUser,
			currentCart: req.session.cart,
			currentAdmin: req.session.currentAdmin
		});
	});
});

//show route
router.get('/:id', (req, res) => {
	Item.findById(req.params.id, (err, foundItem) => {
		res.render('accessed/show.ejs', {
			items: foundItem,
			currentUser: req.session.currentUser,
			currentCart: req.session.cart,
			currentAdmin: req.session.currentAdmin
		});
	});
});


//cart/checkout route
router.get('/add-to-cart/:id', (req, res) => {
	let productId = req.params.id;
	let cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

	Item.findById(productId, (err, product) => {
		if (err) {
			return res.redirect('/catalog/');
		}
		cart.add(product, product.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/catalog/' + req.params.id);
	});
});


//buy route
// router.put('/:id/buy', (req, res) => {
// 	Item.update(
// 		{_id: req.params.id}, 
// 		{$inc: {qty: -1}}, (error, foundProduct) => {
// 			res.redirect('/catalog/' + req.params.id)
// 		});
// });




module.exports = router;