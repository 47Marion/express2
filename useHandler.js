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
      res.status(200).json(users);
    })
};

module.exports = {
  getUsers,
  getUsersById,
};