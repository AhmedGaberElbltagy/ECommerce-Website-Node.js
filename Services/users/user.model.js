const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
        name:{
                type:String,
                required:true,
                trim:true,
                minLength:[3,'name is too short'],
                maxLength:[20,'name is too long']
            },
            email:{
                type:String,
                required:true,
                trim:true,
            },
            password:{
                type:String,
                required:true,
            },
            wishList : [{
                type:mongoose.Types.ObjectId,
                ref:'product'
            }],
       
});

const User = mongoose.model("user",userSchema);

module.exports = User;