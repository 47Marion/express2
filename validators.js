const validator = [];
const { body, validationResult } = require('express-validator');
validator.push(body("firstname").isLength({min:3, max: 255}).isString());
validator.push(body("lastname").isLength({min:3, max: 255}).isString());
validator.push(body("city").isLength({min:3, max: 255}).isString());
validator.push(body("language").isLength({min:3, max: 255}).isString());
validator.push(body("email", "It's not an email address !").isLength({min:5, max:255}).isEmail());
validator.push(body("password", "The password must have at least 3 chars.").isLength({min:3, max: 255}).isString());

validator.push ((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({validationErrors: errors.array()});
  } else {
    next();
  }
});

const validateUsers = (req, res, next) =>{
  const { lastname, firstname, city, language } = req.body;
  const { email } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (lastname == null) {
    errors.push({ field: "lastname", message: "This field is required" });
  }
  if (firstname == null) {
    errors.push({ field: "firstname", message: "This field is required" });
  }
  if (city == null) {
    errors.push({ field: "city", message: "This field is required" });
  }
  if (language == null) {
    errors.push({ field: "language", message: "This field is required" });
  }
  if (!emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'Invalid email' });
  }
 /* if (hashPassword == null){

  }*/
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = {
    validateUsers,
    validator,
};