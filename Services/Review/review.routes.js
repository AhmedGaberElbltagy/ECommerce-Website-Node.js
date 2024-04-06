const router = require('express').Router();
const {addReview,getAllReviews} = require('./review.controller');
const protectedRouter = require('../../Middlewares/Auth');



router.post('/addReview',protectedRouter,addReview);

router.get('/allReviews',getAllReviews)

module.exports = router 
