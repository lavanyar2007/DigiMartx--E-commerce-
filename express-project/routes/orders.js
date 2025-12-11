const express = require("express");
const fs = require("fs");
const router = express.Router();

const ordersPath = "data/orders.json";

// Helper functions
const readOrders = () => {
  try {
    return JSON.parse(fs.readFileSync(ordersPath, "utf-8") || "[]");
  } catch {
    return [];
  }
};
const writeOrders = (orders) => fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

// GET all orders
router.get("/", (req, res) => {
  const orders = readOrders();
  res.json(orders);
});

// POST a new order
router.post("/", (req, res) => {
  const orders = readOrders();

  const newOrder = {
    id: Date.now(),      // unique ID
    ...req.body          // items, totalAmount, date
  };

  orders.push(newOrder);
  writeOrders(orders);

  // Clear cart after order
  fs.writeFileSync("data/carts.json", JSON.stringify([], null, 2));

  res.json(newOrder);   // return object
});

module.exports = router;
