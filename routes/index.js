var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport'),
    LocalStrategy = require('passport-local');

// Index - Landing Page
router.get("/", function (req, res) {
    res.render("landing")
});

// GET - Show Register Form
router.get('/register', function (req, res) {
    res.render('register');
});

// POST - Handle The Register Form
router.post('/register', function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function () {
            req.flash('success', 'Welcome To YelpCamp ' + user.username);
            res.redirect('/campgrounds');
        });

    });
});

// GET - Show Login Form
router.get('/login', function (req, res) {
    res.render('login',)
});

// POST - Handle The Login Form
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function (req, res) {
    req.flash('success', 'Welcome To YelpCamp ' + req.user.username);
});

// GET - Logout
router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'Logged Out Successfully');
    res.redirect('/campgrounds');
});

module.exports = router;