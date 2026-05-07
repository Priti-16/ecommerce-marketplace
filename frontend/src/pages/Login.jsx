import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async () => {

    try {

      const res = await API.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // UPDATE NAVBAR
      window.dispatchEvent(
        new Event("storage")
      );

      alert("Login Successful");

      // ROLE BASE REDIRECT
      if (res.data.user.role === "admin") {

        navigate("/admin");

      } 
      else if (
        res.data.user.role === "seller"
      ) {

        navigate("/seller");

      } 
      else {

        navigate("/");

      }

    } catch (error) {

      alert("Invalid Email or Password");

    }
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h1 className="login-title">
          Login
        </h1>

        <div className="input-group">

          <label>Email</label>

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

        </div>

        <div className="input-group">

          <label>Password</label>

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

        </div>

        <button
          className="login-btn"
          onClick={login}
        >
          Login
        </button>

        <p className="register-text">
          Don’t have an account?{" "}

          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;