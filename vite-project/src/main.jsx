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
  const token = sessionStorage.getItem("token");

  // ---- Products ----
  const [products, setProducts] = useState([]);

  const [CartProduct, setCartProduct] = useState([]); // Cart state added

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data.products || res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        toast.error("Failed to load products",{ autoClose: 250});
      }
    };
    fetchProducts();
  }, []);

  // // ---- Orders (fetch once, for current user) ----
  // useEffect(() => {
  //   if (!token) return;
  //   const fetchOrders = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3000/orders", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setOrders(res.data.orders || []);
  //     } catch (err) {
  //       console.error("Failed to fetch orders:", err);
  //     }
  //   };
  //   fetchOrders();
  // }, [token]);

  // ---- Add to Cart (for products only) ----
const addToCart = async (product) => {
  if (!token) {
    toast.error("Please login first");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:3000/carts",
      { productId: product._id, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Get updated cart from backend
    const updatedCart = res.data.cart.products.map(item => ({
      id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
    }));

    setCartProduct(updatedCart); // update frontend instantly
    toast.success("Product added to cart",{ autoClose: 250});
  } catch (err) {
    console.error(err);
    toast.error("Failed to add product to cart",{ autoClose: 250});
  }
};


  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home products={products} />} />
            <Route path="/home" element={<Home products={products} />} />

            {/* Product Routes */}
            <Route
              path="/product"
              element={<ProductList products={products} addToCart={addToCart} />}
            />
            <Route
              path="/products/:id"
              element={<ProductDetails products={products} addToCart={addToCart} />}
            />

            {/* Cart */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart
                    CartProduct={CartProduct}
                    setCartProduct={setCartProduct}
                  />
                </ProtectedRoute>
              }
            />

            {/* Orders */}
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />

            {/* About */}
            <Route path="/about" element={<About />} />

            {/* Admin */}
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

createRoot(document.getElementById("root")).render(<Main />);
