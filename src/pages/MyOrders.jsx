import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, BACKEND_URL } from "../api"; // ✅ Central API import kiya
import "./MyOrders.css";

export default function MyOrders() {
  const navigate = useNavigate();

  const [retailer, setRetailer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRetailer();
  }, []);

  const loadRetailer = () => {
    try {
      const saved =
        localStorage.getItem("c24Retailer") ||
        localStorage.getItem("c24_retailer");

      if (!saved) {
        setRetailer(null);
        setLoading(false);
        return;
      }

      const data = JSON.parse(saved);

      if (!data?.id) {
        setError("Retailer account information incomplete hai.");
        setLoading(false);
        return;
      }

      setRetailer(data);
      loadOrders(data.id);
    } catch (err) {
      console.error("Retailer load error:", err);
      setError("Retailer login information nahi mil rahi.");
      setLoading(false);
    }
  };

  const loadOrders = async (retailerId) => {
    try {
      setLoading(true);
      setError("");

      // ✅ API_URL use kiya
      const response = await fetch(`${API_URL}/orders/retailer/${retailerId}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Orders load failed.");
      }

      const orderList = Array.isArray(data)
        ? data
        : Array.isArray(data?.orders)
        ? data.orders
        : [];

      // Latest orders first
      orderList.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date || 0).getTime();
        const dateB = new Date(b.createdAt || b.date || 0).getTime();
        return dateB - dateA;
      });

      setOrders(orderList);
    } catch (err) {
      console.error("My orders error:", err);
      setError(err.message || "Orders load nahi ho pa rahe.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("c24Retailer");
    localStorage.removeItem("c24_retailer");

    setRetailer(null);
    setOrders([]);

    navigate("/");
  };

  const getStatusClass = (status) => {
    return String(status || "New")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "Date unavailable";

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "";

    return parsed.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getItemPrice = (item) => {
    return Number(item?.price || item?.wholesalePrice || 0);
  };

  const getItemSubtotal = (item) => {
    const price = getItemPrice(item);
    const quantity = Number(item?.quantity || 1);
    return price * quantity;
  };

  const getOrderTotal = (order) => {
    if (order?.totalAmount !== undefined && order?.totalAmount !== null) {
      return Number(order.totalAmount);
    }

    if (Array.isArray(order?.items)) {
      return order.items.reduce((total, item) => total + getItemSubtotal(item), 0);
    }

    return 0;
  };

  /* ✅ Image ka path theek kiya */
  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http") || image.startsWith("data:")) return image;
    return `${BACKEND_URL}/${image.replace(/^\/+/, "")}`;
  };

  const activeOrders = orders.filter(
    (order) => !["Delivered", "Cancelled"].includes(order?.status)
  );

  const deliveredOrders = orders.filter((order) => order?.status === "Delivered");
  const cancelledOrders = orders.filter((order) => order?.status === "Cancelled");

  if (!retailer && !loading) {
    return (
      <section className="my-orders-page">
        <div className="orders-login-box">
          <div className="orders-logo">C24</div>
          <span>C24 WHOLESALE</span>
          <h1>Login Required</h1>
          <p>Apne orders dekhne ke liye retailer account se login karein.</p>
          <button type="button" onClick={() => navigate("/retailer-login")}>
            Retailer Login →
          </button>
          <button type="button" className="orders-back-button" onClick={() => navigate("/")}>
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
          <div className="orders-logo">C24</div>
          <h2>Loading Your Orders...</h2>
          <p>Please wait.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="my-orders-page">
      {/* HEADER */}
      <div className="my-orders-header">
        <div>
          <span className="orders-label">C24 WHOLESALE</span>
          <h1>My Orders</h1>
          <p>
            Welcome back,{" "}
            <strong>{retailer?.name || retailer?.businessName || "Retailer"}</strong>
          </p>
        </div>

        <div className="orders-header-actions">
          <button type="button" onClick={() => navigate("/")}>← Website</button>
          <button
            type="button"
            onClick={() => {
              if (retailer?.id) {
                loadOrders(retailer.id);
              }
            }}
          >
            ↻ Refresh
          </button>
          <button type="button" onClick={logout}>Logout</button>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="orders-error">
          <span>{error}</span>
          {retailer?.id && (
            <button type="button" onClick={() => loadOrders(retailer.id)}>
              Retry
            </button>
          )}
        </div>
      )}

      {/* SUMMARY */}
      <div className="orders-summary">
        <div className="orders-summary-card">
          <span>TOTAL ORDERS</span>
          <strong>{orders.length}</strong>
        </div>
        <div className="orders-summary-card">
          <span>ACTIVE ORDERS</span>
          <strong>{activeOrders.length}</strong>
        </div>
        <div className="orders-summary-card">
          <span>DELIVERED</span>
          <strong>{deliveredOrders.length}</strong>
        </div>
        <div className="orders-summary-card">
          <span>CANCELLED</span>
          <strong>{cancelledOrders.length}</strong>
        </div>
      </div>

      {/* NO ORDERS */}
      {orders.length === 0 ? (
        <div className="no-orders">
          <div className="no-orders-icon">🛒</div>
          <h2>No Orders Yet</h2>
          <p>Aapne abhi tak koi wholesale order place nahi kiya hai.</p>
          <button type="button" onClick={() => navigate("/")}>
            Browse Products →
          </button>
        </div>
      ) : (
        /* ORDERS */
        <div className="my-orders-list">
          {orders.map((order) => {
            const orderDate = order.createdAt || order.date;

            return (
              <article className="my-order-card" key={order.id}>
                {/* ORDER HEADER */}
                <div className="my-order-top">
                  <div className="order-id-block">
                    <span>ORDER ID</span>
                    <strong>{order.id || "N/A"}</strong>
                    <small>
                      {formatDate(orderDate)}
                      {formatTime(orderDate) ? ` • ${formatTime(orderDate)}` : ""}
                    </small>
                  </div>
                  <span className={`my-order-status ${getStatusClass(order.status)}`}>
                    {order.status || "New"}
                  </span>
                </div>

                {/* CUSTOMER DETAILS */}
                <div className="my-order-customer">
                  <h3>Customer Details</h3>
                  <div className="customer-details-grid">
                    <div>
                      <span>Name</span>
                      <strong>{order.name || retailer?.name || "N/A"}</strong>
                    </div>
                    <div>
                      <span>Business</span>
                      <strong>{retailer?.businessName || order.retailerName || "N/A"}</strong>
                    </div>
                    <div>
                      <span>Phone</span>
                      <strong>{order.phone || "N/A"}</strong>
                    </div>
                    <div>
                      <span>Email</span>
                      <strong>{order.email || "N/A"}</strong>
                    </div>
                  </div>
                </div>

                {/* PRODUCTS */}
                <div className="my-order-products">
                  <h3>Order Items</h3>

                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    order.items.map((item, index) => {
                      const quantity = Number(item?.quantity || 1);
                      const price = getItemPrice(item);
                      const subtotal = getItemSubtotal(item);

                      return (
                        <div
                          className="my-order-item"
                          key={item?.productId || item?.id || index}
                        >
                          {/* PRODUCT IMAGE */}
                          <div className="my-order-item-image">
                            {item?.image ? (
                              <img src={getImageUrl(item.image)} alt={item?.name || "Product"} />
                            ) : (
                              <div>📦</div>
                            )}
                          </div>

                          {/* PRODUCT INFO */}
                          <div className="my-order-item-info">
                            <strong>{item?.name || "Product"}</strong>
                            {item?.brand && <small>Brand: {item.brand}</small>}
                            {item?.category && <small>Category: {item.category}</small>}
                            <small>Quantity: {quantity}</small>
                          </div>

                          {/* PRICE */}
                          <div className="my-order-item-price">
                            <span>₹{price.toLocaleString("en-IN")} × {quantity}</span>
                            <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>Order items unavailable.</p>
                  )}
                </div>

                {/* ORDER MESSAGE */}
                {order.message && (
                  <div className="my-order-message">
                    <strong>Order Note</strong>
                    <p>{order.message}</p>
                  </div>
                )}

                {/* TOTAL */}
                <div className="my-order-bottom">
                  <div className="order-total-box">
                    <span>ORDER TOTAL</span>
                    <strong>₹{getOrderTotal(order).toLocaleString("en-IN")}</strong>
                  </div>

                  <a
                    href={`https://wa.me/919724445650?text=${encodeURIComponent(
                      `Hello C24 Wholesale 👋\n\nI want an update regarding my order.\n\nOrder ID: ${order.id}\nStatus: ${order.status || "New"}\nTotal: ₹${getOrderTotal(order).toLocaleString("en-IN")}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 Ask on WhatsApp
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}