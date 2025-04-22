const mongoose = require("mongoose");


const url = process.env.DB_URL || "mongodb://localhost:5500"

mongoose
.connect(url + "/todo")
  .then(() => {
    console.log("db connection working");
  })
  .catch((err) => {
    console.log("Db Error :", err);
  });
