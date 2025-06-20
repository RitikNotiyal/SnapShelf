const joi = require('joi');

const registerSchema = joi.object({
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
    .max(15)
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/))
    .required(),
})

const loginSchema = joi.object({
email: joi.string()
    .email()
    .lowercase()
    .required(),
password: joi.string()
    .min(6)
    .max(15)
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/))
    .required(),
})

module.exports = {
registerSchema,
loginSchema
};