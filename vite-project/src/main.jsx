import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Layouts & Components
import HomeLayout from "./layouts/HomeLayout.jsx";
import Home from "./components/Home.jsx";
import ProductList from "./components/ProductList.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Cart from "./components/Cart.jsx";
import Orders from "./components/Orders.jsx";
import Admin from "./components/Admin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import About from "./components/About.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";

const Main = () => {
  const token = sessionStorage.getItem("token"); // JWT token

  // ---- Products ----
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ---- Cart ----
  const [CartProduct, setCartProduct] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:3000/carts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };
    fetchCart();
  }, [token]);

  const addToCart = async (product) => {
    if (!token) {
      toast.error("Please login first");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:3000/carts",
        { ...product },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartProduct((prev) => [...prev, data.cart]);
      toast.success("Item added to cart!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (id) => {
    if (!token) return;
    try {
      await axios.delete(`http://localhost:3000/carts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartProduct((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item from cart");
    }
  };

  // ---- Orders ----
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:3000/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/product"
              element={
                <ProductList
                  products={products}
                  addToCart={addToCart}
                  setCartProduct={setCartProduct}
                />
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProductDetails
                  products={products}
                  addToCart={addToCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart
                    CartProduct={CartProduct}
                    setCartProduct={setCartProduct}
                    removeFromCart={removeFromCart}
                    orders={orders}
                    setOrders={setOrders}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <Admin products={products} setProducts={setProducts} />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Public Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />

          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Orders orders={orders} setOrders={setOrders} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

createRoot(document.getElementById("root")).render(<Main />);
