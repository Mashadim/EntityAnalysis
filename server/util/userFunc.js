'use strict';

const Boom = require('boom');
const Sequelize = require('sequelize');
const User = require('../models/User');

function verifyIfCurrentUser(request, reply) {
	console.log('in verifyIfCurrentUser', request.payload)
	const password = request.payload.password;
	
	User.find({
		where: Sequelize.or({ username: request.payload.username }, { email: request.payload.email })
	})
		.then((user) => {
			bcrypt.compare(password, user.password, (err, isValid) => {
				if(isValid) {
					reply(user);
				}else {
					reply(Boom.badRequest('Incorrect password'));
				}
			})
		})
		.catch(err => {
			reply(Boom.badRequest('Incorrect username or email'));
		})
}

function verifyIfUniqueUser(request, reply) {
		console.log('in verifyIfUniqueUser', request.payload)
	// find matching email/username in database
	User.find({ // or findAll?
		where: Sequelize.or({ username: request.payload.username }, { email: request.payload.email })
	})
		.then((user) => {	
		console.log('user', user)
			if(user.username === request.payload.username) {
			 reply(Boom.badRequest('Username taken'));
			}
		
			if(user.email === request.payload.email) {
				reply(Boom.badRequest('Email taken'));
			}
		
			// if indeed a new user continue to route
			reply(request.payload);
		});
};

module.exports = { 
	verifyIfCurrentUser,
	verifyIfUniqueUser
};