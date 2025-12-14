const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductsById,
  postProducts,
  deleteProducts
} = require("../controllers/productsController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// PUBLIC
router.get("/", getProducts);
router.get("/:id", getProductsById);

// 🔐 ADMIN ONLY
router.post("/", authMiddleware, adminMiddleware, postProducts);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProducts);

module.exports = router;
