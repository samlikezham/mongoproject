const express = require('express');
const router = express.Router();
const Admin = require('../models/adminusers.js')


router.get('/new', (req, res) => {
    res.render('sessions-admin/new.ejs');
});

router.post('/', (req, res)=>{
    Admin.findOne({ username: req.body.username }, (err, foundAdmin)=>{
        if(req.body.password == foundAdmin.password){
            req.session.currentAdmin = foundAdmin;
            res.redirect('/catalog');
        } else {
            res.send('wrong password');
        }
    });
});


module.exports = router;