const joi = require('joi');


exports.addtoCart = joi.object({
    product: joi.string().hex().length(24).required(),
    quantity: joi.number().integer().required(),
    price: joi.number(),
})
exports.updatequantity = joi.object({
    id: joi.string().hex().length(24).required(),
    quantity: joi.number().integer().required()
})

