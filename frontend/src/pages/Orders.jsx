import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get(
        "/orders"
      );

      setOrders(res.data);
    } catch (error) {
      alert("Error Fetching Orders");
    }
  };

  return (
  <div className="orders-page">
    <h1 className="orders-title">
      My Orders
    </h1>

    {orders.length === 0 ? (
      <h3 style={{ color: "white" }}>
        No Orders Found
      </h3>
    ) : (
      <div className="orders-grid">
        {orders.map((order) => (
          <div
            key={order.id}
            className="order-card"
          >
            <h3 className="order-number">
              {order.order_number}
            </h3>

            <p className="order-info">
              Total Amount: ₹
              {order.total_amount}
            </p>

            <p className="order-info">
              Shipping Address:
              {
                order.shipping_address
              }
            </p>

            <div
              className={`order-status status-${order.status}`}
            >
              {order.status}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default Orders;