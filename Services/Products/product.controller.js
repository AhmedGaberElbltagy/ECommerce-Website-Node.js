const Product = require('./product.model');
const { cloudinaryConfig } = require('../../utils/cloudinaryConfig');
const { ErrorHandler } = require('../../utils/errorHanler');
const response = require('../../utils/response')

const addProduct = async (req, res, next) => {
    try {
        if (!req.files || !req.files.images) {
            throw new ErrorHandler(401, 'No images uploaded');
        }
        const coverImageResult = await cloudinaryConfig().uploader.upload(req.files.imageCover[0].path, {
            folder: 'Ecommerce/product/coverimage',
        });
        const uploadPromises = []; // array of images
        for (const file of req.files.images) {
            const result = await cloudinaryConfig().uploader.upload(file.path, {
                folder: 'Ecommerce/product/images',
            });
            uploadPromises.push(result.url);
        }
        const images = await Promise.all(uploadPromises);
        req.body.imageCover = coverImageResult.url;
        req.body.images = images;
        let product = new Product(req.body)
        await product.save();
        return response(true ,200 ,{product} ,res)
    } catch (error) {
        next(error)
    }
}

const getAllProducts = async ( req , res , next) => {
    try {
        const Products = await Product.find();
        if (!Products) {
            throw new ErrorHandler(404 ,"Products not found")
        }
        return response(true ,200 ,{Products} ,res)
    } catch (error) {
        next(error)
    }
}


module.exports = {addProduct,getAllProducts}