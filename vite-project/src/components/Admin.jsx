import { useState } from "react";
import { useNavigate } from "react-router";

const Admin = ({ products, setProducts }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // Redirect if not admin
  if (
    sessionStorage.getItem("isLoggedIn") !== "true" ||
    sessionStorage.getItem("role") !== "admin"
  ) {
    navigate("/");
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert("Name and price are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price: parseFloat(price), image, description }),
      });

      if (res.ok) {
        const data = await res.json();
        setProducts([...products, data.newProduct]);
        setName(""); setPrice(""); setImage(""); setDescription("");
        alert("Product added successfully!");
      } else {
        const err = await res.json();
        alert("Error: " + err.message);
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-100">
      <form onSubmit={handleAddProduct} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-indigo-900 text-center">Admin - Add Product</h1>

        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:ring-2 focus:ring-indigo-300" required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:ring-2 focus:ring-indigo-300" required />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:ring-2 focus:ring-indigo-300" />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:ring-2 focus:ring-indigo-300" />

        <button type="submit" className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-800 transition">Add Product</button>
      </form>
    </div>
  );
};

export default Admin;
