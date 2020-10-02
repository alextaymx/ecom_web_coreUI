const { Router } = require("express");
const productController = require("../controller/productVarController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();
router.post(
  "/create_productvar",
  authMiddleware.checkUser,
  productController.createProductVar
);

router.get("/getVar/:id", authMiddleware.checkUser, productController.getProductVars);

router.post(
  "/update_productvar",
  authMiddleware.checkUser,
  productController.updateProductVars
);

router.post(
  "/delete_productvar",
  authMiddleware.checkUser,
  productController.deleteProductVars
);

module.exports = router;
