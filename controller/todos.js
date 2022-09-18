import mongoose from "mongoose";
import Todo from "../models/todos.js";
import {
  openConnection,
  closeConnection,
} from "../mongo_connection/connection.js";

const readTodos = async (req, res) => {
  try {
    await openConnection();
    const todos = await Todo.find();
    closeConnection();
    res.status(200).json(todos);
  } catch (err) {
    console.log("Something wrong happen", err);
    res.status(400).json({ error: err.message });
  }
};

const createTodo = async (req, res) => {
  const todo = new Todo(req.body);
  try {
    await openConnection();
    await todo.save();
    closeConnection();
    res.status(201).json(todo);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  await openConnection();

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "invalid id" });

  const todo = { title, content, id: id };
  await Todo.findByIdAndUpdate(id, todo, { new: true });
  closeConnection();
  res.json(todo);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await openConnection();

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "invalid id" });

  await Todo.findByIdAndRemove(id);
  closeConnection();
  res.json({ message: "Todo deleted successfully" });
};

export { readTodos, createTodo, updateTodo, deleteTodo };
