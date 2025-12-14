const Cart = require("../models/Cart");

// ✅ GET all cart items (ONLY logged-in user)
const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.userData.id });
    res.status(200).json({
      message: "Cart items fetched successfully",
      carts: carts
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart items", error: err.message });
  }
};

// ✅ GET single cart item by ID (user-safe)
const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      id: Number(req.params.id),
      userId: req.userData.id
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Cart item fetched successfully",
      cart: cart
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart item", error: err.message });
  }
};

// ✅ ADD item OR increase quantity (user-safe)
const addToCart = async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    const userId = req.userData.id;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const existingCart = await Cart.findOne({ name, userId });

    if (existingCart) {
      existingCart.quantity += 1;
      await existingCart.save();
      return res.status(200).json({
        message: "Cart item quantity updated successfully",
        cart: existingCart
      });
    }

    const lastCart = await Cart.findOne({ userId }).sort({ id: -1 });
    const nextId = lastCart ? lastCart.id + 1 : 1;

    const newCart = await Cart.create({
      id: nextId,
      userId,
      name,
      price,
      image: image || "",
      description: description || "",
      quantity: 1
    });

    res.status(201).json({
      message: "Cart item added successfully",
      cart: newCart
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to add cart item", error: err.message });
  }
};

// ✅ UPDATE cart item
const updateCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
      id: Number(req.params.id),
      userId: req.userData.id
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = req.body.quantity ?? cartItem.quantity;
    await cartItem.save();

    res.status(200).json({
      message: "Cart item updated successfully",
      cart: cartItem
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update cart item", error: err.message });
  }
};

// ✅ DELETE cart item
const deleteCart = async (req, res) => {
  try {
    const result = await Cart.deleteOne({
      id: Number(req.params.id),
      userId: req.userData.id
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete cart item", error: err.message });
  }
};

module.exports = {
  getCarts,
  getCartById,
  addToCart,
  updateCart,
  deleteCart
};
