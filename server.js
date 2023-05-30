require('dotenv').config();

const express = require('express');
const connectDatabase = require('./db');
const app = express();
const port = 3000;

const sequelize = connectDatabase();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const Todo = require('./models/todo'); // Adjust the path based on the location of your model files

// ...

// Synchronize the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

// ...

