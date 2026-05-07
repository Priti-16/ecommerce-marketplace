import { useEffect, useState } from "react";
import API from "../api/axios";

function SellerOrders() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get(
        "/orders/seller"
      );

      setOrders(res.data);
    } catch (error) {
      alert("Error Fetching Orders");
    }
  };

  const updateStatus = async (
  orderId,
  status
) => {
  try {
    await API.put(
      `/orders/status/${orderId}`,
      { status }
    );

    fetchOrders();
  } catch (error) {
    alert("Status Update Failed");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Received Orders</h1>

      {orders.length === 0 ? (
        <h3>No Orders Yet</h3>
      ) : (
        orders.map((order) => (
          <div
            key={`${order.order_id}-${order.title}`}
            style={{
              border:
                "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <img
              src={order.image_url}
              alt=""
              width="120"
            />

            <h3>
              {order.title}
            </h3>

            <p>
              Order Number:{" "}
              {order.order_number}
            </p>

            <p>
              Quantity:{" "}
              {order.quantity}
            </p>

            <p>
              Total: ₹{" "}
              {order.subtotal}
            </p>

            <p>
              Status:{" "}
              {order.status}
            </p>

            <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  }}
>
  {order.status ===
    "pending" && (
    <button
      onClick={() =>
        updateStatus(
          order.order_id,
          "processing"
        )
      }
    >
      Confirm
    </button>
  )}

  {order.status ===
    "processing" && (
    <button
      onClick={() =>
        updateStatus(
          order.order_id,
          "shipped"
        )
      }
    >
      Ship Order
    </button>
  )}

  {order.status ===
    "shipped" && (
    <button
      onClick={() =>
        updateStatus(
          order.order_id,
          "delivered"
        )
      }
    >
      Delivered
    </button>
  )}
</div>
          </div>
        ))
      )}
    </div>
  );
}

export default SellerOrders;