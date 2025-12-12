import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex w-full h-20 bg-indigo-900 justify-between items-center px-6 shadow-lg sticky top-0 z-50">
      <div className="text-white text-2xl font-bold">DigiMartx</div>
      <div className="flex gap-6 text-lg text-white">
        <Link to="/Home" className="bg-indigo-200 px-5 py-1 rounded-full text-indigo-900 hover:text-indigo-800 hover:bg-indigo-300 transition">Home</Link>
        <Link to="/product" className="bg-indigo-200 px-5 py-1 rounded-full text-indigo-900 hover:text-indigo-800 hover:bg-indigo-300 transition">Products</Link>
        <Link to="/cart" className="bg-indigo-200 px-5 py-1 rounded-full text-indigo-900 hover:text-indigo-800 hover:bg-indigo-300 transition">Cart</Link>
        <Link to="/order" className="bg-indigo-200 px-5 py-1 rounded-full text-indigo-900 hover:text-indigo-800 hover:bg-indigo-300 transition">Order</Link>
        <Link to="/about" className="bg-indigo-200 px-5 py-1 rounded-full text-indigo-900 hover:text-indigo-800 hover:bg-indigo-300 transition">About</Link>
        <Link to="/admin" className="bg-indigo-200 px-5 py-1 rounded-full text-indigo-900 hover:text-indigo-800 hover:bg-indigo-300 transition">Admin</Link>
      </div>
      <div className="flex gap-4">
        <Link to="/login" className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-700 text-white transition">Login</Link>
        <Link to="/register" className="bg-white px-5 py-2 rounded-lg hover:bg-gray-200 transition">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
