const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("select * from Users")
    .then(([users]) => {
        res.status(200).json(users);
    });
  };

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query(`select * from Users where id = ?`, [id])
    .then(([users]) => {
      if (!users) {
        return res.status(404).send("Not Found");
      }
      res.status(200).json(users[0]);
    })
};

const postUsers = (req, res) => {
  const { firstname, lastname,email, city, language } = req.body;

  database
  .query(
    "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
    [firstname, lastname,email, city, language]
  )
  .then(([result]) =>{
    res.location(`/api/users/${result.insertId}`).sendStatus(201);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error saving the users")
  });
};

module.exports = {
  getUsers,
  getUsersById,
};