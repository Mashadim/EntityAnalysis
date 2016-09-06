'use strict';

const Sequelize = require('sequelize');
const sequelizeConfig = require('./database.config.js');

const User = sequelizeConfig.define('user', {
	email: { type: Sequelize.STRING(), unique: true, validate: { isEmail: true } },
	username: { type: Sequelize.STRING(), unique: true },
	password: { type: Sequelize.STRING() },
});

module.exports = User;