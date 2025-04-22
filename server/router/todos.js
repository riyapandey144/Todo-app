const express = require("express");
const router = express.Router();
const {
  addTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
  isCompleted,
  clearCompleted,
} = require("../controller/todosController");

router.get("/getAllTodos", getAllTodos);

router.post("/addTodos", addTodo);

router.put("/updateTodo/:id", updateTodo);

router.delete("/deleteTodo/:id", deleteTodo);

router.put("/isCompleted/:id", isCompleted);

router.delete("/clearCompleted", clearCompleted);

module.exports = router;
