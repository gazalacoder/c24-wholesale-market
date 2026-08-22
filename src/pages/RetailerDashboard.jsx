import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RetailerDashboard.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function RetailerDashboard() {
  const navigate = useNavigate();

  const [retailer, setRetailer] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =====================================================
     LOAD RETAILER
  ===================================================== */

  useEffect(() => {
    const savedRetailer =
      localStorage.getItem("c24_retailer");

    const retailerId =
      localStorage.getItem("c24_retailer_id");

    if (!savedRetailer || !retailerId) {
      navigate("/retailer-login", {
        replace: true,
      });

      return;
    }

    try {
      const parsedRetailer =
        JSON.parse(savedRetailer);

      setRetailer(parsedRetailer);

    } catch (error) {
      console.error(
        "Retailer data error:",
        error
      );

      localStorage.removeItem(
        "c24_retailer"
      );

      localStorage.removeItem(
        "c24_retailer_id"
      );

      navigate("/retailer-login", {
        replace: true,
      });
    } finally {
      setLoading(false);
    }
  }, [navigate]);


  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = () => {
    localStorage.removeItem(
      "c24_retailer"
    );

    localStorage.removeItem(
      "c24_retailer_id"
    );

    navigate("/retailer-login", {
      replace: true,
    });
  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="retailer-dashboard-loading">
        <h2>
          Loading Dashboard...
        </h2>
      </div>
    );
  }


  if (!retailer) {
    return null;
  }


  /* =====================================================
     ENQUIRY HISTORY
  ===================================================== */

  const enquiries =
    Array.isArray(retailer.enquiries)
      ? [...retailer.enquiries].reverse()
      : [];


  /* =====================================================
     UI
  ===================================================== */

  return (
    <section className="retailer-dashboard">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="retailer-dashboard-header">

        <div>

          <span>
            C24 WHOLESALE
          </span>

          <h1>
            Retailer Dashboard
          </h1>

        </div>


        <div className="retailer-header-actions">

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >
            Browse Products
          </button>


          <button
            type="button"
            onClick={logout}
            className="logout-button"
          >
            Logout
          </button>

        </div>

      </header>


      {/* =================================================
          WELCOME
      ================================================= */}

      <div className="retailer-welcome">

        <div>

          <span>
            WELCOME BACK
          </span>

          <h2>
            {retailer.name ||
              "Retailer"}
          </h2>

          <p>
            Manage your wholesale account
            and enquiries from here.
          </p>

        </div>


        <div className="retailer-account-badge">
          RETAILER
        </div>

      </div>


      {/* =================================================
          ACCOUNT STATS
      ================================================= */}

      <div className="retailer-stats">


        <div className="retailer-stat-card">

          <span>
            BUSINESS
          </span>

          <strong>
            {retailer.businessName ||
              "Not Added"}
          </strong>

        </div>


        <div className="retailer-stat-card">

          <span>
            PHONE
          </span>

          <strong>
            {retailer.phone ||
              "Not Added"}
          </strong>

        </div>


        <div className="retailer-stat-card">

          <span>
            EMAIL
          </span>

          <strong>
            {retailer.email ||
              "Not Added"}
          </strong>

        </div>


        <div className="retailer-stat-card">

          <span>
            ENQUIRIES
          </span>

          <strong>
            {enquiries.length}
          </strong>

        </div>

      </div>


      {/* =================================================
          QUICK ACTIONS
      ================================================= */}

      <div className="retailer-section">

        <div className="retailer-section-heading">

          <span>
            QUICK ACTIONS
          </span>

          <h2>
            Wholesale Shopping
          </h2>

        </div>


        <div className="retailer-actions">


          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >

            <span>
              📦
            </span>

            <strong>
              Browse Products
            </strong>

            <small>
              Explore wholesale products
            </small>

          </button>


          <button
            type="button"
            onClick={() =>
              navigate("/enquiry")
            }
          >

            <span>
              📩
            </span>

            <strong>
              New Enquiry
            </strong>

            <small>
              Send a wholesale enquiry
            </small>

          </button>


          <button
            type="button"
            onClick={() =>
              navigate("/offers")
            }
          >

            <span>
              🔥
            </span>

            <strong>
              Daily Offers
            </strong>

            <small>
              View latest wholesale deals
            </small>

          </button>

        </div>

      </div>


      {/* =================================================
          ENQUIRY HISTORY
      ================================================= */}

      <div className="retailer-section">

        <div className="retailer-section-heading">

          <span>
            RETAILER ACTIVITY
          </span>

          <h2>
            Enquiry History
          </h2>

        </div>


        {enquiries.length === 0 ? (

          <div className="retailer-empty">

            <div>
              📩
            </div>

            <h3>
              No Enquiries Yet
            </h3>

            <p>
              Aapki wholesale enquiries
              yahan दिखाई देंगी.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/products")
              }
            >
              Browse Products →
            </button>

          </div>

        ) : (

          <div className="retailer-orders">

            {enquiries.map(
              (enquiry) => (

                <div
                  className="retailer-order-card"
                  key={enquiry.id}
                >

                  <div>

                    <span>
                      ENQUIRY #
                      {enquiry.id}
                    </span>

                    <h3>
                      {enquiry.product ||
                        "Wholesale Product"}
                    </h3>

                    <small>
                      Quantity:{" "}
                      {enquiry.quantity ||
                        0}
                    </small>

                    {enquiry.message && (
                      <p>
                        {enquiry.message}
                      </p>
                    )}

                  </div>


                  <div>

                    <strong>
                      {enquiry.status ||
                        "New"}
                    </strong>

                    <small>
                      {enquiry.date
                        ? new Date(
                            enquiry.date
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "N/A"}
                    </small>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* =================================================
          ACCOUNT DETAILS
      ================================================= */}

      <div className="retailer-section">

        <div className="retailer-section-heading">

          <span>
            ACCOUNT INFORMATION
          </span>

          <h2>
            Your Details
          </h2>

        </div>


        <div className="retailer-stats">


          <div className="retailer-stat-card">

            <span>
              NAME
            </span>

            <strong>
              {retailer.name ||
                "N/A"}
            </strong>

          </div>


          <div className="retailer-stat-card">

            <span>
              BUSINESS
            </span>

            <strong>
              {retailer.businessName ||
                "N/A"}
            </strong>

          </div>


          <div className="retailer-stat-card">

            <span>
              PHONE
            </span>

            <strong>
              {retailer.phone ||
                "N/A"}
            </strong>

          </div>


          <div className="retailer-stat-card">

            <span>
              GST NUMBER
            </span>

            <strong>
              {retailer.gstNumber ||
                "Not Added"}
            </strong>

          </div>

        </div>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="retailer-dashboard-footer">

        <button
          type="button"
          onClick={() =>
            navigate("/")
          }
        >
          ← Back to C24 Store
        </button>

      </footer>

    </section>
  );
}