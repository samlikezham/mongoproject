// session controller
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});


router.post('/', (req, res)=>{
    User.findOne({ username: req.body.username },(err, foundUser) => {
        if( bcrypt.compareSync(req.body.password, foundUser.password) ){
        	currentUser: req.session.currentUser
            req.session.currentUser = foundUser;
            res.redirect('/catalog');
        } else {
            res.send('wrong password');
        }
    });
});

router.delete('/', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/');
    });
})



module.exports = router;