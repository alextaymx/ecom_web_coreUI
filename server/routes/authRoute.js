const { Router } = require("express");
const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();
// router.post('/signup', authController.signup);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", authMiddleware.checkUser, authController.logout);

module.exports = router;
