import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Cart = ({ CartProduct, setCartProduct, orders, setOrders }) => {
  const [quantities, setQuantities] = useState([]);

  const navigate = useNavigate();

  // Initialize quantities from CartProduct
  useEffect(() => {
    setQuantities(CartProduct.map(item => item.quantity || 1));
  }, [CartProduct]);

  const totalPrice = () => {
    let total = 0;
    for (let i = 0; i < CartProduct.length; i++) {
      total += CartProduct[i].price * quantities[i];
    }
    return total;
  };

  const updateQuantity = async (index, newQuantity) => {
    if (newQuantity < 1) return;

    const product = CartProduct[index];
    try {
      const res = await fetch(`http://localhost:3000/carts/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (res.ok) {
        const updatedItem = await res.json();
        const newCart = [...CartProduct];
        newCart[index] = updatedItem.cart;
        setCartProduct(newCart);

        const newQuantities = [...quantities];
        newQuantities[index] = newQuantity;
        setQuantities(newQuantities);
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const increment = (index) => updateQuantity(index, quantities[index] + 1);
  const decrement = (index) => updateQuantity(index, quantities[index] - 1);

  const handleRemove = async (id, index) => {
    try {
      const res = await fetch(`http://localhost:3000/carts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCartProduct(CartProduct.filter(item => item.id !== id));
        setQuantities(quantities.filter((_, i) => i !== index));
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleCheckout = async () => {
    const orderData = {
      items: CartProduct.map((item, i) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantities[i],
        total: item.price * quantities[i],
      })),
      totalAmount: totalPrice(),
      date: new Date().toISOString()
    };

    try {
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        const newOrder = await res.json();
        setOrders([...orders, newOrder]);
        setCartProduct([]);
        alert("Order placed successfully!");
        navigate("/order");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto ">
      <h1 className="text-2xl font-bold mb-6 text-indigo-900 text-center">Cart</h1>
      <div className="flex gap-15 justify-center">
        <div className="w-full md:w-2/3 bg-indigo-100 p-5 rounded-xl shadow-lg">
          {CartProduct.map((product, i) => (
            <div key={product.id} className="flex gap-5 items-center bg-white p-4 rounded-xl shadow mb-4">
              <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md" />
              <div className="flex-1">
                <h2 className="font-bold text-indigo-900">{product.name}</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => decrement(i)} className="border-2 rounded-full px-3 py-1 hover:bg-indigo-300 transition">-</button>
                <span className="font-semibold">{quantities[i]}</span>
                <button onClick={() => increment(i)} className="border-2 rounded-full px-3 py-1 hover:bg-indigo-300 transition">+</button>
              </div>
              <p className="font-bold">₹{product.price * quantities[i]}</p>
              <button onClick={() => handleRemove(product.id, i)} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white transition">Remove</button>
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/3 bg-indigo-100 p-5 rounded-xl shadow-lg h-fit">
          <h2 className="text-xl font-bold text-indigo-900 text-center mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₹{totalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount (20%):</span>
            <span>₹{(totalPrice() * 0.2).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>₹{(totalPrice() * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-indigo-900 text-lg mb-4">
            <span>Total:</span>
            <span>₹{(totalPrice() - totalPrice() * 0.2 + totalPrice() * 0.1).toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="w-full bg-indigo-900 text-white py-2 rounded hover:bg-indigo-800 transition">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
