const { Router } = require("express");
const productController = require("../controller/productVarController");
const authMiddleware = require("../middleware/authMiddleware");
const permissions = require("../permissions/ProductVariation");

const router = Router();
router.post(
  "/create_productvar",
  authMiddleware.checkUser,
  permissions.canCreateProductVar,
  productController.createProductVar
);

router.get("/getVar/:id", authMiddleware.checkUser, productController.getProductVar);

router.post(
  "/update_productvar",
  authMiddleware.checkUser,
  permissions.canUpdateProductVar,
  productController.updateProductVar
);

router.post(
  "/delete_productvar",
  authMiddleware.checkUser,
  permissions.canDeleteProductVar,
  productController.deleteProductVar
);

module.exports = router;
