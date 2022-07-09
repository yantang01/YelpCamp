if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}



// import express
const express = require('express');
const app = express();
// require flash
const flash = require('connect-flash');
// import express session
const session = require('express-session');
// import path
const path = require('path');
// require ejs-mate
const ejsMate = require('ejs-mate');
// require passport
const passport = require('passport');
// require passport-local
const LocalStrategy = require('passport-local');
// mongoSanitize for security issues
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());
// database
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp'



// connect-mongo
const MongoStore = require('connect-mongo')(session);




// require Campground model
const Campground = require('./models/campground');
// Review Model
const Review = require('./models/review');
// User Model
const User = require('./models/user');

// import ExpressError Class
const ExpressError = require('./utils/ExpressError');

// import mongoose
const mongoose = require('mongoose');
// open a connection to the yelp-camp database on our locally running instance of MongoDB
main().catch(err => console.log(err));
async function main() {
    console.log('Database Connected');
    await mongoose.connect(dbUrl);
}

// import method override so that we can use form to patch
const methodOverride = require('method-override');
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// join the views folder with current directory
app.set('views', path.join(__dirname, 'views'));
// serve static files
app.use(express.static('public'))
// join the public folder with current directory
app.use(express.static(path.join(__dirname, 'public')))

// tell ejs to use ejsMate
app.engine('ejs', ejsMate);
// tell express we are going to use ejs
app.set('view engine', 'ejs');

const secret = process.env.secret || 'thisshouldbeabettersecret'

const store = new MongoStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
})
store.on('error', function (e) {
    console.log('Session store error', e)
})

// session
const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7, // expire a week from now
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

}
app.use(session(sessionConfig));

// passport set up
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash
app.use(flash());
// set flash to the locals so that we have access
app.use((req, res, next) => {
    if (!['/login', '/'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    }
    res.locals.currentUser = req.user; // local access - will have req.user in all templates
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})







// require user routes
const userRoutes = require('./routes/users')
// require campground routes
const campgroundRoutes = require('./routes/campgrounds')
// require campground routes
const reviewRoutes = require('./routes/reviews')

// for parsing application/x-www-form-urlencoded; this is usually the form of "submitting forms"
app.use(express.urlencoded({ extended: true }));
// for parsing json data when using req.body
app.use(express.json());

// this will combine / with user routes
app.use('/', userRoutes)
// this will combine /campgrounds with campground routes
app.use('/campgrounds', campgroundRoutes)
// this will combine /campgrounds/:id/reviews with review routes
app.use('/campgrounds/:id/reviews', reviewRoutes)

// home page
app.get('/', (req, res) => {
    res.render('home')
})

// 404
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

// error handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message === 'Oh No, Something Went Wrong!'
    res.statusCode = statusCode;
    res.render('error', { err })
})




const port = process.env.PORT || 3000;
// listen on port 3000
app.listen(port, () => {
    console.log(`Serving On Port ${}`)
})


