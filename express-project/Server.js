const express = require("express");
const fs=require("fs");
const cors=require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const createDb=require("./config/db")

createDb();

const ProductsRouter=require("./routes/products");
const CartsRouter=require("./routes/carts");
const OrdersRouter=require("./routes/orders");

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`)
    next();
})

app.get("/",(req,res)=>{
    res.json({message:"Hello Express"})
})

app.use("/products",ProductsRouter);
app.use("/carts",CartsRouter);
app.use("/orders",OrdersRouter);

app.listen(3000,()=>{
    console.log('Server running at http://localhost:3000');

})

