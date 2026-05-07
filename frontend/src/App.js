import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Orders from "./pages/Orders";
import SellerOrders from "./pages/SellerOrders";
function App() {

  const [user, setUser] = useState(null);

  // AUTO UPDATE USER
  useEffect(() => {

    const loadUser = () => {
      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    loadUser();

    // LISTEN STORAGE CHANGE
    window.addEventListener(
      "storage",
      loadUser
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadUser
      );
    };

  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/login";
  };

  return (
    <BrowserRouter>

      {/* NAVBAR */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  }}
>

  {/* LEFT */}
  <div
    style={{
      display: "flex",
      gap: "20px",
      alignItems: "center",
    }}
  >

    <Link to="/">Home</Link>

    {!user && (
      <>
        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>
      </>
    )}

    {user?.role === "customer" && (
      <Link to="/cart">
        Cart
      </Link>
    )}
    {/* CUSTOMER */}
      {user?.role === "customer" && (
        <Link to="/orders">
          My Orders
        </Link>
      )}

      {/* SELLER */}
      {user?.role === "seller" && (
        <Link to="/seller-orders">
          Received Orders
        </Link>
      )}
    {user?.role === "seller" && (
      <Link to="/seller">
        Seller Dashboard
      </Link>
    )}

    {user?.role === "admin" && (
      <Link to="/admin">
        Admin Dashboard
      </Link>
    )}

  </div>

  {/* RIGHT */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "15px",
    }}
  >

    {user && (
      <h4
        style={{
          margin: 0,
          textTransform: "capitalize",
        }}
      >
        Welcome, {user.name}
      </h4>
    )}

    {user && (
      <button
        onClick={logout}
        style={{
          padding: "8px 14px",
          border: "none",
          background: "#dc3545",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    )}

  </div>

</div>

      {/* ROUTES */}
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cart"
          element={
            user?.role === "customer"
              ? <Cart />
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/seller-orders"
          element={<SellerOrders />}
        />
        <Route
          path="/seller"
          element={
            user?.role === "seller"
              ? <SellerDashboard />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/admin"
          element={
            user?.role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;