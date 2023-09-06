const Joi = require("joi");
const { emailRegexp } = require("../../models/user");

const authSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});


module.exports = {authSchema} ;
