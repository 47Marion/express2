const express = require("express");
require("dotenv").config();
const app = express();

const port = process.env.APP_PORT ?? 5000;

const userHandler = require("./useHandler");
app.get("/api/users", userHandler.getUsers);
app.get("/api/users/:id", userHandler.getUsersByID);


app.listen(port, () => {
  console.log("server is runing");
});

