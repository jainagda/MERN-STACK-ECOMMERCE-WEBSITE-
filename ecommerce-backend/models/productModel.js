const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  price: {
    type: String,
    required: [true, "Please Enter product Prices"],
    maxLength: [8, "price connot exceed 8 characters"],
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  rating: {
    type: String,
    required: [false, "Please Enter product rating"],
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter product Category"],
    maxLength: [4, "stock connot exceed 4 characters"],
    default: 1,
  },
  numofReviews: {
    type: Number,
    defualt: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      Comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    defualt: Date.now,
  },
});


module.exports = mongoose.model("Product",productSchema)