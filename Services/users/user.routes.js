const router = require("express").Router();
const {signIn,signUp} = require("./user.controllers");
const  validateSchema  = require('../../Middlewares/validateSchema');
const userSchema = require('./user.validation')


router.post('/signIn',validateSchema(userSchema.signInValidation,'body'),signIn);

router.post('/signUp',validateSchema(userSchema.signUpValidation,'body'),signUp);



module.exports = router ;