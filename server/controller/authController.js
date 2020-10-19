const db = require("../database");
const jwt = require("jsonwebtoken");
const { createResponse } = require("../responseFormat");
const { ResponseCode } = require("../constant");
const maxAge = 36000;

//to create jwt token
const createToken = (id, password) => {
  return jwt.sign({ id, password }, "testing", {
    expiresIn: maxAge,
  });
};

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

module.exports.login = (req, res) => {
  try {
    const { email, password } = req.body;
    const user = db.validateUserPassword(email, password);
    if (user && user.status === 1) {
      const token = createToken(user.id, user.password);
      // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res
        .status(ResponseCode.Login_success.code)
        .json(
          createResponse(
            { user: user.id, email: user.email, name: user.name, token: token },
            ResponseCode.Login_success.msg
          )
        );
    } else {
      res
        .status(ResponseCode.Login_wrong_input.code)
        .json(createResponse(null, ResponseCode.Login_wrong_input.msg));
    }
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

module.exports.register = (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (password.length < 6) {
      res
        .status(400)
        .json(createResponse(null, "The password should contain at least 6 characters."));
      return;
    }
    if (!validateEmail(email)) {
      res.status(400).json(createResponse(null, "Please input a valid email format."));
      return;
    }
    const user = db.insertUser(email, username, password);
    if (user != null) {
      res
        .status(ResponseCode.Register_success.code)
        .json(
          createResponse(
            { user: user.id, email: user.email, name: user.name },
            ResponseCode.Register_success.msg
          )
        );
    } else {
      res.status(400).json(createResponse(null, "Failed to register!"));
    }
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

module.exports.logout = (req, res) => {
  if (res.locals.user == null) {
    res
      .status(ResponseCode.Unauthorized.code)
      .json(createResponse(null, ResponseCode.Unauthorized.msg));
  } else {
    res.cookie("jwt", "", { maxAge: 1 });
    res
      .status(ResponseCode.Logout_success.code)
      .json(createResponse(null, ResponseCode.Logout_success));
  }
};
