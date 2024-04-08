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

const getAllProducts = async (req, res, next) => {
    try {
        const Products = await Product.find().populate('productReviews');
        if (!Products) {
            throw new ErrorHandler(404, "Products not found")
        }
        const productsWithReviews = Products.map(product => {
            return {
                product,
                reviews: product.productReviews.map(review => ({
                    review
                }))
            };
        });
        return response(true, 200, { productsWithReviews }, res)
    } catch (error) {
        next(error)
    }
}

const getSingleProduct =async (req ,res ,next) => {
try{
    const productId = req.params.id;
    const product = await Product.findById(productId).populate('productReviews');
    
    if (!product) {
        throw new ErrorHandler(404, "not found")
    }
    const reviews = product.productReviews
    return response( true , 200 , {product,reviews} , res )
} catch (error) {
    next(error)
}
}
const updateProduct = async ( req , res , next) => {
try {
    const productId = req.params.id;
    const product = await Product.findById( productId)
    if (!product) {
        throw new ErrorHandler( 404 , "not found")
    }
    if (req.file) {
        let publicId = product.imageCover.split('/').pop().split('.')[0]
        await cloudinaryConfig().uploader.destroy(publicId, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });

        let image = await cloudinaryConfig().uploader.upload(req.file.path, {
            folder: 'Ecommerce/product'
        })
        req.body.imageCover = image.url
    }
    let updatedproduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updateProduct) {
        throw new ErrorHandler(409 , " failed to update")
    }
    return response( true , 200 , { updatedproduct } , res )
}catch (error) {
    next(error)
}
}

const deleteProduct = async ( req , res , next ) => {
try {
     const productId = req.params.id 
     const product = await Product.findById(productId)
     if (!product) {
        throw new ErrorHandler(404 , "product not found")
     } 
        let publicId = product.imageCover.split('/').pop().split('.')[0]
        await cloudinaryConfig().uploader.destroy(publicId, async (err, result) => {
        if (err) {
            console.error(err);
            throw new ErrorHandler(500, "Failed to delete image from Cloudinary");
        } else {
            console.log(result);
            await Product.deleteOne({ _id: productId });
            return response( true , 200 , "deleted", res)
        }
    });
    

}catch (error) {
    next(error)
}
}


module.exports = { addProduct , getAllProducts , getSingleProduct , updateProduct , deleteProduct}