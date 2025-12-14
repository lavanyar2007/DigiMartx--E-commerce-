const express = require("express");
const router = express.Router();

const {
  getCarts,
  getCartById,
  addToCart,
  updateCart,
  deleteCart
} = require("../controllers/cartsController")

const auth = require("../middlewares/authMiddleware");

// ✅ Get all cart items for logged-in user
router.get("/", auth, getCarts);

// ✅ Get single cart item
router.get("/:id", auth, getCartById);

// ✅ Add item to cart
router.post("/", auth, addToCart);

// ✅ Update quantity
router.put("/:id", auth, updateCart);

// ✅ Delete cart item
router.delete("/:id", auth, deleteCart);

module.exports = router;
