const { Router } = require("express");
const orderController = require("../controller/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const permissions = require("../permissions/Order");

const router = Router();
router.post(
  "/create_order",
  authMiddleware.checkUser,
  permissions.canCreateOrder,
  orderController.createOrder
);

router.get("/get_order/:id", authMiddleware.checkUser, orderController.getOrder);

router.post(
  "/update_order",
  authMiddleware.checkUser,
  permissions.canUpdateOrder,
  orderController.updateOrder
);

router.post(
  "/delete_order",
  authMiddleware.checkUser,
  permissions.canCancelOrder,
  orderController.deleteOrder
);

module.exports = router;
