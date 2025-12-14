const Order = require("../models/Order");
const Cart = require("../models/Cart");

// GET all orders for admin or logged-in user
const getOrders = async (req, res) => {
  try {
    const userId = req.userData.id;
    let orders;

    // Example: admin can see all orders
    if (req.userData.role === "admin") {
      orders = await Order.find();
    } else {
      orders = await Order.find({ userId });
    }

    res.status(200).json({ message: "Orders fetched successfully", orders: orders ||[]});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const userId = req.userData.id;

    const carts = await Cart.find({ userId });
    if (!carts.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = carts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const lastOrder = await Order.findOne().sort({ id: -1 });
    const nextId = lastOrder ? lastOrder.id + 1 : 1;

    const newOrder = await Order.create({
      id: nextId,
      userId,
      items: carts.map(item => ({
        id: item.id||0,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
        image: item.image||""
      })),
      totalAmount,
      date: new Date()
    });

    await Cart.deleteMany({ userId });

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getOrders,
  createOrder
};
