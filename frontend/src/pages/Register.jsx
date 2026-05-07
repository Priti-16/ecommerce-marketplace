import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const register = async () => {

    try {

      await API.post(
        "/auth/register",
        form
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      alert("Registration Failed");

    }
  };

  return (
    <div className="register-page">

      <div className="register-box">

        <h1 className="register-title">
          Register
        </h1>

        {/* NAME */}
        <div className="input-group">

          <label>Name</label>

          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

        </div>

        {/* EMAIL */}
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

        {/* PASSWORD */}
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

        {/* ROLE */}
        <div className="input-group">

          <label>Role</label>

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          >
            <option value="customer">
              Customer
            </option>

            <option value="seller">
              Seller
            </option>

            {/* <option value="admin">
              Admin
            </option> */}

          </select>

        </div>

        <button
          className="register-btn"
          onClick={register}
        >
          Register
        </button>

        <p className="login-text">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;