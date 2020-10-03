const { Router } = require("express");
const supplierController = require("../controller/supplierController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();
router.post(
  "/create_supplier",
  authMiddleware.checkUser,
  supplierController.createSupplier
);

router.get("/get/:id", authMiddleware.checkUser, supplierController.getSupplier);

router.post(
  "/update_supplier",
  authMiddleware.checkUser,
  supplierController.updateSupplier
);

router.post(
  "/delete_supplier",
  authMiddleware.checkUser,
  supplierController.deleteSupplier
);

module.exports = router;
