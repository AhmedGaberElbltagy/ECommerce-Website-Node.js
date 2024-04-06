const express = require('express');
const app = express();
const Connection = require('./Database/connection');
app.use(express.json());
Connection();


const dotenv = require('dotenv');
dotenv.config() ;



const userRoutes = require('./Services/users/user.routes');
app.use(userRoutes);
const productRoutes = require('./Services/Products/product.routes');
app.use(productRoutes);
const cartRoutes = require('./Services/Cart/cart.routes');
app.use(cartRoutes);
const orderRoutes = require('./Services/Order/order.routes');
app.use(orderRoutes);



app.listen(3000,()=>{
    console.log(`Server is Listening on Port ${process.env.PORT} `);
})
//set CLOUDINARY_URL=cloudinary://214723445242532:PnroVBZYTLc-x5Kbemacu29NDTo@ddqoqjwcf

