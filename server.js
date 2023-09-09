const app = require("./app");
const mongoose = require("mongoose");
require('dotenv').config();

const DB_HOST =
  "mongodb+srv://Oleksii:Jhhnj4ucuaCzDOaX@cluster0.kdaqbul.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000.");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
