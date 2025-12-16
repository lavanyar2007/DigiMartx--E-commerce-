import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">DigiMartx</h2>
          <p>support@digimartx.com</p>
          <div className="flex gap-3 mt-3">
            <FaFacebookF className="hover:text-gray-300 transition" />
            <FaInstagram className="hover:text-gray-300 transition" />
            <FaYoutube className="hover:text-gray-300 transition" />
            <FaTiktok className="hover:text-gray-300 transition" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Menu</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-gray-300 transition">Home</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Products</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">About</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Sitemap</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-gray-300 transition">Login</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Register</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Terms</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Useful Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-gray-300 transition">Info Centre</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Dosing Chart</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Expert Advice</a></li>
            <li><a href="#" className="hover:text-gray-300 transition">Video Library</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-300 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} DigiMartx. Website by <a href="#" className="hover:text-gray-300 underline">YourName</a>
      </div>
    </footer>
  );
};

export default Footer;
