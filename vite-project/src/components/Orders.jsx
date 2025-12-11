import { useEffect } from "react";

const Orders = ({ orders, setOrders }) => {
  
  // Fetch orders from backend on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [setOrders]);

  return (
    <div className="max-w-5xl mx-auto p-5 mt-10">
      <h1 className="text-3xl font-bold mb-5 text-indigo-900 text-center">
        Your Previous Orders
      </h1>

      {orders.length === 0 ? (
        <div className="border rounded-xl p-6 bg-white shadow-md text-center text-gray-700">
          No orders yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-xl bg-white shadow-lg"
            >
              <h2 className="font-bold text-indigo-900 text-lg mb-2">
                Order ID: {order.id}
              </h2>

              <p className="text-gray-600 mb-3">
                Date: {new Date(order.date).toLocaleString()}
              </p>

              <div className="space-y-4">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-center border p-3 rounded-lg bg-indigo-50"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-indigo-900">{item.name}</h3>
                      <p className="text-gray-700">Qty: {item.quantity}</p>
                      <p className="font-semibold text-indigo-800">₹{item.total}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 font-bold text-indigo-900 text-lg">
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
