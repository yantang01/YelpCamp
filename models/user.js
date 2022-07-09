// import mongoose
const mongoose = require('mongoose');

// import passportLocalMongoose
const passportLocalMongoose = require('passport-local-mongoose');

// make a Schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.plugin(passportLocalMongoose); // this is going to add username and password to our Schema. This will make sure our username is unique, etc.

// Model - this gives us a "User" class, and a collection named "users"
const User = mongoose.model('User', userSchema)

// export module so that we can require in another file
module.exports = User;