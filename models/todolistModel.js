const mongoose = require("mongoose");

const todolistSchema = new mongoose.Schema({
  todoName: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
});
const TodolistModel = mongoose.model("todolist", todolistSchema);

module.exports = { TodolistModel };
