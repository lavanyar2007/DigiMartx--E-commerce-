import { Link } from "react-router";

const Home = ({ products }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center font-serif text-blue-900">Welcome to DigiMartx</h1>

      {/* Hero Section */}
      <div className="bg-indigo-200 text-white text-center space-y-10 shadow-2xl m-10 p-10">
        <img src="bg.jpg" alt="bg image" className="h-100 w-full px-5 overflow-hidden" />
        <p className="text-lg text-indigo-900">Best Deals • Fast Delivery • 100% Quality</p>
      </div>

      {/* Top Products */}
      <div className="max-w-6xl mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-900">Top Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products && products.slice(0, 3).map((p) => (
            <div key={p.id} className="bg-white shadow-lg rounded-xl p-4 text-center hover:scale-105 transform transition">
              <img src={p.image} alt={p.name} className="h-80 w-80 overflow-hidden object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-gray-700 font-medium">₹{p.price}</p>
              <Link to="/product" className="mt-4 inline-block bg-indigo-900 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition">View More</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
