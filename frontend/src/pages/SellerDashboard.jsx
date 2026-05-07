import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import "./SellerDashboard.css";

function SellerDashboard() {

  const [products, setProducts] =
    useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock_quantity: "",
    category: "",
    image_url: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await API.get(
        "/seller/products"
      );

      setProducts(res.data);

    } catch (error) {

      alert("Error Fetching Products");

    }
  };

  const addProduct = async () => {

    try {

      await API.post(
        "/seller/products",
        form
      );

      alert("Product Added");

      setForm({
        title: "",
        description: "",
        price: "",
        stock_quantity: "",
        category: "",
        image_url: "",
      });

      fetchProducts();

    } catch (error) {

      alert("Failed To Add Product");

    }
  };

  const deleteProduct = async (id) => {

    try {

      await API.delete(
        `/seller/products/${id}`
      );

      fetchProducts();

    } catch (error) {

      alert("Delete Failed");

    }
  };

  return (
    <div className="seller-page">

      <div className="seller-container">

        <h1 className="seller-title">
          Seller Dashboard
        </h1>
            <Link to="/seller-orders">
              <button
                style={{
                  padding: "10px 20px",
                  background: "#facc15",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Received Orders
              </button>
            </Link>
        {/* ADD PRODUCT */}
        <div className="add-product-box">

          <h3>Add New Product</h3>

          <div className="product-form">

            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Image URL"
              value={form.image_url}
              onChange={(e) =>
                setForm({
                  ...form,
                  image_url:
                    e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Stock Quantity"
              value={form.stock_quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  stock_quantity:
                    e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category:
                    e.target.value,
                })
              }
            />

          </div>

          <button
            className="add-btn"
            onClick={addProduct}
          >
            Add Product
          </button>

        </div>

        {/* PRODUCT LIST */}
        <div className="my-products">

          <h3>My Products</h3>

          {products.map((product) => (

            <div
              className="product-card1"
              key={product.id}
            >

              <img
                src={product.image_url}
                alt=""
                className="product-image"
              />

              <div className="product-info">

                <h4>{product.title}</h4>

                <p>
                  {product.description}
                </p>

              </div>

              <h3 className="product-price">
                ₹ {product.price}
              </h3>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteProduct(
                    product.id
                  )
                }
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default SellerDashboard;