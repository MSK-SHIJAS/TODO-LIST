
// models/Todo.js
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  description: { type: String},
  date: { type: Date },
  status: { type: String, enum: ['pending', 'complete'], default: 'pending' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});
export const Todo = mongoose.model('Todo', TodoSchema);
