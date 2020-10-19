const jwt = require("jsonwebtoken");
const db = require("../database");
const { createResponse } = require("../responseFormat");
const { ResponseCode } = require("../constant");

const checkUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "testing", async (err, decodedToken) => {
      if (err) {
        res
          .status(ResponseCode.Unauthorized.code)
          .json(createResponse(null, ResponseCode.Unauthorized.msg));
      } else {
        let user = db.getUserByIdPassword(decodedToken.id, decodedToken.password);
        if (user == null || !(user.status === 1)) {
          res
            .status(ResponseCode.Unauthorized.code)
            .json(createResponse(null, ResponseCode.Unauthorized.msg));
        } else {
          res.locals.user = user;
          next();
        }
      }
    });
  } else {
    res
      .status(ResponseCode.Unauthorized.code)
      .json(createResponse(null, ResponseCode.Unauthorized.msg));
  }
};

module.exports = {
  checkUser,
};
