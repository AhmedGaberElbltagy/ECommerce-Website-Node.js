const express = require('express');
const router = express.Router();
const protectedRouter = require('../../Middlewares/Auth');
const {createCashOrder} = require('./order.controller');


router.post('/createCashOrder',protectedRouter,createCashOrder);



module.exports = router ;