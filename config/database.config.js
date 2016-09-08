const Sequelize = require('sequelize');
const sequelize = new Sequelize('entitydb', 'YOUR_USERNAME', 'YOUR_PASSWORD', {
	host: 'localhost',
	dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize;