const jwt = require('jsonwebtoken'); 

exports.createToken = (payload) => {
    try {
        const token = jwt.sign(payload,process.env.JWT_SECRET)
        return token;
    } catch (err) {
        console.log(err);
    }
}
exports.checkToken = (token)=>{
    try {
        const checkingResult = jwt.verify(token,process.env.JWT_SECRET);
        return checkingResult;
    }catch(err){
        console.log(err);
    }
};