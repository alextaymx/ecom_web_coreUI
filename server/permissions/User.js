const { Permissions } = require("../constant");
const { createResponse } = require("../responseFormat");

const canCreateUser = (req, res, next) => {
  const user = req.locals.user;
  if (Permissions.Create_User in user.permissions) {
    next();
  } else {
    res.status(400).json(createResponse(null, "Permission denied"));
  }
};
