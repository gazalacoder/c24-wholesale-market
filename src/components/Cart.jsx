import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

// ✅ BASE URL for videos
const BASE = import.meta.env.BASE_URL;

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [retailer, setRetailer] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  // ✅ Order states
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderCancelled, setOrderCancelled] = useState(false);

  // ✅ Welcome back video state
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  // ✅ Address form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    addressType: "home", // home | office | other
  });

  /* =====================================================
     LOAD DATA
  ===================================================== */

  useEffect(() => {
    loadCart();

    const savedRetailer =
      localStorage.getItem("c24Retailer") ||
      localStorage.getItem("c24_retailer");

    if (savedRetailer) {
      try {
        const r = JSON.parse(savedRetailer);
        setRetailer(r);

        // ✅ Auto-fill address form
        setAddress((prev) => ({
          ...prev,
          fullName: r.name || r.businessName || "",
          phone: r.phone || "",
          email: r.email || "",
          addressLine: r.address || "",
          city: r.city || "",
          state: r.state || "",
          pincode: r.pincode || "",
        }));
      } catch {
        setRetailer(null);
      }
    }

    // ✅ WELCOME BACK VIDEO CHECK
    const hasVisited = localStorage.getItem("c24_visited");

    if (hasVisited === "true") {
      setShowWelcomeBack(true);

      setTimeout(() => {
        setShowWelcomeBack(false);
      }, 4000);
    } else {
      localStorage.setItem("c24_visited", "true");
    }
  }, []);

  /* =====================================================
     LOAD CART
  ===================================================== */

  const loadCart = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("c24Cart") || "[]"
      );

      setCart(Array.isArray(saved) ? saved : []);
    } catch {
      setCart([]);
    }
  };

  /* =====================================================
     UPDATE CART
  ===================================================== */

  const saveCart = (newCart) => {
    setCart(newCart);

    localStorage.setItem(
      "c24Cart",
      JSON.stringify(newCart)
    );

    window.dispatchEvent(new Event("storage"));
  };

  /* =====================================================
     INCREASE
  ===================================================== */

  const increase = (item) => {
    const newCart = cart.map((product) => {
      if (String(product.id) !== String(item.id)) {
        return product;
      }

      return {
        ...product,
        quantity: Number(product.quantity || 1) + 1,
      };
    });

    saveCart(newCart);
  };

  /* =====================================================
     DECREASE
  ===================================================== */

  const decrease = (item) => {
    const newCart = cart
      .map((product) => {
        if (String(product.id) !== String(item.id)) {
          return product;
        }

        return {
          ...product,
          quantity: Number(product.quantity || 1) - 1,
        };
      })
      .filter((product) => Number(product.quantity || 0) > 0);

    saveCart(newCart);
  };

  /* =====================================================
     REMOVE
  ===================================================== */

  const removeItem = (item) => {
    const newCart = cart.filter(
      (product) => String(product.id) !== String(item.id)
    );

    saveCart(newCart);
  };

  /* =====================================================
     TOTAL
  ===================================================== */

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = Number(item.price || 0);
      const quantity = Number(item.quantity || 1);

      return sum + price * quantity;
    }, 0);
  }, [cart]);

  /* =====================================================
     ADDRESS HANDLE
  ===================================================== */

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     VALIDATE ADDRESS
  ===================================================== */

  const validateAddress = () => {
    if (!address.fullName.trim()) {
      setError("Full name required hai.");
      return false;
    }

    if (!address.phone.trim() || address.phone.length < 10) {
      setError("Valid phone number required hai.");
      return false;
    }

    if (!address.addressLine.trim()) {
      setError("Address required hai.");
      return false;
    }

    if (!address.city.trim()) {
      setError("City required hai.");
      return false;
    }

    if (!address.state.trim()) {
      setError("State required hai.");
      return false;
    }

    if (!address.pincode.trim() || address.pincode.length < 6) {
      setError("Valid pincode required hai.");
      return false;
    }

    return true;
  };

  /* =====================================================
     PLACE ORDER (Open Address Form)
  ===================================================== */

  const openAddressForm = () => {
    setError("");
    setMessage("");

    if (!retailer) {
      setError(
        "Order place karne ke liye retailer login required hai."
      );
      return;
    }

    if (cart.length === 0) {
      setError("Cart empty hai.");
      return;
    }

    // ✅ Address form kholo
    setShowAddressForm(true);
  };

  /* =====================================================
     FINAL ORDER SUBMIT (Address ke baad)
  ===================================================== */

  const submitOrder = async () => {
    setError("");

    if (!validateAddress()) {
      return;
    }

    setPlacing(true);

    try {
      const response = await fetch(`${API}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          retailerId: retailer.id,
          retailerName:
            retailer.name ||
            retailer.businessName ||
            "Retailer",
          name: address.fullName,
          phone: address.phone,
          email: address.email,
          address: {
            fullName: address.fullName,
            phone: address.phone,
            email: address.email,
            addressLine: address.addressLine,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            landmark: address.landmark,
            addressType: address.addressType,
          },
          items: cart.map((item) => ({
            productId: item.id,
            name: item.name,
            brand: item.brand || "",
            quantity: Number(item.quantity || 1),
            price: Number(item.price || 0),
            image: item.image || "",
          })),
          totalAmount: total,
          message: "Order placed from C24 retailer cart.",
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        throw new Error("Server ne valid response nahi diya.");
      }

      if (!response.ok) {
        throw new Error(data.message || "Order place nahi hua.");
      }

      /* CLEAR CART */
      localStorage.removeItem("c24Cart");
      setCart([]);

      /* CLOSE FORM */
      setShowAddressForm(false);

      /* SUCCESS */
      const orderId = data.order?.id || "N/A";

      setMessage(
        `Order successfully placed! Order ID: ${orderId}`
      );

      setOrderSuccess(true);

    } catch (err) {
      console.error("PLACE ORDER ERROR:", err);

      setError(err.message || "Order place nahi hua.");

      // ✅ CANCEL VIDEO
      setOrderCancelled(true);

      setTimeout(() => {
        setOrderCancelled(false);
      }, 4000);

    } finally {
      setPlacing(false);
    }
  };

  /* =====================================================
     CANCEL ORDER
  ===================================================== */

  const handleCancelOrder = () => {
    setOrderCancelled(true);
    setError("Order cancelled by user.");

    setTimeout(() => {
      setOrderCancelled(false);
    }, 4000);
  };

  /* =====================================================
     EMPTY CART
  ===================================================== */

  if (cart.length === 0 && !orderSuccess) {
    return (
      <section className="cart-page">
        <div className="cart-container">
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h1>Your Cart is Empty</h1>
            <p>Wholesale products cart mein add karo.</p>
            <button
              type="button"
              onClick={() => navigate("/products")}
            >
              Browse Products →
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* =====================================================
     ORDER SUCCESS SCREEN
  ===================================================== */

  if (orderSuccess) {
    return (
      <section className="cart-page order-success-page">
        <div className="order-success-container">
          <div className="order-success-video-box">
            <video
              src={`${BASE}videos/order-success.mp4`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>

          <div className="order-success-content">
            <span className="success-label">C24 WHOLESALE</span>
            <h1>Order Placed Successfully! 🎉</h1>
            <p>
              Your wholesale order has been successfully
              received by C24.
            </p>

            {message && (
              <div className="success-order-id">{message}</div>
            )}

            <div className="order-success-actions">
              <button
                type="button"
                onClick={() => navigate("/my-orders")}
              >
                View My Orders →
              </button>
              <button
                type="button"
                className="success-secondary-button"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* =====================================================
     MAIN CART PAGE
  ===================================================== */

  return (
    <section className="cart-page">
      <div className="cart-container">

        {/* ✅ WELCOME BACK VIDEO POPUP */}
        {showWelcomeBack && (
          <div className="welcome-back-overlay">
            <div className="welcome-back-popup">
              <video
                src={`${BASE}videos/welcome-back.mp4`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="welcome-back-content">
                <h2>Welcome Back! 👋</h2>
                <p>Good to see you again</p>
              </div>
              <button
                className="welcome-back-close"
                onClick={() => setShowWelcomeBack(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* ✅ ORDER CANCEL VIDEO POPUP */}
        {orderCancelled && (
          <div className="welcome-back-overlay">
            <div className="welcome-back-popup">
              <video
                src={`${BASE}videos/order-cancel.mp4`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="welcome-back-content">
                <h2>Order Cancelled ❌</h2>
                <p>Please try again</p>
              </div>
              <button
                className="welcome-back-close"
                onClick={() => setOrderCancelled(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* ✅ ADDRESS FORM POPUP */}
        {showAddressForm && (
          <div className="address-overlay">
            <div className="address-popup">
              <div className="address-header">
                <h2>📍 Delivery Address</h2>
                <button
                  className="address-close"
                  onClick={() => setShowAddressForm(false)}
                >
                  ✕
                </button>
              </div>

              <div className="address-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={address.fullName}
                      onChange={handleAddressChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="form-row two-col">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={address.phone}
                      onChange={handleAddressChange}
                      placeholder="10 digit phone"
                      maxLength={10}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={address.email}
                      onChange={handleAddressChange}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Address Line *</label>
                    <textarea
                      name="addressLine"
                      value={address.addressLine}
                      onChange={handleAddressChange}
                      placeholder="House no, Building, Street, Area"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="form-row two-col">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      placeholder="City"
                    />
                  </div>

                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                      placeholder="State"
                    />
                  </div>
                </div>

                <div className="form-row two-col">
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleAddressChange}
                      placeholder="6 digit pincode"
                      maxLength={6}
                    />
                  </div>

                  <div className="form-group">
                    <label>Landmark</label>
                    <input
                      type="text"
                      name="landmark"
                      value={address.landmark}
                      onChange={handleAddressChange}
                      placeholder="Near..."
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Address Type</label>
                    <div className="address-type-options">
                      {["home", "office", "other"].map((type) => (
                        <label
                          key={type}
                          className={`address-type-option ${
                            address.addressType === type
                              ? "active"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="addressType"
                            value={type}
                            checked={
                              address.addressType === type
                            }
                            onChange={handleAddressChange}
                          />
                          <span>
                            {type === "home" && "🏠 Home"}
                            {type === "office" && "🏢 Office"}
                            {type === "other" && "📍 Other"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="form-error">{error}</div>
                )}

                <div className="address-actions">
                  <button
                    type="button"
                    className="address-back-button"
                    onClick={() => setShowAddressForm(false)}
                  >
                    ← Back to Cart
                  </button>

                  <button
                    type="button"
                    className="address-submit-button"
                    onClick={submitOrder}
                    disabled={placing}
                  >
                    {placing
                      ? "Placing Order..."
                      : "Confirm Order →"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className="cart-header">
          <div>
            <span>C24 WHOLESALE</span>
            <h1>Shopping Cart</h1>
          </div>
          <button
            type="button"
            onClick={() => navigate("/products")}
          >
            ← Continue Shopping
          </button>
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="cart-success">
            {message}
            <button
              type="button"
              onClick={() => navigate("/my-orders")}
            >
              View My Orders →
            </button>
          </div>
        )}

        {/* ERROR */}
        {error && !showAddressForm && (
          <div className="cart-error">{error}</div>
        )}

        {/* CART */}
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <span>C24</span>
                  )}
                </div>

                <div className="cart-item-info">
                  <small>{item.brand || "C24"}</small>
                  <h3>{item.name}</h3>
                  <p>
                    ₹
                    {Number(item.price || 0).toLocaleString(
                      "en-IN"
                    )}{" "}
                    / unit
                  </p>

                  <div className="cart-quantity">
                    <button
                      type="button"
                      onClick={() => decrease(item)}
                    >
                      −
                    </button>
                    <strong>{item.quantity}</strong>
                    <button
                      type="button"
                      onClick={() => increase(item)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  <strong>
                    ₹
                    {(
                      Number(item.price || 0) *
                      Number(item.quantity || 1)
                    ).toLocaleString("en-IN")}
                  </strong>
                  <button
                    type="button"
                    onClick={() => removeItem(item)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <span>ORDER SUMMARY</span>
            <h2>Wholesale Order</h2>

            <div className="summary-row">
              <span>Products</span>
              <strong>{cart.length}</strong>
            </div>

            <div className="summary-row">
              <span>Total Quantity</span>
              <strong>
                {cart.reduce(
                  (sum, item) =>
                    sum + Number(item.quantity || 1),
                  0
                )}
              </strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>
            </div>

            {/* ✅ PLACE ORDER → Address form open */}
            <button
              type="button"
              className="place-order-button"
              onClick={openAddressForm}
              disabled={placing}
            >
              Place Wholesale Order →
            </button>

            {/* ✅ CANCEL ORDER */}
            <button
              type="button"
              className="cancel-order-button"
              onClick={handleCancelOrder}
              disabled={placing}
            >
              ❌ Cancel Order
            </button>

            <small>
              Order admin panel mein automatically send hoga.
            </small>
          </aside>
        </div>
      </div>
    </section>
  );
}