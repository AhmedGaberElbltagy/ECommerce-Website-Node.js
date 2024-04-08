const Order = require('./order.model');
const Cart = require('../Cart/cart.model');
const { ErrorHandler } = require('../../utils/errorHanler');
const response = require('../../utils/response');
const Product = require('../Products/product.model');


const createCashOrder = async (req, res, next) => {
    try {
        let userCart = await Cart.findOne({ user: req.user });
        if (!userCart) {
            throw new ErrorHandler(401, "user cart is not found")
        }
        let order = await Order({
            user: req.user,
            orderItem: userCart.cartItem,
            totalOrderPrice: userCart.totalPrice
        })
        await order.save();
        // update the Product quantity after order is done and update amount of product has been solded;
        let options = await userCart.cartItem.map((prod) => {
            return ({
                updateOne: {
                    "filter": { _id: prod.product },
                    "update": { $inc: { sold: prod.quantity, quantity: -prod.quantity } }
                }
            })

        })
        await Product.bulkWrite(options);
        await Cart.findOneAndDelete({ user: req.user })
        return response(true, 200, { order }, res)
    } catch (error) {
        next(error)
    }

}

module.exports = { createCashOrder }