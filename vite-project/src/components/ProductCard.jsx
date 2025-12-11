import { Link } from "react-router";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-[220px] hover:scale-105 transform transition">
      <img src={product.image} className="h-40 w-40 object-cover rounded-lg mb-3" />
      <h2 className="font-bold text-indigo-900">{product.name}</h2>
      <p className="text-gray-700">₹{product.price}</p>
      <div className="flex justify-between  mt-3 py-2">
        <button className="bg-indigo-900 text-white px-3 py-1 rounded hover:bg-indigo-800 transition" onClick={() => addToCart(product)}>Add</button>
        <Link to={`/products/${product.id}`} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition ">View</Link>
      </div>
    </div>
  );
};

export default ProductCard;
