const About = () => {
  return (
    <div className="max-w-6xl mx-auto p-5 md:p-10 bg-indigo-50 rounded-xl shadow-lg">
      
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-6 text-center">
        About DigiMartx
      </h1>

      {/* About Info */}
      <p className="text-gray-700 text-lg mb-6">
        DigiMartx is your one-stop online store for the latest tech products, gadgets, and accessories.
        We are committed to providing our customers with high-quality products, fast delivery, and
        excellent customer service. Our mission is to make shopping online convenient, safe, and enjoyable.
      </p>

      {/* Our Values */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-indigo-900 mb-2">Quality Products</h3>
          <p className="text-gray-600">We ensure all products meet the highest quality standards.</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-indigo-900 mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Get your orders delivered to your doorstep quickly and safely.</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-indigo-900 mb-2">Customer Support</h3>
          <p className="text-gray-600">Our support team is always ready to help you with any issues.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-10 text-center">
        <p className="text-gray-700 mb-4 text-lg">
          Ready to explore our products? Start shopping today and experience the DigiMartx difference!
        </p>
        <a
          href="/product"
          className="bg-indigo-900 text-white px-6 py-3 rounded-md hover:bg-indigo-800 transition-all"
        >
          Browse Products
        </a>
      </div>
    </div>
  );
};

export default About;
