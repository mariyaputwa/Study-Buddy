// Establishes connection to MySQL database using Sequelize.

const Sequelize = require('sequelize');

const db = new Sequelize('database_development', 'root', 'julammasi123', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

// Test the connection
db
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  module.exports = db;