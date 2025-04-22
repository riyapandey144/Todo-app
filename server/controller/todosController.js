const ErrorHandler = require("../utils/ErrorHandler");
const Todo = require("../models/Todos");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { sendResponse } = require("../utils/sendResponse");

const addTodo = catchAsyncError(async (req, res, next) => {
  const { title, description = "default" } = req.body;

  if (!title || !description)
    return next(new ErrorHandler("Please add all fields", 401));

  let todo = await Todo.create({
    userId: req.user._id,
    title,
    description,
  });

  sendResponse(res, 201, true, "New todo added Successfully", todo);
});

const getAllTodos = catchAsyncError(async (req, res, next) => {
  let todos = await Todo.find({ userId: req.user._id.toString() });
  sendResponse(
    res,
    200,
    true,
    "All todos are fetched Successfully",
    todos.reverse()
  );
});

const updateTodo = catchAsyncError(async (req, res, next) => {
  const { title, description } = req.body;

  const todoId = req.params.id;

  const updatedTodo = await Todo.updateOne(
    { _id: todoId },
    { $set: { title: title, description: description } }
  );

  if (updatedTodo.matchedCount === 0) {
    return next(new ErrorHandler("Todo not found", 404));
  }
  sendResponse(res, 200, true, "Todo updated successfully");
});

const deleteTodo = catchAsyncError(async (req, res, next) => {
  const todoId = req.params.id;

  const deletedTodo = await Todo.deleteOne({ _id: todoId });

  if (deletedTodo.deletedCount === 0)
    return next(new ErrorHandler("Todo not found", 404));

  sendResponse(res, 200, true, "Todo deleted successfully");
});

const isCompleted = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  const todo = await Todo.findOne({ _id: id });

  if (!todo) return next(new ErrorHandler("Todo not found", 404));

  todo.completed = !todo.completed;
  await todo.save();

  sendResponse(res, 200, true, "Todo updated successfully", todo);
});

const clearCompleted = catchAsyncError(async (req, res, next) => {
  const deletedTodo = await Todo.deleteMany({
    userId: req.user._id.toString(),
    completed: true,
  });

  if (deletedTodo.deletedCount === 0)
    return next(new ErrorHandler("Zero Todo Completed", 404));

  const remainingTodos = await Todo.find({ userId: req.user._id.toString() });
  sendResponse(
    res,
    200,
    true,
    "Todo deleted successfully",
    remainingTodos.reverse()
  );
});

module.exports = {
  addTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
  isCompleted,
  clearCompleted,
};
