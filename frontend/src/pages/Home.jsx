import { useEffect, useState } from "react";
import API from "../api/axios";
import cartService from "../services/cartService";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res =
        await API.get("/products");

      setProducts(res.data);
    } catch (error) {
      alert("Error Fetching Products");
    }
  };

  const addToCart = async (id) => {
    try {
      await cartService.addToCart(id, 1);

      alert("Added To Cart");
    } catch (error) {
      alert("Login First");
    }
  };

  // SEARCH FILTER
  const filteredProducts =
    products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="home">

      <div className="top-bar">
        <h1>Products</h1>

        <Link to="/login">
          <button className="login-btn">
            Login
          </button>
        </Link>
      </div>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search products..."
        className="search-bar"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
          >
            <img
              src={product.image_url}
              alt=""
            />

            <h3>{product.title}</h3>

            <p>{product.description}</p>

            <h4>₹ {product.price}</h4>

            <button
              onClick={() =>
                addToCart(product.id)
              }
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;