const express = require("express");
require("dotenv").config();
const app = express();

const port = process.env.APP_PORT ?? 5000;

const userHandler = require("./useHandler");
//app.get("/", userHandler.getUsers);

app.get("/api/users", userHandler.getUsers);
app.get("/api/users/:id", userHandler.getUsersById);
app.post("/api/movies", userHandler.postUsers);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

