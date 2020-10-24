const { Permissions } = require("../constant");
const { createResponse } = require("../responseFormat");
const { ResponseCode } = require("../constant");

const canCreateOrder = (req, res, next) => {
  const user = res.locals.user;
  if (user.permissions.includes(Permissions.Create_Order)) {
    next();
  } else {
    res
      .status(ResponseCode.Permission_denied.code)
      .json(createResponse(null, ResponseCode.Permission_denied.msg));
  }
};

const canCancelOrder = (req, res, next) => {
  const user = res.locals.user;
  if (user.permissions.includes(Permissions.Cancel_Order)) {
    next();
  } else {
    res
      .status(ResponseCode.Permission_denied.code)
      .json(createResponse(null, ResponseCode.Permission_denied.msg));
  }
};

const canUpdateOrder = (req, res, next) => {
  const user = res.locals.user;
  if (user.permissions.includes(Permissions.Update_Order)) {
    next();
  } else {
    res
      .status(ResponseCode.Permission_denied.code)
      .json(createResponse(null, ResponseCode.Permission_denied.msg));
  }
};

module.exports = {
  canCancelOrder,
  canCreateOrder,
  canUpdateOrder,
};
