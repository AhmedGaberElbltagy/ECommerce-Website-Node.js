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
            throw new ErrorHandler( 400 , "product not found");
        }
        //Check if the wanted quantity is avaliable
        if (product.quantity < req.body.quantity) {
            throw new ErrorHandler( 401 , "product sold out" )
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
    }catch (error) {
        next(error)
    }
}

const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user }).populate('cartItem.product');
        if (!cart) {
            res.status(401).json({ message: "cart not found" })
        } else {
            res.status(200).json({ message: "cart", cart })
        }
    } catch (error) {
        next(error);
    }
}

const removeItemfromCart = async (req, res, next) => {
    try {
        let updatedCart = await Cart.findOneAndUpdate({ user: req.user },
            { $pull: { cartItem: { _id: req.params.id } } }, { new: true });
        calcCartPrice(updatedCart);
        await updatedCart.save()
        !updatedCart && next(new AppError('item not found', 404))
        res.status(200).json({ message: "done", updatedCart })
    } catch (error) {
        next(error);
    }
}

const updateQuantity = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user });
        if (!cart) return res.send("cart not found");
        let item = await cart.cartItem.find(item => item.id == req.params.id);
        if (!item) {
            res.send("item not found")
        }
        item.quantity = req.body.quantity;
        calcCartPrice(cart)
        await cart.save();
        res.send({ msg: 'success', cart })
    } catch (error) {
        next(error)
    }
}

const clearUserCart = async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user })
    if (!cart) {
        res.status(401).json({ message: "cart not found" })
    }
    await cart.deleteOne();
    res.status(200).json({ message: "cart Cleared" })
}

module.exports = { addtoCart, updateQuantity, removeItemfromCart, getCart, clearUserCart }
