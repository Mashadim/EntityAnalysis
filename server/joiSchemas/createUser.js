'use strict';

const Joi = require('joi');

const CreateUserSchema = Joi.object({
	email: Joi.string().email().required(),
	username: Joi.string().alphanum().min(2).max(30).required(),
	password: Joi.string().required()
});

module.exports = CreateUserSchema;