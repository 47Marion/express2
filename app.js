const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.APP_PORT ?? 5000;
const userHandler = require("./useHandler");

const validators = require("./validators");
//app.get("/", userHandler.getUsers);
const { hashPassword } = require("./auth.js");
app.use(express.json());

app.get("/api/users", userHandler.getUsers);
app.get("/api/users/:id", userHandler.getUsersById);
app.delete("/api/users/:id", userHandler.deleteUsers);
app.post("/api/users", validators.validator, hashPassword, userHandler.postUsers);
app.put("/api/users/:id", validators.validator, hashPassword, userHandler.putUsers);

//app.put("/api/users/:id", hashPassword, userHandler.updateUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

