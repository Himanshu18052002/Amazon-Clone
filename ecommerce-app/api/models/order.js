const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  products: [
    {
      name: {
        type: String,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    require: true,
  },
  shippingAddress: {
    name: {
      type: String,
      require: true,
    },
    mobileNo: {
      type: String,
      require: true,
    },
    houseNo: {
      type: String,
      require: true,
    },
    street: {
      type: String,
      require: true,
    },
    landmark: {
      type: String,
      require: true,
    },
    postalcode: {
      type: String,
      require: true,
    },
  },
  paymentMethod: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
