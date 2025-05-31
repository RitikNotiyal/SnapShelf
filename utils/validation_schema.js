const joi = require('joi');

const authSchema = joi.object({
    email: joi.string()
        .email()
        .lowercase()
        .required(),
    fullname: joi.string()
        .min(3)
        .max(30)
        .required(),
    password: joi.string()
        .min(6)
        .max(8)
        .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/))
        .required(),
})

module.exports = {
    authSchema
};