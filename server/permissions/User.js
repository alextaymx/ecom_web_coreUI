const { Permissions } = require("../constant");
const { createResponse } = require("../responseFormat");

const canCreateUser = (req, res, next) => {
  const user = res.locals.user;
  if (Permissions.Create_User in user.permissions) {
    next();
  } else {
    res.status(400).json(createResponse(null, "Permission denied"));
  }
};

const canUpdateUser = (req, res, next) => {
  const user = res.locals.user;
  if (Permissions.Update_User in user.permissions) {
    next();
  } else {
    res.status(400).json(createResponse(null, "Permission denied"));
  }
};

module.exports = {
  canCreateUser,
  canUpdateUser,
};
