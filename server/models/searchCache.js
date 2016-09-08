'use strict';

const Sequelize = require('sequelize');
const sequelizeConfig = require('../../config/database.config.js');

const SearchCache = sequelizeConfig.define('searchcache', {
	searchInput: { type: Sequelize.STRING(3000), unique: true },
	entities: { type: Sequelize.JSONB },
	entitiesText: Sequelize.STRING(1000)
});

module.exports = SearchCache;