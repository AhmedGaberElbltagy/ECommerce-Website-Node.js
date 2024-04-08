const Cart = require('./cart.model');
const Product = require('../Products/product.model');
const { ErrorHandler } = require('../../utils/errorHanler')
const response = require('../../utils/response');


const calcCartPrice = (cart) => {
    let overAllPrice = 0;
    cart.cartItem.forEach(element => {
        overAllPrice += element.price * element.quantity;
    });
    cart.totalPrice = overAllPrice;
}
const addtoCart = async (req, res, next) => {
    try {
        //Check if Product is avaliable .
        const product = await Product.findById(req.body.product);
        if (!product) {
            throw new ErrorHandler(404, "product not found");
        }
        //Check if the wanted quantity is avaliable
        if (product.quantity < req.body.quantity) {
            throw new ErrorHandler(401, "product sold out")
        }
        //Check if the user have already a cart
        const iscartExist = await Cart.findOne({ user: req.user })
        req.body.price = product.price
        // if the user have not a cart Creating a new one 
        if (!iscartExist) {
            let cart = new Cart({
                user: req.user,
                cartItem: [req.body]
            })
            calcCartPrice(cart);
            await cart.save();
            return response(true, 200, { cart }, res);
        }
        else {
            let item = iscartExist.cartItem.find((item) => item.product == req.body.product);
            if (item) {
                let avaliableQuantity = Math.abs(product.quantity - item.quantity);
                if (item.quantity + req.body.quantity > product.quantity) {
                    res.send(`only avalible is ${avaliableQuantity}`);
                }
                item.quantity += req.body.quantity;
                await iscartExist.save();
                return response(true, 200, { iscartExist }, res);
            }
            else {
                iscartExist.cartItem.push(req.body);
                calcCartPrice(iscartExist);
                await iscartExist.save();
                return response(true, 200, { cart: iscartExist }, res);
            }
        }
    } catch (error) {
        next(error)
    }
}

const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user }).populate('cartItem.product');
        if (!cart) {
            throw new ErrorHandler(404, "Cart not found ")
        } else {
            return response(true, 200, { cart }, res)
        }
    } catch (error) {
        next(error);
    }
}

const removeItemfromCart = async (req, res, next) => {
    try {
        let updatedCart = await Cart.findOneAndUpdate({ user: req.user },
            { $pull: { cartItem: { _id: req.params.id } } }, { new: true });
        // caculate the cart totalPrice after remove this item ;
        calcCartPrice(updatedCart);
        await updatedCart.save()
        if (!updatedCart) {
            throw new ErrorHandler(404, " item not found ")
        }
        return response(true, 200, { updatedCart }, res)
    } catch (error) {
        next(error)
    }
}

const updateQuantity = async (req, res, next) => {
    try {
        let itemId = req.params.id;
        let userCart = req.user;
        let cart = await Cart.findOne({ user: userCart });
        if (!cart) {
            throw new ErrorHandler(404, "cart not found")
        }
        let item = await cart.cartItem.find(item => item.id == itemId);
        if (!item) {
            throw new ErrorHandler(404, "item not found")
        }
        item.quantity = req.body.quantity;
        calcCartPrice(cart)
        await cart.save();
        return response(true, 200, { cart }, res)
    } catch (error) {
        next(error)
    }
}

const clearUserCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user })
        if (!cart) {
            throw new ErrorHandler(404, "cart not found")
        }
        await cart.deleteOne();
        return response(true, 200, "cart cleared", res)
    } catch (error) {
        next(error)
    }
}

module.exports = { addtoCart, updateQuantity, removeItemfromCart, getCart, clearUserCart }
