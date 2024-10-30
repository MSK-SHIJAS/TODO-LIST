import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import projectRoutes from './Router/projectRoutes.js';
import todoRoutes from './Router/todoRoutes.js';
import Adminreg from './Router/projectRoutes.js';
import Login from './Router/projectRoutes.js';
import { Todo } from './Model/Todo.js';


const app = express();


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/TODO')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use('/projects', projectRoutes);
app.use('/todos', todoRoutes);
app.use('/Adminreg', Adminreg);
app.use('/login', Login);

//I DID TODO HERE 
app.patch('/todos/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const { status } = req.body; 
    console.log(req.body);
    const updatedTodo = await Todo.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedTodo) {
      return res.status(404).send('Todo not found');
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.listen(4000, () => {
    console.log('Server running on port 4000');
});
