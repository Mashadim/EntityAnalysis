'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../../../config');

function createToken(user) {
	console.log('in createToken', user)
	return jwt.sign({
		id: user.id,
		username: user.username
	}, secret, {
		algorithm: 'HS256',
		expiresIn: '1h'
	});
};

module.exports = createToken;