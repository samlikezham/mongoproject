//https://dashboard.heroku.com/apps/secret-chamber-85731
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/mens_catalog';
const Item = require('./models/items.js');
const User = require('./models/users.js');
const Admin = require('./models/adminusers.js');
const cookieParser = require('cookie-parser');
const expressHbs = require('express-handlebars');


const session = require('express-session');
const methodOverride = require('method-override');
// allows us to store data from our sessions
const MongoStore = require('connect-mongo')(session);

// view engine
// app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
// app.set('view engine', 'hbs');

// MIDDLEWARE
//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// static files middleware
app.use(express.static('public'));
// cookie parser
app.use(cookieParser());
// express-session middleware
app.use(session({
  secret: "feedmeseymour",
  resave: false,
  saveUninitialized: false,
  // store session 
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  // 180 min multiply by 60 seconds and 1000 milliseconds - session expires after 3 hrs
  cookie: { maxAge: 180 * 60 * 1000 }
}));
//method override
app.use(methodOverride('_method'));


// CONTROLLERS
// main catalog
const catalogController = require('./controllers/catalog.js');
app.use('/catalog', catalogController);
// user controller
const usersController = require('./controllers/users.js');
app.use('/users', usersController);
// sessions controller
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);
// admin user controller
const usersAdminController = require('./controllers/adminusers.js');
app.use('/users-admin', usersAdminController);
// admin sessions controller
const sessionsAdminController = require('./controllers/adminsessions.js');
app.use('/sessions-admin', sessionsAdminController);


// sample seed items
app.get('/seed', async (req, res) => {
  const newItem =
    [
      {
        name: 'The Professional',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        img: 'https://i.imgur.com/zRjdGAL.jpg',
        price: 125.95,
        qty: 1000
      }, {
        name: 'The Hipster',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
        img: 'https://i.imgur.com/9q9UrHw.jpg',
        price: 75.95,
        qty: 1000
      }, {
        name: 'The College Student',
        description: 'Excepteur sint occaecat cupidatat non proident',
        img: 'https://i.imgur.com/ljOObZa.jpg',
        price: 10.95,
        qty: 1000
      }, {
        name: 'Just Watches',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
        img: 'https://i.imgur.com/QngMFLM.jpg',
        price: 29.95,
        qty: 1000
      }, {
        name: 'Shoes Only',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
        img: 'https://i.imgur.com/2G56ftf.jpg',
        price: 39.95,
        qty: 1000
      }, {
        name: 'Hats',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
        img: 'https://i.imgur.com/wEqhQ44.jpg',
        price: 17.95,
        qty: 1000
      }
    ]

  try {
    const seedItems = await Item.create(newItem)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})



// main login screen (customer)
app.get('/', (req, res)=>{
    res.render('index.ejs', {
        currentUser: req.session.currentUser,
        currentAdmin: req.session.currentAdmin
    });
});

// main login screen (admin)
app.get('/admin', (req, res) => {
	res.render('../views/admin/index.ejs', {
		currentAdmin: req.session.currentAdmin
	});
});


//fix this - Should redirect back to home if user is not logged in
// app.get('/catalog/', (req, res) => {
// 	if (req.session.currentUser) {
// 		res.redirect('/catalog/');
// 	} else {
// 		res.redirect('/');
// 	}
// });


app.listen(PORT, () => {
	console.log('listening on port', PORT)
});

mongoose.connect(mongoUri);
mongoose.connection.on('open', () => {
	console.log('connected to mongoose!!!!!!!!');
});


