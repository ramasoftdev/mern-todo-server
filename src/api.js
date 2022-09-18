const express = require("express");
const serverless = require("serverless-http");
const todosRouter = require("../routes/todos.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

console.log(process.env)
console.log(`process.env.MONGODB: ${process.env.MONGODB}`)
console.log(`process.env.USR_PASS: ${process.env.USR_PASS}`)
console.log(`process.env.USR_NAME: ${process.env.USR_NAME}`)

const mongodb = process.env.MONGODB.replace("$usrName", process.env.USR_NAME)
  .replace("$usrPass", process.env.USR_PASS)
  .replace("$dbName", process.env.DB_NAME);

mongoose
  .connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const router = todosRouter;
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
