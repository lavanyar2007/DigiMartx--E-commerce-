import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ProductForm = ({ products, setProducts }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const token = sessionStorage.getItem("token"); // JWT token

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productPrice) {
      toast.error("Name and price are required",{ autoClose: 300});
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/products",
        {
          name: productName,
          price: parseFloat(productPrice),
          image: productImage || "",
          description: productDescription || "",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newProduct = res.data.product;
      setProducts([...products, newProduct]);

      toast.success("Product added successfully!", { autoClose: 250});

      // Clear form
      setProductName("");
      setProductPrice("");
      setProductImage("");
      setProductDescription("");
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("Failed to add product", { autoClose: 500 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-indigo-900 text-center">
          Admin - Add Product
        </h1>

        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:ring-2 focus:ring-indigo-300"
        />

        <input
          type="number"
          placeholder="Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:ring-2 focus:ring-indigo-300"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:ring-2 focus:ring-indigo-300"
        />

        <textarea
          placeholder="Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:ring-2 focus:ring-indigo-300"
        />

        <button
          type="submit"
          className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-800 transition"
          disabled={!productName || !productPrice} 
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
