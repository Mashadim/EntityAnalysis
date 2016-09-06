'use strict';

const Joi = require('joi');

const UserLoginSchema = Joi.alternatives().try(
	Joi.object({
		username: Joi.string().alphanum().min(2).max(30).required(),
		password: Joi.string().required
	}),
	Joi.Object({
		email: Joi.string().email.required(),
		password: Joi.string().required()
	})
);

module.exports = UserLoginSchema;