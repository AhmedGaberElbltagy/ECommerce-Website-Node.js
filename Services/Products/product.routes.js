const express = require('express')
const router = express.Router();
const { addProduct , getAllProducts ,getSingleProduct,updateProduct ,deleteProduct }= require('./product.controller');
const protectedRouter = require('../../Middlewares/Auth');
const uploadFields = require('../../utils/fileUpload')



router.post('/addProduct',protectedRouter,uploadFields([{ name: 'imageCover', maxCount: 1},{ name: 'images',maxCount: 5}]) ,addProduct);

router.get('/getAllProducts',getAllProducts) ;

router.get('/getSingleProduct/:id',getSingleProduct) ;

router.put('/updateProduct/:id',updateProduct)

router.delete('/deleteProduct/:id',deleteProduct)

module.exports = router;
