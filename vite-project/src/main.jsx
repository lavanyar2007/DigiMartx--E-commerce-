import { createRoot } from "react-dom/client";
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router";
import HomeLayout from "./layouts/HomeLayout.jsx";
import Home from "./components/Home.jsx";
import ProductList from "./components/ProductList.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Cart from "./components/Cart.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Orders from "./components/Orders.jsx";
import Admin from "./components/Admin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import About from "./components/About.jsx"
import { useState ,useEffect} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  // Global state

  //----product---//

  const [products, setProducts] = useState([]);

  
  useEffect(()=>{
       const fetchData= async ()=>{
       const res= await fetch("http://localhost:3000/products");
       const data = await res.json();
       setProducts(data);

    }
    
  fetchData();
  },[])

  //---cart------//

  const [CartProduct, setCartProduct] = useState([]);

  useEffect(()=>{
    const fetchData=async ()=>{
      const res=await fetch("http://localhost:3000/carts");
      const data = await res.json();
      setCartProduct(data);
    }
    fetchData();
  },[])

 const addToCart = async (product) => {
  await fetch("http://localhost:3000/carts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  // Re-fetch cart
  const res = await fetch("http://localhost:3000/carts");
  const data = await res.json();
  setCartProduct(data);
};


const removeFromCart = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/carts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCartProduct(CartProduct.filter(item => item.id !== id));
    }
  } catch (err) {
    console.error("Failed to remove item from cart:", err);
  }
};


//----order-------//

  const [orders, setOrders] = useState([]);

  
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("http://localhost:3000/orders");
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home/>} />
           <Route path="/Home" element={<Home/>} />
          <Route path="/product" element={<ProductList products={products} addToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetails products={products} addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart CartProduct={CartProduct} removeFromCart={removeFromCart} setCartProduct={setCartProduct} orders={orders} setOrders={setOrders} />} />
          <Route path="/about" element={<About />} />
          {/* Admin Route - only for admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Admin products={products} setProducts={setProducts} />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Login Page */}
        <Route path="/login" element={<LoginForm />} />

        {/* Orders Page - only for logged in users */}
        <Route
          path="/order"
          element={
            <ProtectedRoute >
              <Orders orders={orders} setOrders={setOrders}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </>
  );
};

createRoot(document.getElementById("root")).render(<Main />);
