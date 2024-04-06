const jwt = require('jsonwebtoken');
const {checkToken} = require('../Helpers/jwt');  
const {ErrorHandler} = require('../utils/errorHanler');



const protectedRouter = (req,res,next) => {
    try {
        const barearToken = req.headers.authorization ;
        // console.log(barearToken);
        if(!barearToken){
            throw new ErrorHandler(401,"Not Authenticated");
        }   
        else{
            let spliced = barearToken.split(" ");
            // console.log(spliced);
            splicedToken = spliced[1];
            // console.log(splicedToken);
            let decoded_token = checkToken(splicedToken);
            // console.log(decoded_token);
            req.user = decoded_token;
            return next();
        }       
    } catch (error) {
        next(error)
    }
}    
module.exports = protectedRouter ; 
