import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import todosRouter from "./routes/todos.js";
const app = express();
dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/todos", todosRouter);

const mongodb = process.env.MONGODB.replace("$usrName", process.env.USR_NAME)
  .replace("$usrPass", process.env.USR_PASS)
  .replace("$dbName", process.env.DB_NAME);

app.get("/", (req, res) => {
  res.send("Welcome to server!");
});

const PORT = process.env.PORT || 5001;

mongoose
  .connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB, sever is running on port " + PORT);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
