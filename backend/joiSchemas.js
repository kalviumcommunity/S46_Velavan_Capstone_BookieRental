const joi = require('joi');

const joiUser = joi.object({
    name : joi.string().min(3).max(25).required(),
    email : joi.string().email().required(),
    password : joi.string().min(6).max(16).required()
})

const joiBooks = joi.object({
    title : joi.string().required(),
    author : joi.string().required(),
    description : joi.string().required(),
    status : joi.string().required(),
    rent : joi.string(),
    price : joi.number()
})

module.exports = { joiUser, joiBooks };