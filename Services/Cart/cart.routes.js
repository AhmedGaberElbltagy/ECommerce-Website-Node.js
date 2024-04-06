const express = require('express');
const router = express.Router();
const {addtoCart , getCart , updateQuantity , removeItemfromCart ,
    clearUserCart } = require('./cart.controllers');
const protectedRouter = require('../../Middlewares/Auth');
const validateSchema = require('../../Middlewares/validateSchema');
const cartSchema = require('./cart.validation');

router.get('/getCart',protectedRouter,getCart);

router.post('/addtoCart',protectedRouter,validateSchema(cartSchema.addtoCart,'body'),addtoCart);

router.delete('/removeItemFromCart/:id',protectedRouter,removeItemfromCart);

router.delete('/clearUserCart',protectedRouter,clearUserCart)
 
router.put('/updateQuantity/:id',protectedRouter,validateSchema(cartSchema.updatequantity,'body'),updateQuantity);


module.exports = router 