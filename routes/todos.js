const express = require("express");
const controller = require("../controller/todos.js");

const router = express.Router();
router.get("/", controller.readTodos);
router.post("/", controller.createTodo);
router.patch("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);

module.exports = router;
