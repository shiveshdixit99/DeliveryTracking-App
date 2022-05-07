const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Order = require('./models/order');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.render('home')
});
app.get('/orders', async (req, res) => {
    const orders = await Order.find({});
    //console.log(orders);
    //res.send("recieved");
    res.render('orders/index', { orders })
});
app.get('/orders/new', (req, res) => {
    res.render('orders/new');
})

app.post('/orders', async (req, res) => {
    const order = new Order(req.body.order);
    //res.send(req.body.order);
    // res.send(order);
    await order.save();
    res.redirect(`/orders/${order._id}`)
})

app.get('/orders/:id', async (req, res,) => {
    const order = await Order.findById(req.params.id)
    res.render('orders/show', { order });
});

app.get('/orders/:id/edit', async (req, res) => {
    // res.send("HI");
    const order = await Order.findById(req.params.id)
    //res.send(order);
    res.render('orders/edit', { order });
})

app.put('/orders/:id', async (req, res) => {
    const { id } = req.params;
    let order = await Order.findById(id);
    //res.send(order);
    const { location, Dtime } = req.body.order;
    order.location.push(location);
    // order.location.push("gkp");
    //order.Dtime.push("12");
    order.Dtime.push(Dtime);
    //res.send(order);
    order = await Order.findByIdAndUpdate(id, order);
    res.redirect(`/orders/${order._id}`)
});

app.listen(3000, () => {
    console.log('Serving on port 3000')
})