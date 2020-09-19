const { Permissions } = require("../constant");
const { createResponse } = require("../responseFormat");

const canCreateProduct = (req, res, next) => {
  const user = res.locals.user;
  if (user != null) {
    if (Permissions.Create_Product in user.permissions) {
      next();
    } else {
      res.status(400).json(createResponse(400, null, "Permission denied"));
    }
  } else {
    res.status(400).json(createResponse(400, null, "Login to continue"));
  }
};

module.exports = {
  canCreateProduct,
};
