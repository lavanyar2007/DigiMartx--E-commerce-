const express = require("express");
const router = express.Router();

const {
  getOrders,
  createOrder
} = require("../controllers/ordersController");

// GET all orders
router.get("/", getOrders);

// CREATE new order
router.post("/", createOrder);

module.exports = router;
