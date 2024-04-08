

const router = require('express').Router();
const {addtoWishlist , removeFromWishList , getLoggedWishList} = require('./wishlist.controller');
const protectedRouter = require('../../Middlewares/Auth')




router.post('/addtoWishlist',protectedRouter,addtoWishlist) ,

router.delete('/removeFromWishList/:id', removeFromWishList)

router.get('/getLoggedWishList', protectedRouter ,getLoggedWishList)


module.exports = router