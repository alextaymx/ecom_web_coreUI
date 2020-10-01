const { Router } = require("express");
const productController = require("../controller/productController");
const authMiddleware = require("../middleware/authMiddleware");
const permissions = require("../permissions/Product");

const router = Router();
router.post(
  "/create_product",
  authMiddleware.checkUser,
  permissions.canCreateProduct,
  productController.createProduct
);

router.get("/get/:id", authMiddleware.checkUser, productController.getProduct);

router.post(
  "/update_product",
  authMiddleware.checkUser,
  permissions.canUpdateProduct,
  productController.updateProduct
);

router.post(
  "/delete_product",
  authMiddleware.checkUser,
  permissions.canDeleteProduct,
  productController.deleteProduct
);

module.exports = router;
