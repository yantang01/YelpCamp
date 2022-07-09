const express = require('express');
const router = express.Router({ mergeParams: true });
// import ExpressError Class
const ExpressError = require('../utils/ExpressError');
// import catchAsync function
const catchAsync = require('../utils/catchAsync');
// require Campground model
const Campground = require('../models/campground');
// Review Model
const Review = require('../models/review');
// require joi schema
const { reviewSchema } = require('../schemas')
// require middlewares
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
// import controllers
const reviews = require('../controllers/reviews');

// Post review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// Delete review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;