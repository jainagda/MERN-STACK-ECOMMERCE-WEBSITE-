const express = require("express");
const { getAllProducts, createProduct ,updateProduct, deleteProduct,getDetailsProduct} = require("../controller/productController");

const router = express.Router()


console.log("router",router)

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getDetailsProduct);

module.exports = router