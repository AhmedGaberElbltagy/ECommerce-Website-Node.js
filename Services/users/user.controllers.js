const User = require('./user.model');
const {createToken} = require('../../Helpers/jwt');



const signUp = async(req,res) => {
    
    const userinfo = req.body;
    const createdUser = await User.create(userinfo);
    res.json({message:"done",createdUser});
}

const signIn = async  (req , res ,next ) => {
try {
        const userinfo = req.body ;
        const isExist = await User.findOne({email:userinfo.email});
        if(isExist){
            const token = createToken(isExist.id);
            res.json({message:"successfully",token})
    }
} catch (error) {
    next (error);
    }
}


module.exports = {signIn,signUp}
