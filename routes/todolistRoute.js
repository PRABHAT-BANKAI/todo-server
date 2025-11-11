const express = require("express");
const { TodolistModel } = require("../models/todolistModel");

const todolistRouter = express.Router();

/* ------------------- CREATE ------------------- */
// Add a new todo
todolistRouter.post("/", async (req, res) => {
  const { authorId, todoName } = req.body;
  try {
    if (!todoName || !authorId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTodo = await TodolistModel.create({ authorId, todoName });
    return res.status(201).json({
      message: "Task added successfully",
      todo: newTodo,
    });
  } catch (error) {
    console.error("Error adding todo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/* ------------------- READ ------------------- */
// Get all todos for the logged-in user
todolistRouter.get("/", async (req, res) => {
  const { authorId } = req.body; // Or get from token middleware
  try {
    const todolistData = await TodolistModel.find({ authorId });
    return res.status(200).json({ message: todolistData });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/* ------------------- UPDATE ------------------- */
// Update a todo by ID
todolistRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { authorId, todoName, completed } = req.body;

  try {
    const todo = await TodolistModel.findOne({ _id: id, authorId });
    if (!todo) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    if (todoName !== undefined) todo.todoName = todoName;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();

    return res.status(200).json({
      message: "Task updated successfully",
      todo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/* ------------------- DELETE ------------------- */
// Delete a todo by ID
todolistRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { authorId } = req.body;
  console.log(id)
  console.log(authorId)

  try {
    const todo = await TodolistModel.findOneAndDelete({ _id: id, authorId });

    if (!todo) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { todolistRouter };
