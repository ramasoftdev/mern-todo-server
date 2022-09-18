const express = require("express");
const serverless = require("serverless-http");
const todosRouter = require("../routes/todos.js");
const cors = require("cors");
const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const router = todosRouter;
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
