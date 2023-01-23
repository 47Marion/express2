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

const putUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname,email, city, language } = req.body;
  database
  .query(
    "update uesers set firstname = ?, lastname = ?, email = ?, city = ?, language = ?",
    [firstname, lastname, email, city, language, id]
  )
   .then(([result]) =>{
      if (result.affectedRows === 0){
        res.status(404).send("Not Found");
      } else {
       res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.log.error(err);
      res.status(500).send("Error editing the users");
    });
  };

  const deleteUsers = (req, res) => {
    const id = parseInt(req.params.id);

    database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the movie");
    });
  };

module.exports = {
  getUsers,
  getUsersById,
  postUsers,
  putUsers,
  deleteUsers,
};