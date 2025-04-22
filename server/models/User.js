const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    require: [true, "Email is required"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    min: [4, "Password must be atleast 4 digits"],
  },
});

module.exports = mongoose.model("user", userSchema);
