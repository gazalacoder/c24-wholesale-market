import { useEffect, useState } from "react";
import "./Orders.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================
  // LOAD ORDERS
  // =========================================

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API}/orders`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Orders load failed"
        );
      }

      setOrders(
        Array.isArray(data)
          ? data
          : data.orders || []
      );
    } catch (err) {
      console.error("Orders error:", err);

      setError(
        err.message ||
          "Orders load nahi ho pa rahe."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // =========================================
  // UPDATE STATUS
  // =========================================

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API}/orders/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Status update failed"
        );
      }

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          String(order.id) === String(id)
            ? {
                ...order,
                status,
              }
            : order
        )
      );
    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      alert(
        err.message ||
          "Status update nahi hua."
      );
    }
  };

  // =========================================
  // DELETE ORDER
  // =========================================

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Kya aap ye order delete karna chahte ho?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API}/orders/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Order delete failed"
        );
      }

      setOrders((previousOrders) =>
        previousOrders.filter(
          (order) =>
            String(order.id) !== String(id)
        )
      );
    } catch (err) {
      console.error(
        "Delete order error:",
        err
      );

      alert(
        err.message ||
          "Order delete nahi hua."
      );
    }
  };

  // =========================================
  // FORMAT PRICE
  // =========================================

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString(
      "en-IN"
    );
  };

  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  // =========================================
  // STATUS CLASS
  // =========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "status-confirmed";

      case "Processing":
        return "status-processing";

      case "Shipped":
        return "status-shipped";

      case "Delivered":
        return "status-delivered";

      case "Cancelled":
        return "status-cancelled";

      default:
        return "status-new";
    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          <div>
            <strong>
              Loading Orders...
            </strong>

            <span>
              C24 Wholesale
            </span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================
  // PAGE
  // =========================================

  return (
    <div className="orders-page">

      {/* HEADER */}

      <div className="orders-header">

        <div>
          <span className="orders-header-label">
            CUSTOMER ORDERS
          </span>

          <h1>
            Wholesale Orders
          </h1>

          <p className="orders-header-description">
            Manage customer wholesale orders
            and update order status.
          </p>
        </div>

        <button
          type="button"
          className="orders-refresh"
          onClick={loadOrders}
        >
          ↻ Refresh
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div className="orders-error">
          <strong>
            Error:
          </strong>{" "}
          {error}

          <button
            type="button"
            onClick={loadOrders}
          >
            Retry
          </button>
        </div>
      )}

      {/* STATS */}

      <div className="orders-stats">

        <div className="order-stat-card">
          <span>
            TOTAL ORDERS
          </span>

          <strong>
            {orders.length}
          </strong>
        </div>

        <div className="order-stat-card">
          <span>
            NEW ORDERS
          </span>

          <strong>
            {
              orders.filter(
                (order) =>
                  (order.status || "New") ===
                  "New"
              ).length
            }
          </strong>
        </div>

        <div className="order-stat-card">
          <span>
            PROCESSING
          </span>

          <strong>
            {
              orders.filter(
                (order) =>
                  order.status ===
                  "Processing"
              ).length
            }
          </strong>
        </div>

        <div className="order-stat-card">
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

      {/* EMPTY */}

      {orders.length === 0 ? (
        <div className="orders-empty">

          <div className="orders-empty-icon">
            📦
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            Customer ke orders yahan
            दिखाई देंगे.
          </p>

          <button
            type="button"
            onClick={loadOrders}
          >
            ↻ Refresh Orders
          </button>

        </div>
      ) : (

        /* ORDER LIST */

        <div className="orders-list">

          {orders.map((order) => {

            const status =
              order.status || "New";

            return (
              <article
                className="order-card"
                key={order.id}
              >

                {/* ORDER TOP */}

                <div className="order-top">

                  <div>
                    <span className="order-id-label">
                      ORDER ID
                    </span>

                    <h3 className="order-id">
                      {order.id}
                    </h3>
                  </div>

                  <div className="order-date-box">

                    <span className="order-date-label">
                      ORDER DATE
                    </span>

                    <p className="order-date">
                      {formatDate(
                        order.createdAt
                      )}
                    </p>

                  </div>

                  <div
                    className={`order-status-badge ${getStatusClass(
                      status
                    )}`}
                  >
                    {status}
                  </div>

                </div>

                {/* CUSTOMER */}

                <div className="order-customer">

                  <h3 className="order-section-title">
                    Customer Details
                  </h3>

                  <div className="customer-details">

                    <div className="customer-item">
                      <span>
                        Customer
                      </span>

                      <strong>
                        👤{" "}
                        {order.retailerName ||
                          order.name ||
                          "Retailer"}
                      </strong>
                    </div>

                    <div className="customer-item">
                      <span>
                        Phone
                      </span>

                      <strong>
                        📞{" "}
                        {order.phone ||
                          "N/A"}
                      </strong>
                    </div>

                    <div className="customer-item">
                      <span>
                        Email
                      </span>

                      <strong>
                        📧{" "}
                        {order.email ||
                          "N/A"}
                      </strong>
                    </div>

                  </div>

                </div>

                {/* PRODUCTS */}

                <div className="order-products">

                  <h3 className="order-section-title">
                    Products
                  </h3>

                  {Array.isArray(
                    order.items
                  ) &&
                    order.items.length > 0 ? (

                    <div className="order-products-list">

                      {order.items.map(
                        (item, index) => {

                          const quantity =
                            Number(
                              item.quantity ||
                                1
                            );

                          const price =
                            Number(
                              item.price ||
                                item.wholesalePrice ||
                                0
                            );

                          const itemTotal =
                            quantity * price;

                          return (
                            <div
                              className="order-product"
                              key={
                                item.productId ||
                                item.id ||
                                index
                              }
                            >

                              <div className="order-product-name">

                                <strong>
                                  {item.name ||
                                    "Product"}
                                </strong>

                                {item.brand && (
                                  <small>
                                    {item.brand}
                                  </small>
                                )}

                              </div>

                              <div className="order-product-qty">
                                Qty:{" "}
                                {quantity}
                              </div>

                              <div className="order-product-price">
                                ₹
                                {formatPrice(
                                  price
                                )}
                              </div>

                              <div className="order-product-total">
                                ₹
                                {formatPrice(
                                  itemTotal
                                )}
                              </div>

                            </div>
                          );
                        }
                      )}

                    </div>

                  ) : (
                    <p className="no-order-items">
                      No product details available.
                    </p>
                  )}

                </div>

                {/* TOTAL */}

                <div className="order-total">

                  <span>
                    ORDER TOTAL
                  </span>

                  <strong>
                    ₹
                    {formatPrice(
                      order.totalAmount
                    )}
                  </strong>

                </div>

                {/* MESSAGE */}

                {order.message && (
                  <div className="order-message">

                    <strong>
                      Customer Message
                    </strong>

                    <p>
                      {order.message}
                    </p>

                  </div>
                )}

                {/* ACTIONS */}

                <div className="order-actions">

                  <div className="order-status-control">

                    <label>
                      Update Status
                    </label>

                    <select
                      className="order-status"
                      value={status}
                      onChange={(e) =>
                        updateStatus(
                          order.id,
                          e.target.value
                        )
                      }
                    >
                      <option value="New">
                        New
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>

                  </div>

                  <button
                    type="button"
                    className="order-delete"
                    onClick={() =>
                      deleteOrder(
                        order.id
                      )
                    }
                  >
                    🗑 Delete Order
                  </button>

                </div>

              </article>
            );
          })}

        </div>
      )}

    </div>
  );
}