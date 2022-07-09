// import mongoose
const mongoose = require('mongoose');

// make a Schema
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

// Model - this gives us a "Review" class, and a collection named "reviews"
const Review = mongoose.model('Review', reviewSchema)

// export module so that we can require in another file
module.exports = Review;

