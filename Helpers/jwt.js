const jwt = require('jsonwebtoken'); 

exports.createToken = (payload) => {
    try {
        const token = jwt.sign(payload,"ahmed")
        return token;
    } catch (err) {
        console.log(err);
    }
}
exports.checkToken = (token)=>{
    try {
        const checkingResult = jwt.verify(token,"ahmed");
        return checkingResult;
    }catch(err){
        console.log(err);
    }
};