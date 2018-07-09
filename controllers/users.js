// user controller
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});


const User = require('../models/users.js');


router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
        res.redirect('/');
    });
});



module.exports = router;