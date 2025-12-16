const Order = require("../models/orders");
const Cart = require("../models/carts");

/**
 * GET ORDERS
 * Admin → all orders
 * User → only their own orders
 */
const getOrders = async (req, res) => {
  try {
    let orders;

    if (req.userData.role === "admin") {
      // Admin sees all orders
      orders = await Order.find()
        .populate("user", "name email")
        .populate("products.product");
    } else {
      // User sees only their own orders
      orders = await Order.find({ user: req.userData.id })
        .populate("products.product");
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      orders
    });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * CREATE ORDER (Checkout from Cart)
 */
const createOrder = async (req, res) => {
  try {
    const userId = req.userData.id;
    const { shippingAddress, paymentMethod } = req.body;

    // Validate shipping address
    const requiredFields = ["fullName", "phone", "addressLine", "city", "state", "pincode"];
    for (let field of requiredFields) {
      if (!shippingAddress?.[field]) {
        return res.status(400).json({ message: `Field ${field} is required` });
      }
    }

    // Validate payment method
    const allowedPayments = ["COD", "CARD", "UPI"];
    if (!allowedPayments.includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Prepare order products and calculate total
    const orderProducts = cart.products.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    }));

    const totalAmount = cart.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create({
      user: userId,
      products: orderProducts,
      shippingAddress,
      paymentMethod,
      totalAmount,
      paymentStatus: paymentMethod === "COD" ? "pending" : "paid"
    });

    // Clear user's cart
    cart.products = [];
    await cart.save();

    // Populate products for response
    const populatedOrder = await Order.findById(order._id).populate("products.product");

    res.status(201).json({
      message: "Order placed successfully",
      order: populatedOrder
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getOrders,
  createOrder
};
