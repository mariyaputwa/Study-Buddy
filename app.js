//  Main server file for the Express.js backend. 
// Connects to MySQL via Sequelize and defines routes for managing tasks.

require('dotenv').config();

const express = require('express');
const sequelize = require('./db'); // Import sequelize instance from db.js
const Todo = require('./models/todo');
const tasksRouter = require('./server/routes/tasks'); 
const app = express();
const port = 3000;



// Parsing middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/tasks', tasksRouter);


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/todos', async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the todo.' });
  }
});

app.delete('/todos/:id', async (req, res) => {
    try {
      const todo = await Todo.findByPk(req.params.id);
      if (todo) {
        await todo.destroy();
        res.json({ message: 'Todo deleted.' });
      } else {
        res.status(404).json({ error: 'Todo not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the todo.' });
    }
});

app.patch('/todos/:id', async (req, res) => {
    try {
      const todo = await Todo.findByPk(req.params.id);
      if (todo) {
        await todo.update({ isComplete: req.body.isComplete });
        res.json(todo);
      } else {
        res.status(404).json({ error: 'Todo not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the todo.' });
    }
});

// Synchronize the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


