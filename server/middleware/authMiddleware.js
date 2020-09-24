const jwt = require("jsonwebtoken");
const db = require("../database");

const checkUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "testing", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = db.getUserByIdPassword(decodedToken.id, decodedToken.password);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {
  checkUser,
};
