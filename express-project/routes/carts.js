const express = require("express");
const router = express.Router();

const {
  getCarts,
  updateCart,
  addToCart,
  deleteCart
} = require("../controllers/cartsController")

const auth = require("../middlewares/authMiddleware");

//  Get all cart items for logged-in user
router.get("/", auth, getCarts);

//update cart item
router.put("/", auth, updateCart);

// Add item to cart
router.post("/", auth, addToCart);


//  Delete cart item
router.delete("/:productId", auth, deleteCart);

module.exports = router;
