import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AdminDashboard.css";

function AdminDashboard() {

  const [sellers, setSellers] =
    useState([]);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {

    try {

      const res = await API.get(
        "/admin/sellers"
      );

      setSellers(res.data);

    } catch (error) {

      alert("Error Fetching Sellers");

    }
  };

  const approveSeller = async (id) => {

    try {

      await API.put(
        `/admin/sellers/${id}/approve`
      );

      fetchSellers();

    } catch (error) {

      alert("Approval Failed");

    }
  };

  const rejectSeller = async (id) => {

    try {

      await API.put(
        `/admin/sellers/${id}/reject`
      );

      fetchSellers();

    } catch (error) {

      alert("Reject Failed");

    }
  };

  return (
    <div className="admin-page">

      <div className="admin-container">

        <h1 className="admin-title">
          Admin Dashboard
        </h1>

        <div className="table-box">

          <table>

            <thead>

              <tr>
                <th>Seller</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {sellers.map((seller) => (

                <tr key={seller.id}>

                  <td>{seller.name}</td>

                  <td>{seller.email}</td>

                  <td>

                    <span
                      className={`status ${seller.status}`}
                    >
                      {seller.status}
                    </span>

                  </td>

                  <td>

                    <button
                      className="approve-btn"
                      onClick={() =>
                        approveSeller(
                          seller.id
                        )
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        rejectSeller(
                          seller.id
                        )
                      }
                    >
                      Reject
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;