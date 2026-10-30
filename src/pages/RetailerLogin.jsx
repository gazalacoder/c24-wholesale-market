import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../api"; // ✅ Central API import kiya
import "./RetailerLogin.css";

export default function RetailerLogin() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    gstNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ LOGIN SUCCESS SCREEN
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [retailerName, setRetailerName] = useState("");

  /* ================================
     FORM CHANGE
  ================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* ================================
     SWITCH LOGIN / REGISTER
  ================================= */

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");
    setForm({
      name: "",
      businessName: "",
      phone: "",
      email: "",
      gstNumber: "",
      password: "",
    });
  };

  /* ================================
     SUBMIT
  ================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let endpoint;
      let body;

      /* LOGIN */
      if (mode === "login") {
        const identifier = form.email.trim();

        // ✅ API_URL use kiya
        endpoint = `${API_URL}/retailers/login`;

        body = {
          phone: identifier,
          email: identifier,
          password: form.password,
        };
      }
      /* REGISTER */
      else {
        // ✅ API_URL use kiya
        endpoint = `${API_URL}/retailers/register`;

        body = {
          name: form.name.trim(),
          businessName: form.businessName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase(),
          gstNumber: form.gstNumber.trim(),
          password: form.password,
        };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Server se valid response nahi mila.");
      }

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong.");
      }

      /* LOGIN SUCCESS */
      if (mode === "login") {
        if (!data?.retailer) {
          throw new Error("Retailer data server se nahi mila.");
        }

        localStorage.setItem("c24Retailer", JSON.stringify(data.retailer));
        localStorage.removeItem("c24_retailer");
        localStorage.removeItem("c24_retailer_id");

        window.dispatchEvent(new Event("c24-retailer-login"));

        // ✅ SET SUCCESS SCREEN
        setRetailerName(data.retailer.name || data.retailer.businessName || "Retailer");
        setLoginSuccess(true);
      }
      /* REGISTER SUCCESS */
      else {
        setSuccess("Account created successfully! Now login with your phone or email.");
        setMode("login");
        setForm({
          name: "",
          businessName: "",
          phone: "",
          email: "",
          gstNumber: "",
          password: "",
        });
      }
    } catch (err) {
      console.error("Retailer authentication error:", err);
      setError(err?.message || "Server se connection nahi ho raha.");
    } finally {
      setLoading(false);
    }
  };

  /* ================================
     ✅ LOGIN SUCCESS SCREEN
  ================================= */

  if (loginSuccess) {
    return (
      <section className="retailer-login-page">
        <div className="login-success-container">
          <motion.div
            className="login-success-card"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            {/* SUCCESS ICON */}
            <motion.div
              className="success-icon-wrapper"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.7, type: "spring", bounce: 0.5 }}
            >
              <div className="success-icon">✅</div>

              <motion.div
                className="success-ripple"
                animate={{ scale: [1, 2, 2.5], opacity: [0.6, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="success-ripple"
                animate={{ scale: [1, 2, 2.5], opacity: [0.6, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </motion.div>

            {/* TEXT */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Login Successful! 🎉
            </motion.h1>

            <motion.p
              className="success-welcome-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Welcome back, <strong>{retailerName}</strong>
            </motion.p>

            <motion.p
              className="success-sub-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Your wholesale pricing has been unlocked.
            </motion.p>

            {/* FLOATING SPARKLES */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="success-sparkle"
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  x: [0, (i % 2 === 0 ? 80 : -80)],
                  y: [0, (i % 3 === 0 ? -60 : 60)],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
                style={{ left: "50%", top: "25%" }}
              >
                {["✨", "⭐", "💫", "🌟"][i % 4]}
              </motion.div>
            ))}

            {/* ACTIONS */}
            <motion.div
              className="success-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                type="button"
                className="go-to-website-btn"
                onClick={() => navigate("/")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏠 Go to Website
              </motion.button>

              <motion.button
                type="button"
                className="go-to-dashboard-btn"
                onClick={() => navigate("/retailer-dashboard")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📊 My Dashboard
              </motion.button>

              <motion.button
                type="button"
                className="continue-shopping-btn"
                onClick={() => navigate("/products")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🛒 Continue Shopping
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ================================
     LOGIN / REGISTER PAGE
  ================================= */

  return (
    <section className="retailer-login-page">
      <div className="retailer-login-container">
        {/* LEFT SIDE */}
        <div className="retailer-login-intro">
          <span>C24 WHOLESALE</span>
          <h1>
            Retailer<br />
            <strong>Access.</strong>
          </h1>
          <p>Login to access exclusive wholesale prices, bulk enquiries and retailer benefits.</p>

          <div className="retailer-benefits">
            <div>
              <strong>01</strong>
              <span>Exclusive Wholesale Pricing</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Bulk Order Enquiries</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Retailer Enquiry History</span>
            </div>
          </div>
        </div>

        {/* LOGIN BOX */}
        <div className="retailer-login-box">
          {/* TABS */}
          <div className="retailer-tabs">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => switchMode("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={mode === "register" ? "active" : ""}
              onClick={() => switchMode("register")}
            >
              Create Account
            </button>
          </div>

          {/* HEADER */}
          <div className="retailer-form-header">
            <span>{mode === "login" ? "RETAILER LOGIN" : "NEW RETAILER"}</span>
            <h2>{mode === "login" ? "Welcome Back" : "Create Account"}</h2>
            <p>
              {mode === "login"
                ? "Login to unlock wholesale pricing."
                : "Create your retailer account."}
            </p>
          </div>

          {/* ERROR */}
          {error && <div className="retailer-error">{error}</div>}

          {/* SUCCESS */}
          {success && <div className="retailer-success">{success}</div>}

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <>
                <div className="retailer-form-group">
                  <label>Your Name</label>
                  <input type="text" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} autoComplete="name" required />
                </div>
                <div className="retailer-form-group">
                  <label>Business Name</label>
                  <input type="text" name="businessName" placeholder="Your business name" value={form.businessName} onChange={handleChange} autoComplete="organization" required />
                </div>
              </>
            )}

            {mode === "register" && (
              <div className="retailer-form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" placeholder="Enter phone number" value={form.phone} onChange={handleChange} autoComplete="tel" required />
              </div>
            )}

            {mode === "login" && (
              <div className="retailer-form-group">
                <label>Email or Phone Number</label>
                <input type="text" name="email" placeholder="Enter email or phone number" value={form.email} onChange={handleChange} autoComplete="username" required />
              </div>
            )}

            {mode === "register" && (
              <div className="retailer-form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter email" value={form.email} onChange={handleChange} autoComplete="email" />
              </div>
            )}

            {mode === "register" && (
              <div className="retailer-form-group">
                <label>GST Number <small>Optional</small></label>
                <input type="text" name="gstNumber" placeholder="Enter GST number" value={form.gstNumber} onChange={handleChange} />
              </div>
            )}

            <div className="retailer-form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={handleChange}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                minLength={6}
                required
              />
            </div>

            <button type="submit" className="retailer-submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Login to Wholesale →"
                : "Create Retailer Account →"}
            </button>
          </form>

          <button type="button" className="back-to-store" onClick={() => navigate("/")}>
            ← Back to C24 Store
          </button>
        </div>
      </div>
    </section>
  );
}