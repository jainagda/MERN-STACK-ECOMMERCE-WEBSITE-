const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandle");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//Create Product --Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  console.log("req --------", req.body);

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 2;

  const ApiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const product = await ApiFeature.query;

  res.status(200).json({
    data: product,
    message: "Product List Found",
  });
});

// Get details of product

exports.getDetailsProduct = async (req, res, next) => {
  try {
    const productCount = await Product.countDocuments();
    const productId = req.params.id; // Get the product ID from the request parameters

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
      productCount,
    });
  } catch (error) {
    console.error("Error get product:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update Product Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  console.log("req --------", req.body);

  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product Admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id; // Get the product ID from the request parameters

    // Find the product by ID
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
