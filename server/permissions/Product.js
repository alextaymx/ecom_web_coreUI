const { Permissions } = require("../constant");
const { createResponse } = require("../responseFormat");
const { ResponseCode } = require("../constant");

const canCreateProductVar = (req, res, next) => {
  const user = res.locals.user;
  if (user.permissions.includes(Permissions.Create_Product)) {
    next();
  } else {
    res
      .status(ResponseCode.Permission_denied.code)
      .json(createResponse(null, ResponseCode.Permission_denied.msg));
  }
};

const canDeleteProductVar = (req, res, next) => {
  const user = res.locals.user;
  if (user.permissions.includes(Permissions.Create_Product)) {
    next();
  } else {
    res
      .status(ResponseCode.Permission_denied.code)
      .json(createResponse(null, ResponseCode.Permission_denied.msg));
  }
};

const canUpdateProductVar = (req, res, next) => {
  const user = res.locals.user;
  if (user.permissions.includes(Permissions.Create_Product)) {
    next();
  } else {
    res
      .status(ResponseCode.Permission_denied.code)
      .json(createResponse(null, ResponseCode.Permission_denied.msg));
  }
};

module.exports = {
  canCreateProduct,
  canUpdateProductVar,
  canDeleteProductVar,
};
