const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    destination: String,
    customer: String,
    deliveryAgent: String
    /*location: [{
        type: String
    }],
    time: [{
        type: String
    }]*/

});
module.exports = mongoose.model('Order', OrderSchema);