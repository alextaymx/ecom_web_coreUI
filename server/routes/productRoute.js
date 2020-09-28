const { Router } = require("express");
const productController = require("../controller/productController");
const authMiddleware = require("../middleware/authMiddleware");
const permissions = require("../permissions/Product");

const router = Router();
router.post(
  "/create_productvar",
  authMiddleware.checkUser,
  permissions.canCreateProductVar,
  productController.createProductVar
);

router.get("/getVar/:id", authMiddleware.checkUser, productController.getProductVar);

module.exports = router;
