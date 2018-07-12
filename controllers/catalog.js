// catalog controller
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Item = require('../models/items.js');
const Cart = require('../models/cart.js');
const Admin = require('../models/adminusers.js');


const session = require('express-session');
const methodOverride = require('method-override');

// router.get('/', (req, res) => {
// 	User.find({}, (err, foundUsers) => {
// 		res.render('accessed/index.ejs', {
// 			users: foundUsers
// 		});
// 	});
// });

// delete route
router.delete('/:id', (req, res) => {
	Item.findByIdAndRemove(req.params.id, (error, data) => {
		res.redirect('/catalog');
	});
});

// new item route
router.get('/add-item', (req, res) => {
	res.render('admin/new.ejs', {
		currentAdmin: req.session.currentAdmin,
		currentUser: req.session.currentUser,
		currentCart: req.session.cart
	});
});

// edit route
router.get('/:id/edit', (req, res) => {
	Item.findById(req.params.id, (err, foundItem) => {
		res.render(
			'../views/admin/edit.ejs', {
				items: foundItem,
				currentAdmin: req.session.currentAdmin,
				currentUser: req.session.currentUser,
				currentCart: req.session.cart
			}
		);
	});
});

// update route
router.put('/:id', (req, res) => {
	Item.findByIdAndUpdate(req.params.id, req.body, {new:true}, 
		(err, updatedModel) => {
			res.redirect('/catalog/' + req.params.id);
		});
});

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


//create Create Route
router.post('/', (req, res) => {
	Item.create(req.body, (error, createdItem) => {
		res.redirect('/catalog');
	});
});


//add-to-cart get route
router.get('/add-to-cart/:id', (req, res) => {
	let productId = req.params.id;
	// if the cart exists then pass in old cart, otherwise pass in empty object
	let cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

	Item.findById(productId, (err, product) => {
		if (err) {
			return res.redirect('/catalog/');
		}
		// if no errors then add product to cart
		cart.add(product, product.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/catalog/' + req.params.id);
	});
});


// shopping cart route
// router.get('/shopping-cart/', (req, res) => {
// 	if (!req.session.cart) {
// 		return res.render('catalog/shopping-cart', {products: null});
// 	}
// 	let cart = new Cart(req.session.cart);
// 	res.render('catalog/shopping-cart' , {products: cart.generateArray(), totalPrice: cart.totalPrice});
// });



//buy route
router.put('/:id/buy', (req, res) => {
	Item.update(
		{_id: req.params.id}, 
		{$inc: {qty: -1}}, (error, foundProduct) => {
			res.redirect('/catalog/' + req.params.id)
		});
});




module.exports = router;