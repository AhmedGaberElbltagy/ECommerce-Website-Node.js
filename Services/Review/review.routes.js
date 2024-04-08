const router = require('express').Router();
const { addReview , getAllReviews , updateReview , deleteReview} = require('./review.controller');
const protectedRouter = require('../../Middlewares/Auth');



router.post('/addReview',protectedRouter,addReview);

router.get('/allReviews',getAllReviews);

router.put('/updateReview/:id', protectedRouter , updateReview)

router.delete('/deleteReview/:id', protectedRouter , deleteReview)

module.exports = router 
