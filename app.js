const express = require("express");
const database = require("./database");
const port = 5000;

const app = express();

const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([users]) => {
      res.status(200).json(users);
    })
};

app.get("/api/users", getUsers);

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user.id === id)
    if(!user){
        return res.status(404).send("Not Found")
    }
    res.json(user)
});

app.listen(port, () => {
  console.log("server is runing");
});

