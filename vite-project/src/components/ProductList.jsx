import ProductCard from "./ProductCard.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const ProductList = ({ products, setCartProduct, CartProduct }) => {
  const token = sessionStorage.getItem("token"); // JWT token

  const addToCart = async (product) => {
    if (!token) {
      toast.error("You must be logged in to add items to cart");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/carts",
        product,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state with updated cart
      const updatedCart = await axios.get("http://localhost:3000/carts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartProduct(updatedCart.data);
      toast.success("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <div className="mx-auto bg-indigo-100 p-5 rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-indigo-900 text-center">
        Product List
      </h1>
      <div className="flex gap-6 flex-wrap justify-center">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
