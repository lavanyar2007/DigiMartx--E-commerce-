import { useState } from "react";

const ProductForm = ({ products, setProducts }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productPrice) {
      alert("Name and price are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: productName,
          price: parseFloat(productPrice),
          image: productImage,
          description: productDescription
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setProducts([...products, data.newProduct]);
        setProductName(""); setProductPrice(""); setProductImage(""); setProductDescription("");
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
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-indigo-900 mb-6 text-center">Add Product</h1>

        <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:ring-2 focus:ring-indigo-300" required />

        <input type="number" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:ring-2 focus:ring-indigo-300" required />

        <input type="text" placeholder="Product Image URL" value={productImage} onChange={(e) => setProductImage(e.target.value)} className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:ring-2 focus:ring-indigo-300" />

        <input type="text" placeholder="Product Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:ring-2 focus:ring-indigo-300" />

        <button type="submit" className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-800 transition">Add</button>
      </form>
    </div>
  );
};

export default ProductForm;
