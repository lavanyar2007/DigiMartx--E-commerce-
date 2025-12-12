const express = require("express");
const Cart=require("../models/Cart")
const router = express.Router();


// GET all cart items
router.get("/", async (req, res) => {
     try{
        const carts = await Cart.find();
        res.status(200).json(carts);
     }
     catch(err){
        res.status(404).json({error: err.message});
     }
});

// GET single cart item by ID
router.get("/:id", async (req, res) => {
   try {
        const cart = await Cart.find({id:req.params.id});
        res.status(200).json(cart);
    } catch(err) {
        res.status(404).json({ message: "Cart item not found" });
    }
});

// DELETE cart item by ID
router.delete("/:id",async (req, res) => {
     try{
        const id=req.params.id;
        const result = await Cart.deleteOne({ id: id });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Cart item not found" });
        }
        else{
            res.status(200).json({ message: "Cart item deleted" });
        }
     }
     catch(err){
         res.status(404).json({error: err.message});
     }
});

// Add new cart item or increase quantity if exists
router.post("/", async (req, res) => {
  try {
    const { name, price, image, description, quantity } = req.body;

    // Validation
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    // Check if the item already exists
    const existingCart = await Cart.findOne({ name });
    if (existingCart) {
      existingCart.quantity += quantity || 1;
      await existingCart.save();  // update existing item
      return res.status(200).json({ message: "Cart item quantity updated", cart: existingCart });
    }

    // Get max numeric id for new cart item
    const lastCart = await Cart.findOne().sort({ id: -1 });
    const maxId = lastCart ? lastCart.id : 0;

    // Create new cart item using create()
    const newCart = await Cart.create({
      id: maxId + 1,
      name,
      price,
      image: image || "",
      description: description || "",
      quantity: quantity || 1
    });

    res.status(201).json({ message: "Cart item added successfully", newCart });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update cart item by numeric id
router.put("/:id", async (req, res) => {
  try {
    const cartId = parseInt(req.params.id, 10);

    // Find the cart item by numeric id
    const cartItem = await Cart.findOne({ id: cartId });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Update fields if provided
    cartItem.quantity = req.body.quantity ?? cartItem.quantity;
    cartItem.name = req.body.name ?? cartItem.name;
    cartItem.price = req.body.price ?? cartItem.price;
    cartItem.image = req.body.image ?? cartItem.image;
    cartItem.description = req.body.description ?? cartItem.description;

    await cartItem.save(); // save changes

    res.json({ message: "Cart item updated successfully", cart: cartItem });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
