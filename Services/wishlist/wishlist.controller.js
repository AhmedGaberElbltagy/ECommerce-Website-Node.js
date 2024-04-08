const User = require('../users/user.model');
const { ErrorHandler } = require('../../utils/errorHanler')
const response = require('../../utils/response')


const addtoWishlist = async (req, res, next) => {
    try {
        let wishList = await User.findByIdAndUpdate(req.user,
            { $addToSet: { wishList: req.body.product } }, { new: true }).populate('wishList')
        if (!wishList) {
            throw new ErrorHandler(404, " not found")
        }
        return response(true, 200, { wishList: wishList.wishList }, res)
    } catch (error) {
        next(error)
    }
}

const removeFromWishList = async (req, res, next) => {
    try {
        let wishList = await User.findByIdAndUpdate(req.user,
            { $pull: { wishList: req.params.id } }, { new: true }).populate('wishList')
        if (!wishList) {
            throw new ErrorHandler(404, " wishList not found")
        }
        return response(true, 200, { wishList: wishList.wishList }, res)
    } catch (error) {
        next(error)
    }
}

const getLoggedWishList = async (req, res, next) => {
    try {
        let { wishList } = await User.findById(req.user).populate('wishList')
        if (!wishList) {
            throw new ErrorHandler(404, " not found")
        }
        return response(true, 200, { wishList }, res)
    } catch (error) {
        next(error)
    }
}






module.exports = { addtoWishlist, removeFromWishList, getLoggedWishList }