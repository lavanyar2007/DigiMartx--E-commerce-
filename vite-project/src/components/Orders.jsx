import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Orders = ({ orders, setOrders }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [setOrders, token]);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-extrabold mb-8 text-indigo-900 text-center tracking-wide">
        Your Previous Orders
      </h1>

      {!Array.isArray(orders) || orders.length === 0 ? (
        <div className="border-2 border-indigo-200 rounded-2xl p-8 bg-indigo-50 shadow-md text-center text-indigo-800 font-semibold text-lg">
          No orders yet.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border-2 border-indigo-300 p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="font-bold text-indigo-900 text-xl mb-3">
                Order ID: {order.id}
              </h2>

              <p className="text-indigo-700 mb-4 italic">
                Date: {new Date(order.date).toLocaleString()}
              </p>

              <div className="space-y-4">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-center border border-indigo-200 p-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 object-cover rounded-md border border-indigo-300"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-indigo-900 text-lg">
                        {item.name}
                      </h3>
                      <p className="text-indigo-700">Qty: {item.quantity}</p>
                      <p className="font-bold text-indigo-800 mt-1">
                        ₹{item.total}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/products/${item.id}`, { state: item })
                      }
                      className="bg-indigo-900 text-white font-semibold py-1 px-3 rounded hover:bg-indigo-800 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6 font-bold text-indigo-900 text-lg border-t border-indigo-200 pt-3">
                <span>Total Amount:</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
