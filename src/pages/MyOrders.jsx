import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function MyOrders() {
  const navigate = useNavigate();

  const [retailer, setRetailer] =
    useState(null);

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadRetailer();
  }, []);

  const loadRetailer = () => {
    try {
      const saved =
        localStorage.getItem("c24Retailer");

      if (!saved) {
        setRetailer(null);
        setLoading(false);
        return;
      }

      const data = JSON.parse(saved);

      setRetailer(data);

      loadOrders(data.id);
    } catch (err) {
      console.error(err);

      setError(
        "Retailer login information nahi mil rahi."
      );

      setLoading(false);
    }
  };

  const loadOrders = async (retailerId) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API}/orders/retailer/${retailerId}`
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Orders load failed."
        );
      }

      setOrders(
        Array.isArray(data)
          ? data
          : data.orders || []
      );
    } catch (err) {
      console.error(
        "My orders error:",
        err
      );

      setError(
        err.message ||
          "Orders load nahi ho pa rahe."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "c24Retailer"
    );

    setRetailer(null);
    setOrders([]);

    navigate("/");
  };

  const getStatusClass = (status) => {
    return String(
      status || "New"
    )
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  if (!retailer && !loading) {
    return (
      <section className="my-orders-page">
        <div className="orders-login-box">

          <div className="orders-logo">
            C24
          </div>

          <span>
            C24 WHOLESALE
          </span>

          <h1>
            Login Required
          </h1>

          <p>
            Apne orders dekhne ke liye
            retailer account se login karein.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/retailer-login"
              )
            }
          >
            Retailer Login →
          </button>

          <button
            type="button"
            className="orders-back-button"
            onClick={() =>
              navigate("/")
            }
          >
            ← Back to Website
          </button>

        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="my-orders-page">

        <div className="orders-loading">
          <div className="orders-logo">
            C24
          </div>

          <h2>
            Loading Your Orders...
          </h2>

          <p>
            Please wait.
          </p>
        </div>

      </section>
    );
  }

  return (
    <section className="my-orders-page">

      {/* HEADER */}

      <div className="my-orders-header">

        <div>
          <span className="orders-label">
            C24 WHOLESALE
          </span>

          <h1>
            My Orders
          </h1>

          <p>
            Welcome back,{" "}
            <strong>
              {retailer?.name ||
                retailer?.businessName ||
                "Retailer"}
            </strong>
          </p>
        </div>

        <div className="orders-header-actions">

          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
          >
            ← Website
          </button>

          <button
            type="button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

      {/* ERROR */}

      {error && (
        <div className="orders-error">
          {error}

          {retailer?.id && (
            <button
              type="button"
              onClick={() =>
                loadOrders(
                  retailer.id
                )
              }
            >
              Retry
            </button>
          )}
        </div>
      )}

      {/* SUMMARY */}

      <div className="orders-summary">

        <div className="orders-summary-card">
          <span>
            TOTAL ORDERS
          </span>

          <strong>
            {orders.length}
          </strong>
        </div>

        <div className="orders-summary-card">
          <span>
            ACTIVE ORDERS
          </span>

          <strong>
            {
              orders.filter(
                (order) =>
                  ![
                    "Delivered",
                    "Cancelled",
                  ].includes(
                    order.status
                  )
              ).length
            }
          </strong>
        </div>

        <div className="orders-summary-card">
          <span>
            DELIVERED
          </span>

          <strong>
            {
              orders.filter(
                (order) =>
                  order.status ===
                  "Delivered"
              ).length
            }
          </strong>
        </div>

      </div>

      {/* NO ORDERS */}

      {orders.length === 0 ? (

        <div className="no-orders">

          <div className="no-orders-icon">
            🛒
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            Aapne abhi tak koi wholesale
            order place nahi kiya hai.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
          >
            Browse Products →
          </button>

        </div>

      ) : (

        <div className="my-orders-list">

          {orders.map((order) => (

            <article
              className="my-order-card"
              key={order.id}
            >

              {/* ORDER TOP */}

              <div className="my-order-top">

                <div>

                  <span>
                    ORDER ID
                  </span>

                  <strong>
                    {order.id}
                  </strong>

                  {order.date && (
                    <small>
                      {new Date(
                        order.date
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </small>
                  )}

                </div>

                <span
                  className={`my-order-status ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status || "New"}
                </span>

              </div>

              {/* PRODUCTS */}

              <div className="my-order-products">

                <h3>
                  Order Items
                </h3>

                {Array.isArray(
                  order.items
                ) &&
                  order.items.map(
                    (item, index) => (

                      <div
                        className="my-order-item"
                        key={
                          item.id ||
                          index
                        }
                      >

                        <div>

                          <strong>
                            {item.name}
                          </strong>

                          {item.brand && (
                            <small>
                              {item.brand}
                            </small>
                          )}

                          <small>
                            Quantity:{" "}
                            {item.quantity}
                          </small>

                        </div>

                        <strong>
                          ₹
                          {Number(
                            item.price ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                    )
                  )}

              </div>

              {/* TOTAL */}

              <div className="my-order-bottom">

                <div>

                  <span>
                    ORDER TOTAL
                  </span>

                  <strong>
                    ₹
                    {Number(
                      order.totalAmount ||
                        0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

                <a
                  href={`https://wa.me/919724445650?text=${encodeURIComponent(
                    `Hello C24 Wholesale 👋

I want an update regarding my order.

Order ID: ${order.id}
Status: ${
                      order.status || "New"
                    }`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 Ask on WhatsApp
                </a>

              </div>

            </article>

          ))}

        </div>

      )}

    </section>
  );
}