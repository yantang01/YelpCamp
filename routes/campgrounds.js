const express = require('express');
const router = express.Router();
// import catchAsync function
const catchAsync = require('../utils/catchAsync');
// require Campground model
const Campground = require('../models/campground');
// require joi schema
const { campgroundSchema } = require('../schemas')
// require middlewares
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
// import controllers
const campgrounds = require('../controllers/campgrounds');
// require storage
const { storage } = require('../cloudinary')
// multer set up for images
const multer = require('multer')
const upload = multer({ storage })



// Index - all of our campgrounds
// New - post
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
// .post(upload.array('image'), (req, res) => {
//     console.log(req.body, req.files);
//     res.send('It worked')
// })

// New - form
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// Show - details for one specific campground
// Edit - post
// Delete - post
router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

// Edit - form
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))


module.exports = router;