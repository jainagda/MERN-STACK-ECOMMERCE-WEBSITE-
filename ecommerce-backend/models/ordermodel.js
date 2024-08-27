const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },

  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type:String,
        ref: "product",
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },

  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    defualt: 0,
    required: true,
  },
  taxPrice: {
    type: Number,
    defualt: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    defualt: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    defualt: 0,
    required: true,
  },

  orderStatus: {
    type: String,
    defualt: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    defualt: Date.now,
  },
});


module.exports = mongoose.model("Order",orderSchema)
