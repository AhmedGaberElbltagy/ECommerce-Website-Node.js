const User = require('./user.model');
const {createToken} = require('../../Helpers/jwt');
const {ErrorHandler} = require('../../utils/errorHanler');
const response = require('../../utils/response');
const {hashPassword , comparePassword} = require('../../Helpers/bycrypt');

const signUp = async( req , res , next) => {
try {
    const user_info = req.body;
    // ensure that user not already exist 
    const isExist = await User.findOne({email : user_info.email})
    if (isExist) {
            throw new ErrorHandler(409, "user is already exist")
    };
    // hash the user password
    const hashedPassword = await hashPassword(user_info.password);
    user_info.password = hashedPassword;
    // add the user
    const createdUser = await User.create(user_info)
    // send the response
    return response(true,201,{createdUser},res)
}catch (error) {
        next(error);
      }
}

const signIn = async  (req , res ,next ) => {
try {
    const user_info = req.body;
    // check that the email is exist
    const isExist = await User.findOne({email : user_info.email})
    if (!isExist){
      throw new ErrorHandler(401, "Email not exist");
    }
    // ensure password is correct
    const isCorrectPassword = await comparePassword(user_info.password, isExist.password);
    if (!isCorrectPassword) {
      throw new ErrorHandler(401, "worng Password");
    }
    // generate a token for the user
    const token= createToken(isExist.id);
    // send the response:
    return response(true, 200, {isExist, token }, res)
}catch (error) {
    next(error)
  }
}


module.exports = {signIn,signUp}
