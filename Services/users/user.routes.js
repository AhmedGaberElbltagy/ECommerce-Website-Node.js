const router = require("express").Router();
const {signIn,signUp} = require("./user.controllers");



router.post('/signIn',signIn);

router.post('/signUp',signUp);



module.exports = router ;