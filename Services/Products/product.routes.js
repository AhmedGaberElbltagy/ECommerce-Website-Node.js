const express = require('express')
const router = express.Router();
const {addProduct ,getAllProducts }= require('./product.controller');
const protectedRouter = require('../../Middlewares/Auth');
const uploadFields = require('../../utils/fileUpload')



router.post('/addProduct',protectedRouter,uploadFields([{ name: 'imageCover', maxCount: 1},{ name: 'images',maxCount: 5}]) ,addProduct);

router.get('/getAllProducts',getAllProducts)

module.exports = router;
