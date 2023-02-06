const database = require("./database");

const getUsers = (req, res) => {
  const initialSql = "select * from users";
  const where = [];

  if(req.query.language != null){
    where.push({
      column: "language",
      value: req.query.language,
      operator: "=",
    });
  } if(req.query.city != null){
    where.push({
      column: "city",
      value: req.query.city,
      operator: "=",
    });
  }
  
  database
  .query(
    where.reduce(
      (sql, { column, operator }, index) =>
        `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
      initialSql
    ),
    where.map(({ value }) => value)
  )
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

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) =>{
  const {email} = req.body;

  database
    .query("select * from users where email = ?", [email])
    .then(([users]) => {
      if (users[0] != null){
        req.user = users[0];

        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving date from database");
    });
};

const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;
  database
  .query(
    "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
    [firstname, lastname,email, city, language, hashedPassword]
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
  const { firstname, lastname,email, city, language, hashedPassword } = req.body;
  database
  .query(
    "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? where id = ?",
    [firstname, lastname, email, city, language, hashedPassword, id]
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
  getUserByEmailWithPasswordAndPassToNext,
  postUsers,
  putUsers,
  deleteUsers,
};