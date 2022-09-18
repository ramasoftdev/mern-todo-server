const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongodb = process.env.MONGODB.replace("$usrName", process.env.USR_NAME)
  .replace("$usrPass", process.env.USR_PASS)
  .replace("$dbName", process.env.DB_NAME);

const openConnection = async () => {
  await mongoose
    .connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

const closeConnection = () => {
  mongoose
    .disconnect()
    .then(() => {
      console.log("Disconnected from MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

export { openConnection, closeConnection };
