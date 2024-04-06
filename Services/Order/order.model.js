const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId, ref:'user'
    },
    orderItem:[{
        product:{type: mongoose.Types.ObjectId, ref:'product'},
        quantity:{type: Number},
        price:{type: Number}
    }],
    totalOrderPrice :{type : Number}
})

const Order = mongoose.model('order',orderSchema);
module.exports = Order;