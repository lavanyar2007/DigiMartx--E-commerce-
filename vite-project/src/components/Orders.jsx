import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // ---------------- FETCH ORDERS ----------------
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Fetch orders failed:", error.response?.data);
        toast.error("Failed to load orders",{ autoClose: 250});
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // ---------------- LOADING STATE ----------------
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-20 text-center text-lg font-semibold text-gray-600">
        Loading orders...
      </div>
    );
  }

  // ---------------- EMPTY STATE ----------------
  if (!orders.length) {
    return (
      <div className="max-w-4xl mx-auto p-10 mt-20 text-center bg-indigo-50 rounded-2xl shadow-lg">
        <p className="text-xl font-bold text-indigo-800">
          You haven’t placed any orders yet
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-indigo-900 text-white px-6 py-2 rounded-xl hover:bg-indigo-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // ---------------- ORDERS LIST ----------------
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        Your Orders
      </h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-lg p-6 border"
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <div>
                <p className="font-bold text-lg">
                  Order #{order._id.slice(-6)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span className="px-4 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-900 w-fit">
                {order.deliveryStatus}
              </span>
            </div>

            {/* Products */}
            <div className="mt-6 space-y-4">
              {order.products.map((item) => (
                <div
                  key={item.product._id}
                  className="flex flex-col sm:flex-row gap-4 items-center border rounded-xl p-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1 w-full">
                    <p className="font-semibold text-lg">
                      {item.product.name}
                    </p>
                    <p className="text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-bold text-indigo-900">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/products/${item.product.id}`)
                    }
                    className="bg-indigo-900 text-white px-4 py-2 rounded-xl hover:bg-indigo-800 transition"
                  >
                    View Product
                  </button>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="flex justify-between items-center mt-6 border-t pt-4 text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-indigo-900">
                ₹{order.totalAmount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
