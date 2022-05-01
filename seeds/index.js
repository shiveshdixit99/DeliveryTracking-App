const mongoose = require('mongoose');
const Order = require('../models/order');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedDB = async () => {
    await Order.deleteMany({});

    const ord = new Order({
        destination: `Lucknow`,
        customer: `Ramesh`, deliveryAgent: `Shyam`
    });

    await ord.save();

}

seedDB().then(() => {
    mongoose.connection.close();
})