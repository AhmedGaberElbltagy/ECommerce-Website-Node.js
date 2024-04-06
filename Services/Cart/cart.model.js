const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId, ref:'user'
    },
    cartItem:[{
        product:{type: mongoose.Types.ObjectId, ref:'product'},
        quantity:{type: Number},
        price:{type: Number}
    }],
    totalPrice :{type : Number},
})

const Cart = mongoose.model('cart',cartSchema);
module.exports = Cart;