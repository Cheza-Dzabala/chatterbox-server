const Joi = require("joi");
const { validationStrings } = require("../strings/response_strings");

const emailRegexPattern = /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

const _loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": validationStrings.emailRequired,
  }),
  password: Joi.string().required().messages({
    "any.required": validationStrings.passwordRequired,
  }),
});

const _registrationSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": validationStrings.usernameRequired,
  }),
  email: Joi.string().required().messages({
    "any.required": validationStrings.emailRequired,
  }),
  username: Joi.string().required().messages({
    "any.required": validationStrings.usernameRequired,
  }),
  password: Joi.string().required().messages({
    "any.required": validationStrings.passwordRequired,
  }),
  confirm_password: Joi.string().required().messages({
    "any.required": validationStrings.passwordConfirmationRequired,
  }),
});

module.exports = {
  loginSchema: _loginSchema,
  registrationSchema: _registrationSchema,
};
