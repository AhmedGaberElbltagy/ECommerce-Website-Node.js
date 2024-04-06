const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    title: {
        type: String,
        unique:[true,'title already used'],
        trim:true,
        required:true,
        minLength:[2,'title is too short'],
        maxLength:[200,'title is too long']
    },
    description:{
        type:String,
        trim:true,
        required:true,
        minLength:[10,'description is too short'],
        maxLength:[500,'description is too long']
    },
    price:{
        type:Number,
        required:true,
        min: 0
    },
    quantity:{
        type: Number,
        min: 0,
        required: true,
        default: 0
    },

    sold : Number ,

    images : [String] ,
    
    imageCover:{
        type:String,
        required:false,
    },
    rateCount :{
        type:Number,
        min: 0,
        default: 0
    },
    rateAvg:{
        type:Number,
        max: 5,
        min: 0
    },
});

productSchema.virtual('productReviews',{
    ref:'review',
    localField:'_id',
    foreignField:'product'
})

const Product = mongoose.model("product",productSchema);
module.exports = Product;

