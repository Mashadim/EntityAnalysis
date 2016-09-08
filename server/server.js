'use strict';

const Hapi = require('hapi');
const http = require('https');
const handlebars = require('handlebars');
const inert = require('inert');
const vision = require('vision');
const hapi_cors = require('hapi-cors');
const Boom = require('boom');
const glob = require('glob');
const path = require('path');
const secret = require('../config/config');
const jwtAuth = require('hapi-auth-jwt');

const url = require('url');
const AYLIENTextAPI = require('../config/aylien.config');

const Sequelize = require('sequelize');
const sequelizeConfig = require('../config/database.config');
const SearchCache = require('./models/SearchCache');

const version = require('../package.json').version;
const author = require('../package.json').author;
const Log = require('log');
const log = new Log();
const port = 3000;

// New Hapi Server
const server = new Hapi.Server();

// Hapi plugins
// when I include the glob here I get an error***
const plugins = [ inert, vision, jwtAuth ];

// server settings
server.connection({
  host: 'localhost',
  port: process.env.PORT || port,
	routes: {
		cors: true
	}
});

server.register(plugins,(err) => {
	if(err) console.log(err);
	
	// name and scheme called 'jwt'
	// setting third 'required' option means every route must have a token
	server.auth.strategy('jwt', 'jwt', {
		key: secret,
		verifyOptionts: { algorithms: ['HS256'] }
	});
	
	server.views({
		engines: { html: handlebars },
		relativeTo: __dirname,
		path: '../dist'
	});
	
	// creates a route for every file in the routes folder
	// doesn't work***
	glob.sync('./routes/*.js', {
		root: __dirname
	}).forEach(file => {
		const route = require(path.join(__dirname, file));
		server.route(route);
	});
	
	server.route([
		{
			method: 'GET',
			path: '/',
			config: {
				handler: (request, reply) => {
					reply.view('index');
				}
			}
		},
		{
			method: 'GET',
			path: '/style.css',
			handler: (request, reply) => {
				reply.file('./client/style.css')
			}
		},
		{
			method: 'GET',
			path: '/{param*}',
			handler: {
				directory: { path: 'dist'}
			}
		},
		{
			method: 'GET',
			path: '/entities/api',
			handler: (request, reply) => {
				const inputType = Object.keys(request.query)[0];
				const searchInput = request.query[inputType];
				const getEntitiesObj = {};
				
				getEntitiesObj[inputType] = searchInput;
				
				AYLIENTextAPI.entities(getEntitiesObj, function(error, response) {
					if (error === null) {
						reply(response);
					}
				});
			}
		},
		{ // acquires entities based on previous search
			method: 'GET',
			path: '/entities/db',
			handler: (request, reply) => {
				const searchInput = request.query['search'];
				
				SearchCache.findAll({
					attributes: ['entities', 'entitiesText'],
					where: { searchInput }
				})
					.then((entitiesData) => {
						const entities = entitiesData[0].dataValues.entities;
						const entitiesText = entitiesData[0].dataValues.entitiesText;
					
						reply({
							result: 'success',
							entities,
							entitiesText
						})
					})
					.catch(err => {
						reply({
							result: `ERROR in '/entities/db' path via server: ${err}`
						})
					})
			}
		},
		{ // acquire articles that match an entity search
			method: 'GET',
			path: '/entities/dbmatch',
			handler: (request, reply) => {
				console.log('IN findEntityMatch')
				const search = request.query['search'];
				var articlesFound = [];
				
				SearchCache.findAll({
					attributes: ['searchInput', 'entities', 'entitiesText'],
				})
					.then((data) => {
						data.forEach((obj) => {
							const article = obj.dataValues;
							const entities = obj.dataValues.entities;
							var searchExists = false;
							
							for(var prop in entities) {
								searchExists = entities[prop].some((entity) => {
									return entity.toLowerCase() === search.toLowerCase();
								});

								if(searchExists) {
									articlesFound.push(article);
									return;
								}
							};
						});
						
						if(articlesFound.length) {
							reply({
								result: 'success',
								articlesFound
							})
						}else {
							reply({ result: 'No articles found' })
						}
					});
			}
		},
		{
			method: 'POST',
			path: '/dbsave',
			handler: (request, reply) => {
				const searchInput = request.payload.search;
				const entitiesText = request.payload.entitiesText;
				const entities = request.payload.entities;

				SearchCache.sync()
					.then(() => {
						return SearchCache.create({
							searchInput,
							entities,
							entitiesText
						})
					})
					.then(() => reply({
						result: 'success'
					}))
					.catch(err => reply({
						result: `ERROR in '/dbsave/textorurlsearch' path via server: ${err}`
					}))
			}
		},
		
	])		
});

server.start((err) => {
  if (err) throw err; // check if there is an error starting our server

  log.info(`NODE_ENV: ${process.env.NODE_ENV}`);
  log.info(`Version ${version} by ${author} running on port ${server.info.uri}`);
});
