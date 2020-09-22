const { Permissions } = require("../constant");
const { createResponse } = require("../responseFormat");
const { ResponseCode } = require("../constant");

const canCreateProduct = (req, res, next) => {
  const user = res.locals.user;
  if (user != null) {
    if (user.permissions.includes(Permissions.Create_Product)) {
      next();
    } else {
      res
        .status(ResponseCode.Permission_denied.code)
        .json(createResponse(null, ResponseCode.Permission_denied.msg));
    }
  } else {
    res
      .status(ResponseCode.Unauthorized.code)
      .json(createResponse(null, ResponseCode.Unauthorized.msg));
  }
};

module.exports = {
  canCreateProduct,
};
