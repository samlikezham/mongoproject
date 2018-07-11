const express = require('express');
const router = express.Router();
const Admin = require('../models/adminusers.js');

router.get('/new', (req, res) => {
    res.render('users-admin/new.ejs');
});


router.post('/', (req, res) => {
    Admin.create(req.body, (err, createdUser)=>{
        res.redirect('/admin');    
    });
});


module.exports = router;


// finish admin views to show Catalog upon login ( maybe redirecting to catalog page upon login? Then <% if (currentAdmin) %> show delete/edit?
// allow admin to edit/delete items
// STYLE pages
// FIX heroku