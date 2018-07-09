// user controller
const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});


const User = require('../models/users.js');

//...farther down the page
router.post('/', (req, res) => {
    User.create(req.body, (err, createdUser)=>{
        res.redirect('/');    
    });
});


module.exports = router;