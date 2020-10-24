const { Router } = require("express");
const constantController = require("../controller/constantController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.get("/get/:item", authMiddleware.checkUser, constantController.getConstant);

module.exports = router;
