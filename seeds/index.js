// require cities
const cities = require('./cities')
// require seedHelpers
const { descriptors, places } = require('./seedHelpers')
// require Campground model
const Campground = require('../models/campground')
// import mongoose
const mongoose = require('mongoose');
// open a connection to the yelp-camp database on our locally running instance of MongoDB
main().catch(err => console.log(err));
async function main() {
    console.log('Database Connected')
    await mongoose.connect('mongodb+srv://yantang0727:Jianxiaishen1830@cluster0.c5fwq.mongodb.net/?retryWrites=true&w=majority');
}

function sample(array) {
    return array[Math.floor(Math.random() * array.length)]
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62c62a28d4a8aae8203cf842',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/do6ixnzaa/image/upload/v1657244755/YelpCamp/fkdhoigxorihrmr2umty.jpg',
                    filename: 'YelpCamp/fkdhoigxorihrmr2umty',
                },
                {
                    url: 'https://res.cloudinary.com/do6ixnzaa/image/upload/v1657244755/YelpCamp/pszj2elgrtmiakos69ph.jpg',
                    filename: 'YelpCamp/pszj2elgrtmiakos69ph',
                }
            ],
            geometry: {
                type: 'Point', coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis cumque itaque nulla inventore enim, mollitia ipsum. Possimus voluptate rerum soluta repellendus, deleniti labore at deserunt libero, explicabo quam maiores. At?',
            price: price
        });
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})
