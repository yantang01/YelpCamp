const express = require('express');
const router = express.Router({ mergeParams: true });
// import controllers
const users = require('../controllers/users');

// import catchAsync function
const catchAsync = require('../utils/catchAsync');

// User Model
const User = require('../models/user');
const passport = require('passport');

// form to register
// to register a new user
router.route('/register')
    .get((users.renderRegister))
    .post(catchAsync(users.register))

// form to login
// to login a new user
router.route('/login')
    .get((users.renderLogin))
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (users.login))

// logout
router.get('/logout', (users.logout))

module.exports = router;