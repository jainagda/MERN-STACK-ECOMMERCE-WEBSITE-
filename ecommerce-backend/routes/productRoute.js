const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getDetailsProduct,
  createUpdateReview,
  getProductReview,
  deleteProductReview,
} = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

console.log("router", router);

router.route("/admin/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
  
  router.route("/product:id").get(getAllProducts).get(getDetailsProduct);

  router.route("/review").put(isAuthenticatedUser,createUpdateReview);
  router.route("/reviews").get(getProductReview).delete(isAuthenticatedUser,deleteProductReview);
module.exports = router;
