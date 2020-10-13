const { Router } = require("express");
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const permissions = require("../permissions/User");

const router = Router();
router.post(
  "/create_user",
  authMiddleware.checkUser,
  permissions.canCreateUser,
  userController.createUser
);

router.get("/get/:id", authMiddleware.checkUser, userController.getUser);

router.post(
  "/update_user",
  authMiddleware.checkUser,
  permissions.canUpdateUser,
  userController.updateUser
);

module.exports = router;
