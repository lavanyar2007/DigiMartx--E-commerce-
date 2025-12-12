const express = require("express");
const Order=require("../models/Order")
const Cart=require("../models/Cart")
const router = express.Router();



// GET all orders
router.get("/", async(req, res) => {
  try{
    const orders = await Order.find();
    res.status(200).json(orders);
  }
  catch(err){
    res.status(500).json({message: err.message});
  }

  
});

// POST a new order

router.post("/", async (req, res) => {
  try {
    const { items, totalAmount, date } = req.body;

    // Find the current max numeric id
    const lastOrder = await Order.findOne().sort({ id: -1 });
    const maxId = lastOrder ? lastOrder.id : 0;

    // Create new order
    const newOrder = await Order.create({
      id: maxId + 1,       // numeric id
      items,
      totalAmount,
      date: date || Date.now()
    });

    // Clear cart after order
    await Cart.deleteMany({});

    res.status(201).json(newOrder);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
