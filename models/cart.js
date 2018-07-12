// cart constructor

// first store the cart in a users session 
module.exports = function Cart(oldCart) {
	// gets the old cart if it exists and assigns the values of the old cart
	this.items = oldCart.items || {};
	this.totalQty = oldCart.totalQty || 0;
	this.totalPrice = oldCart.totalPrice || 0;
	// function allows us to add new items to the cart
	this.add = (item, id) => {
		// check if it exists
		let storedItem = this.items[id];
		// if not then create a new one
		if (!storedItem) {
			storedItem = this.items[id] = {item: item, qty: 0, price: 0};
		}
		// increase and adjust qty and prices
		storedItem.qty++;
		storedItem.price = storedItem.item.price * storedItem.qty;
		this.totalQty++;
		this.totalPrice += storedItem.item.price;
	}
	this.generateArray = () => {
		let arr = [];
		// loop through id keys in items
		for (let id in this.items) {
			arr.push(this.items[id]);
		}
		return arr;
	};
};