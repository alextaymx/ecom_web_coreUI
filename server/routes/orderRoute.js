const { Router } = require("express");
const orderController = require("../controller/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();
router.post("/create_order", authMiddleware.checkUser, orderController.createOrder);

router.get("/get_order/:id", authMiddleware.checkUser, orderController.getOrder);

router.post("/update_order", authMiddleware.checkUser, orderController.updateOrder);

router.post("/delete_order", authMiddleware.checkUser, orderController.deleteOrder);

module.exports = router;
