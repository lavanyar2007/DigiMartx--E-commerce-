import { useParams } from "react-router";

const ProductDetails = ({ products, addToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return <div className="text-center mt-10">Product not found!</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h1 className="text-2xl font-bold mb-2 text-indigo-900">{product.name}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-indigo-900 font-bold mb-4">₹{product.price}</p>
      <button onClick={() => addToCart(product)} className="bg-indigo-900 text-white px-4 py-2 rounded hover:bg-indigo-800 transition">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
