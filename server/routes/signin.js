'use strict';

const Boom = require('boom');
const User = require('../models/User');
const UserLoginSchema = require('../joiSchemas/userLogin');
const verifyIfCurrentUser = require('../util/userfunc').verifyIfCurrentUser;
const createToken = require('../util/createToken');

module.exports = {
	method: 'POST',
	path: '/signin',
	config: {
		pre: [
			{ method: verifyIfCurrentUser, assign: 'user' }
		],
		handler: (request, reply) => {
				console.log('in currentUser', request.pre.user)
			reply({ auth_token: createToken(request.pre.user )}).code201
		},
		validate: {
			payload: UserLoginSchema
		}
	}
};