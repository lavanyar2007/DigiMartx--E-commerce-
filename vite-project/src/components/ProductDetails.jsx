import { useParams } from "react-router";

const ProductDetails = ({ products, addToCart }) => {
  const { id } = useParams();

  // 🔥 Fix: Wait until products are loaded
  if (products.length === 0) {
    return (
      <div className="text-center mt-10 text-indigo-900 font-semibold">
        Loading...
      </div>
    );
  }

  const product = products.find((p) => p.id === parseInt(id));

  if (!product)
    return (
      <div className="text-center mt-10 text-indigo-900 font-semibold">
        Product not found!
      </div>
    );

  return (
    <div className="max-w-[400px] mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-80 h-80 object-cover rounded-lg mb-4 mx-auto"
      />
      <h1 className="text-2xl font-bold mb-2 text-indigo-900">{product.name}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-indigo-900 font-bold mb-4">₹{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-indigo-900 text-white px-4 py-2 rounded hover:bg-indigo-800 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
