const db = require("../database");
const jwt = require("jsonwebtoken");
const { createResponse } = require("../responseFormat");
const maxAge = 3600;
const createToken = (id) => {
  return jwt.sign({ id }, "testing", {
    expiresIn: maxAge,
  });
};
module.exports.login = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = db.validateUserPassword(email, password);
    console.log(user);
    if (user) {
      const token = createToken(user.id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res
        .status(200)
        .json(createResponse(200, { user: user.id, token: token }, "Login successfully"));
    } else {
      res.status(400).json(createResponse(400, null, "Wrong email or password"));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(createResponse(400, null, "Failed to login"));
  }
};
