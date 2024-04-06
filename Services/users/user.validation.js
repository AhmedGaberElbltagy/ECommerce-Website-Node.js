const joi = require('joi');


exports.signUpValidation = joi.object({
    name: joi.string().min(2).max(100).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(/^[A-z][a-z0-9@#]{8,40}$/).required(),
})

exports.signInValidation = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required(),
})

