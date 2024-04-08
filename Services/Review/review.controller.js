const response = require('../../utils/response');
const { ErrorHandler } = require('../../utils/errorHanler');
const Product = require('../Products/product.model');
const Review = require('./review.model');

const addReview = async (req, res, next) => {
    try {
        const product = await Product.findById(req.body.product);
        if (!product) {
            throw new ErrorHandler(404, "Product not found")
        }
        product.rateCount += 1;
        if (product.rateCount !== 0) {
            if (product.rateCount === 1) {
                // If it's the first rating, set rateAvg to the new rating directly
                product.rateAvg = req.body.rate;
            } else {
                // Update rateAvg based on the existing average and the new rating
                product.rateAvg = (product.rateAvg * (product.rateCount - 1) + req.body.rate) / product.rateCount;
            }
            await product.save();
        } else {
            console.error("rateCount should not be zero");
        }
        req.body.user = req.user
        let isReviewExist = await Review.findOne({ user: req.user, product: req.body.product })
        if (isReviewExist) {
            throw new ErrorHandler(409, "you are created Review before")
        }
        let review = new Review(req.body)
        await review.save()
        return response(true, 200, { review }, res)
    } catch (error) {
        next(error)
    }
}

const getAllReviews = async (req ,res ,next) => {
try {
       const AllReviews =  await Review.find()
       return response(true , 200 ,{AllReviews} , res)
} catch (error) {
    next(error)
    }
}

const updateReview = async (req, res, next) => {
    let review = await Review.findOneAndUpdate({ user: req.user, _id: req.params.id }, req.body, { new: true })
    if (!review) {
       throw new ErrorHandler( 404 , "Review not found")
    }
    return response( true , 200 , review ,res )
}

const deleteReview = async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id)
    if (!review) {
        throw new ErrorHandler( 404 , "Review not found")
     }
     return response( true , 200 , "deleted",res )
}

module.exports = {addReview , getAllReviews , updateReview , deleteReview}