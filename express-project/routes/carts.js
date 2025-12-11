const express = require("express");
const fs = require("fs");
const router = express.Router();

// Helper function to read carts.json
const readCarts = () => JSON.parse(fs.readFileSync("data/carts.json", "utf-8"));
// Helper function to write carts.json
const writeCarts = (carts) => fs.writeFileSync("data/carts.json", JSON.stringify(carts, null, 2));

// GET all cart items
router.get("/", (req, res) => {
    const carts = readCarts();
    res.json(carts);
});

// GET single cart item by ID
router.get("/:id", (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === parseInt(req.params.id, 10));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ message: "Cart item not found" });
    }
});

// DELETE cart item by ID
router.delete("/:id", (req, res) => {
    const carts = readCarts();
    const updatedCarts = carts.filter(c => c.id !== parseInt(req.params.id, 10));
    if (updatedCarts.length === carts.length) {
        return res.status(404).json({ message: "Cart item not found" });
    }
    writeCarts(updatedCarts);
    res.status(200).json({ message: "Cart item deleted" });
});

// POST / add new cart item or increase quantity if exists
router.post("/", (req, res) => {
    const carts = readCarts();

    // Validation
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({ message: "Name and price are required" });
    }

    // Check if item already exists (by name)
    const existingCart = carts.find(c => c.name === req.body.name);
    if (existingCart) {
        existingCart.quantity += req.body.quantity || 1;
        writeCarts(carts);
        return res.status(200).json({ message: "Cart item quantity updated", cart: existingCart });
    }

    // Add new cart item
    const maxId = Math.max(...carts.map(c => c.id), 0);
    const newCart = {
        id: maxId + 1,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image || "",
        description: req.body.description || "",
        quantity: req.body.quantity || 1
    };
    const updatedCarts = [...carts, newCart];
    writeCarts(updatedCarts);
    res.status(201).json({ message: "Cart item added successfully", newCart });
});

// PUT / update cart item (e.g., quantity)
router.put("/:id", (req, res) => {
    const carts = readCarts();
    const index = carts.findIndex(c => c.id === parseInt(req.params.id, 10));
    if (index === -1) return res.status(404).json({ message: "Cart item not found" });

    // Update quantity or other fields if provided
    carts[index].quantity = req.body.quantity || carts[index].quantity;
    carts[index].name = req.body.name || carts[index].name;
    carts[index].price = req.body.price || carts[index].price;
    carts[index].image = req.body.image || carts[index].image;
    carts[index].description = req.body.description || carts[index].description;

    writeCarts(carts);
    res.json({ message: "Cart item updated successfully", cart: carts[index] });
});

module.exports = router;
