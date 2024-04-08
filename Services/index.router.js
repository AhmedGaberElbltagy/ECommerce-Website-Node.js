const userRoutes = require('./users/user.routes');
const productRoutes = require('./Products/product.routes');
const cartRoutes = require('./Cart/cart.routes');
const orderRoutes = require('./Order/order.routes');
const reviewRoutes = require('./Review/review.routes');
const wishListRoutes = require('./wishlist/wishlist.routes');



module.exports = bootstrab = (app) => {
    app.use('/api/v1/wishList', wishListRoutes)
    app.use('/api/v1/Products', productRoutes);
    app.use('/api/v1/users',userRoutes);
    app.use('/api/v1/Orders', orderRoutes);
    app.use('/api/v1/Carts', cartRoutes);
    app.use('/api/v1/Reviews', reviewRoutes)

}


