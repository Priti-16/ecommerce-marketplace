import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Cart.css";
function Cart() {
  const [items, setItems] =
    useState([]);

  const [address, setAddress] =
    useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get(
        "/cart"
      );

      setItems(res.data);
    } catch (error) {
      alert("Error Fetching Cart");
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(
        `/cart/${id}`
      );

      fetchCart();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  const placeOrder = async () => {
    if (!address) {
      alert(
        "Enter Shipping Address"
      );

      return;
    }

    try {
      const res = await API.post(
        "/orders",
        {
          shipping_address:
            address,
        }
      );

      alert(res.data.message);

      setAddress("");

      fetchCart();
    } catch (error) {
      alert(
        error.response?.data
          ?.message || "Order Failed"
      );
    }
  };

  // TOTAL PRICE
  const total = items.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>My Cart</h1>

      {items.length === 0 ? (
        <h3>Cart is Empty</h3>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                border:
                  "1px solid #ccc",
                marginBottom: "15px",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <img
                src={item.image_url}
                alt=""
                width="120"
                style={{
                  borderRadius: "10px",
                }}
              />

              <h3>{item.title}</h3>

              <p>
                Quantity:{" "}
                {item.quantity}
              </p>

              <p>
                Price: ₹{" "}
                {item.price}
              </p>

              <button
                onClick={() =>
                  removeItem(item.id)
                }
                style={{
                  padding:
                    "8px 15px",
                  background:
                    "red",
                  color: "white",
                  border: "none",
                  borderRadius:
                    "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h2>
            Total: ₹ {total}
          </h2>

          <textarea
            placeholder="Enter Shipping Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            style={{
              width: "100%",
              height: "100px",
              padding: "10px",
              marginTop: "20px",
            }}
          />

          <br />
          <br />

          <button
            onClick={placeOrder}
            style={{
              padding:
                "12px 25px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;