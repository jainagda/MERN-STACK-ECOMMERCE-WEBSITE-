const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getDetailsProduct,
} = require("../controller/productController");
const { isAUthentiocxatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

console.log("router", router);

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAUthentiocxatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAUthentiocxatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAUthentiocxatedUser, authorizeRoles("admin"), deleteProduct)
  .get(getDetailsProduct);

module.exports = router;
