const express = require("express");
const { DBconnect } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
const { auth } = require("./middleware/auth");
const { todolistRouter } = require("./routes/todolistRoute");
require("dotenv").config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);

app.use(auth);

app.use("/todolist", todolistRouter);

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log("server is not running");
    return;
  }
  DBconnect();
  console.log("server is running ", process.env.PORT);
});
