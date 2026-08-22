import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RetailerProfile.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function RetailerProfile() {
  const navigate = useNavigate();

  const [retailer, setRetailer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "c24Retailer"
      );

    if (!saved) {
      navigate("/retailer");
      return;
    }

    try {
      const account =
        JSON.parse(saved);

      loadProfile(account.id);
    } catch {
      localStorage.removeItem(
        "c24Retailer"
      );

      navigate("/retailer");
    }
  }, [navigate]);

  const loadProfile = async (id) => {
    try {
      const response =
        await fetch(
          `${API}/retailers/${id}`
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Profile load failed"
        );
      }

      setRetailer(
        data.retailer
      );
    } catch (error) {
      console.error(error);

      const saved =
        localStorage.getItem(
          "c24Retailer"
        );

      if (saved) {
        setRetailer(
          JSON.parse(saved)
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "c24Retailer"
    );

    navigate("/");
  };

  if (loading) {
    return (
      <section className="retailer-profile">
        <div className="profile-box">
          Loading profile...
        </div>
      </section>
    );
  }

  if (!retailer) {
    return null;
  }

  return (
    <section className="retailer-profile">

      <div className="profile-box">

        {/* HEADER */}

        <div className="profile-header">

          <div>

            <span>
              C24 WHOLESALE
            </span>

            <h1>
              Retailer Profile
            </h1>

            <p>
              Manage your wholesale
              account and business details.
            </p>

          </div>

          <button
            type="button"
            onClick={logout}
          >
            Logout
          </button>

        </div>


        {/* BUSINESS */}

        <div className="profile-card">

          <div className="profile-card-label">
            BUSINESS DETAILS
          </div>

          <div className="profile-grid">

            <div>
              <small>
                Full Name
              </small>

              <strong>
                {retailer.name ||
                  "Not available"}
              </strong>
            </div>

            <div>
              <small>
                Business Name
              </small>

              <strong>
                {retailer.businessName ||
                  "Not available"}
              </strong>
            </div>

            <div>
              <small>
                Phone
              </small>

              <strong>
                {retailer.phone ||
                  "Not available"}
              </strong>
            </div>

            <div>
              <small>
                Email
              </small>

              <strong>
                {retailer.email ||
                  "Not available"}
              </strong>
            </div>

            <div>
              <small>
                GST Number
              </small>

              <strong>
                {retailer.gstNumber ||
                  "Not provided"}
              </strong>
            </div>

          </div>

        </div>


        {/* ENQUIRIES */}

        <div className="profile-card">

          <div className="profile-card-label">
            PAST ENQUIRIES
          </div>

          {!retailer.enquiries ||
          retailer.enquiries.length ===
            0 ? (

            <div className="profile-empty">

              <h3>
                No enquiries yet
              </h3>

              <p>
                Products se WhatsApp
                enquiry karne ke baad
                yahan history show hogi.
              </p>

              <Link to="/products">
                Browse Products →
              </Link>

            </div>

          ) : (

            <div className="profile-list">

              {retailer.enquiries.map(
                (item, index) => (

                  <div
                    className="profile-list-row"
                    key={
                      item.id ||
                      index
                    }
                  >

                    <strong>
                      {item.product ||
                        "Product enquiry"}
                    </strong>

                    <span>
                      {item.date ||
                        ""}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        {/* ORDERS */}

        <div className="profile-card">

          <div className="profile-card-label">
            ORDERS
          </div>

          {!retailer.orders ||
          retailer.orders.length ===
            0 ? (

            <div className="profile-empty">

              <h3>
                No orders yet
              </h3>

              <p>
                Your wholesale orders
                will appear here.
              </p>

            </div>

          ) : (

            <div className="profile-list">

              {retailer.orders.map(
                (order, index) => (

                  <div
                    className="profile-list-row"
                    key={
                      order.id ||
                      index
                    }
                  >

                    <strong>
                      {order.product ||
                        `Order #${index + 1}`}
                    </strong>

                    <span>
                      {order.status ||
                        "Pending"}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        {/* ACTIONS */}

        <div className="profile-actions">

          <Link to="/products">
            ← Continue Shopping
          </Link>

          <button
            type="button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </section>
  );
}