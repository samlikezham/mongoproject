const express = require('express');
const router = express.Router();
const Admin = require('../models/adminusers.js')


router.get('/new', (req, res) => {
    res.render('sessions-admin/new.ejs');
});

router.post('/', (req, res)=>{
    Admin.findOne({ username: req.body.username }, (err, foundUser)=>{
        if(req.body.password == foundUser.password){
            req.session.currentUser = foundUser;
            res.redirect('/admin');
        } else {
            res.send('wrong password');
        }
    });
});


module.exports = router;