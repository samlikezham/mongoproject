// git push heroku master and git push origin master
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/mens_catalog';
const Item = require('./models/items.js');
const User = require('./models/users.js');

const session = require('express-session');
const methodOverride = require('method-override');


// MIDDLEWARE
//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// static files middleware
app.use(express.static('public'));
// express-session middleware
app.use(session({
  secret: "feedmeseymour", //some random string
  resave: false,
  saveUninitialized: false
}));
//method override
app.use(methodOverride('_method'));


// CONTROLLERS
//main catalog
const catalogController = require('./controllers/catalog.js');
app.use('/catalog', catalogController);
// user controller
const usersController = require('./controllers/users.js');
app.use('/users', usersController);
// sessions controller
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


app.get('/seed', async (req, res) => {
  const newItem =
    [
      {
        name: 'Top',
        description: 'Men\'s polo top',
        img: 'https://i.imgur.com/mdFVn1p.jpg',
        price: 5,
        qty: 99
      }, {
        name: 'Jeans',
        description: 'Men\'s denim',
        img: 'https://i.imgur.com/R3AKVgt.jpg',
        price: 25,
        qty: 0
      }, {
        name: 'Shoes',
        description: 'Men\'s shoes',
        img: 'https://i.imgur.com/Hlt2pwL.jpg',
        price: 7000,
        qty: 1
      }
    ]

  try {
    const seedItems = await Item.create(newItem)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})



app.get('/', (req, res)=>{
    res.render('index.ejs', {
        currentUser: req.session.currentUser
    });
});


app.listen(PORT, () => {
	console.log('listening on port', PORT)
});

mongoose.connect(mongoUri);
mongoose.connection.on('open', () => {
	console.log('connected to mongoose!!!!!!!!');
});







// fishing lake review site
// NYC pizza shop - pizza reviews and delivery site