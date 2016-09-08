const AYLIENTextAPI = require('aylien_textapi');

const textapi = new AYLIENTextAPI({
	application_id: 'YOUR_API_ID',
	application_key: 'YOUR_API_KEY'
});

module.exports = textapi;