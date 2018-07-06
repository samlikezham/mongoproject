// git push heroku master and git push origin master
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';


app.get('/', (req, res) => {
	res.send('this works');
});


app.listen(PORT, () => {
	console.log('listening on port', PORT)
});

mongoose.connect(mongoUri);
mongoose.connection.on('open', () => {
	console.log('connected to mongoose!!!!!!!!');
});