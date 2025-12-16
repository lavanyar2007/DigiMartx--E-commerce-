const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: "India" }
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "CARD", "UPI"],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending"
    },
    totalAmount: {
      type: Number,
      required: true
    },
    orderNumber: {
      type: String,
      unique: true,
      default: () => "ORD" + Date.now() // unique per order
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
