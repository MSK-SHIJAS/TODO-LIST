// controllers/todoController.js

import Project from "../Model/Project.js";
import { Todo } from "../Model/Todo.js";



// Add a new Todo 
export const addTodo = async (req, res) => {
  try {
    const { projectId, description, date, status } = req.body;
    console.log(req.body);
    const newTodo = await Todo.create({ projectId, description, date, status });
    await Project.findByIdAndUpdate(projectId, { $push: { todos: newTodo._id } });
    res.status(201).json({ message: 'Todo added to project successfully', todo: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding todo to project', error: error.message });
  }
};

// Update an existing Todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Todos for a specific project
export const getTodosForProject = async (req, res) => {
  const { projectId } = req.params; 
  try {
    const todos = await Todo.find({ projectId }); 
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
