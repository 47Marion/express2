const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.APP_PORT ?? 5000;
const userHandler = require("./useHandler");

const validators = require("./validators");
//app.get("/", userHandler.getUsers);
const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");

/*const isItDwight = (req, res) => {
  if (req.body.email === "dwight@theoffice.com" && req.body.password === "123456"){
    res.send("Credentials are valid");
  } else {
    res.sendStatus(401);
  }
};*/

app.use(express.json());

//Route public
app.get("/api/users", userHandler.getUsers);
app.get("/api/users/:id", userHandler.getUsersById);

app.post("/api/login", userHandler.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

//Route protect
app.use(verifyToken);

app.post("/api/users", verifyToken, validators.validator, hashPassword, userHandler.postUsers);
app.put("/api/users/:id", verifyToken, validators.validator, hashPassword, userHandler.putUsers);
app.delete("/api/users/:id", verifyToken, userHandler.deleteUsers);

//app.put("/api/users/:id", hashPassword, userHandler.updateUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

