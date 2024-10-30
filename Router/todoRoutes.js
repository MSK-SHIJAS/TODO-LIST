// routes/todoRoutes.js
import express from 'express';
import { addTodo, deleteTodo, getTodosForProject, updateTodo } from '../Controller/todoController.js';


const router = express.Router();

router.get('/get', getTodosForProject); 
router.post('/:projectId/todo', addTodo);
router.put('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);


export default router;
