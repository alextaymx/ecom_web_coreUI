const { Router } = require("express");
const productController = require("../controller/productVarController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();
router.post(
  "/create_productvar",
  authMiddleware.checkUser,
  productController.createProductVar
);

router.get("/getVar/:id", authMiddleware.checkUser, productController.getProductVar);

router.post(
  "/update_productvar",
  authMiddleware.checkUser,
  productController.updateProductVar
);

router.post(
  "/delete_productvar",
  authMiddleware.checkUser,
  productController.deleteProductVar
);

module.exports = router;
