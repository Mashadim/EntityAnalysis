'use strict';
const bcrypt = require('bcrypt-nodejs');
const hashPassword = require('../util/hashPassword');
const Boom = require('boom');
const User = require('../models/User');
const CreateUserSchema = require('../joiSchemas/createUser');
const verifyIfUniqueUser = require('../util/userFunc').verifyIfUniqueUser;
const createToken = require('../util/createToken');

module.exports = {
	method: 'POST',
	path: '/signup',
	config: {
		// verify user unique before handler runs
		pre: [
			{ 
				method: verifyIfUniqueUser 
			}
		],
		handler: (request, reply) => {
			console.log('in createUser', request.payload)
			var user = {
				email: request.payload.email,
				username: request.payload.username,
			};
			
			hashPassword(request.payload.password, (err, hash) => {
				if(err) { throw Boom.badRequest(err) };
				
				user.password = hash;
				
				User.sync()
					.then(() => {
						return User.create({
							email,
							username,
							password
						})
					})
					.then(() => reply({
						auth_token: createToken(user) // issues JWT token on successful user creation.
					})).code(201)
					.catch(err => reply({
						result: `ERROR in '/dbsave/textorurlsearch' path via server: ${err}`
					}))
			})
		},
		validate: {
			payload: CreateUserSchema;
		}
	}
};