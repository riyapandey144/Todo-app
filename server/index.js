const express = require("express");
const app = express();
const cors = require("cors");
const ErrorMiddleware = require("./middlewares/error.js");
const isAuth = require("./middlewares/isAuthenticate.js");

const port = 5500;

// config:
require("dotenv").config();
require("./config/db.js");

const corsOptions = {
  origin: "https://todo-app-1-orm6.onrender.com",
  method: ["GET", "POST", "PUT", "DELETE"],
};

// Middlewares:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/user", require("./router/user.js"));
app.use("/todos", isAuth, require("./router/todos.js"));

app.get("*", (req, res) => {
  res.json({
    success: false,
    method: "Get",
    msg: "404 Page Not Found",
  });
});

app.post("*", (req, res) => {
  res.json({
    success: false,
    method: "Post",
    msg: "404 Page Not Found",
  });
});

app.listen(port, () => {
  console.log("Server is listening on port", port);
});

app.use(ErrorMiddleware);
