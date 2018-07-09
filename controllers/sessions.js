// session controller
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});


router.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser)=>{
        if(req.body.password == foundUser.password){
            req.session.currentUser = foundUser;
            res.redirect('/catalog');
        } else {
            res.send('wrong password');
        }
    });
});



module.exports = router;