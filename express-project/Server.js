require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authMiddleware = require("./middlewares/authMiddleware");

const createDb = require("./config/db");
createDb();

// middlewares
app.use(cors());
app.use(express.json());

// routes
const ProductsRouter = require("./routes/products");
const CartsRouter = require("./routes/carts");
const OrdersRouter = require("./routes/orders");
const authRouter = require("./routes/auth");

// PUBLIC
app.use("/products", ProductsRouter);
app.use("/auth", authRouter);

// 🔐 LOGIN REQUIRED
app.use("/carts", authMiddleware, CartsRouter);
app.use("/orders", authMiddleware, OrdersRouter);

// logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello Express" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
