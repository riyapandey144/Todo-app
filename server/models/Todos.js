const { mongoose, Schema } = require("mongoose");

const todoSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    rel: "user",
  },
  title: {
    type: String,
    require: [true, "Title can't be empty"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("todo", todoSchema);
