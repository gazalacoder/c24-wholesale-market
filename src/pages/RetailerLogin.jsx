import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RetailerLogin.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

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

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };


  /* =====================================================
     SWITCH LOGIN / REGISTER
  ===================================================== */

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


  /* =====================================================
     LOGIN / REGISTER
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      /* ===============================================
         ENDPOINT
      =============================================== */

      const endpoint =
        mode === "login"
          ? `${API}/retailers/login`
          : `${API}/retailers/register`;


      /* ===============================================
         BODY
      =============================================== */

      let body;

      if (mode === "login") {
        body = {
          phone: form.phone.trim(),
          email: form.email.trim(),
          password: form.password,
        };
      } else {
        body = {
          name: form.name.trim(),

          businessName:
            form.businessName.trim(),

          phone:
            form.phone.trim(),

          email:
            form.email.trim().toLowerCase(),

          gstNumber:
            form.gstNumber.trim(),

          password:
            form.password,
        };
      }


      /* ===============================================
         API REQUEST
      =============================================== */

      const response = await fetch(
        endpoint,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(body),
        }
      );


      /* ===============================================
         RESPONSE
      =============================================== */

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "Server ne valid response nahi diya."
        );
      }


      /* ===============================================
         ERROR
      =============================================== */

      if (!response.ok) {
        throw new Error(
          data?.message ||
          "Something went wrong."
        );
      }


      /* ===============================================
         LOGIN SUCCESS
      =============================================== */

      if (mode === "login") {

        if (!data?.retailer) {
          throw new Error(
            "Retailer data server se nahi mila."
          );
        }


        /* =============================================
           SAVE RETAILER
        ============================================= */

        localStorage.setItem(
          "c24Retailer",
          JSON.stringify(
            data.retailer
          )
        );


        /* =============================================
           OPTIONAL OLD KEYS CLEAN
        ============================================= */

        localStorage.removeItem(
          "c24_retailer"
        );

        localStorage.removeItem(
          "c24_retailer_id"
        );


        /* =============================================
           NOTIFY PRODUCTS PAGE
        ============================================= */

        window.dispatchEvent(
          new Event(
            "c24-retailer-login"
          )
        );


        setSuccess(
          "Login successful! Wholesale pricing unlocked."
        );


        /* =============================================
           GO TO PRODUCTS
        ============================================= */

        setTimeout(() => {

          navigate(
            "/products",
            {
              replace: true,
            }
          );

        }, 500);

      }


      /* ===============================================
         REGISTER SUCCESS
      =============================================== */

      else {

        setSuccess(
          "Account created successfully! Please login."
        );

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

      console.error(
        "Retailer authentication error:",
        err
      );

      setError(
        err?.message ||
        "Server se connection nahi ho raha."
      );

    } finally {

      setLoading(false);

    }
  };


  /* =====================================================
     UI
  ===================================================== */

  return (
    <section className="retailer-login-page">

      <div className="retailer-login-container">


        {/* =================================================
            LEFT INTRO
        ================================================= */}

        <div className="retailer-login-intro">

          <span>
            C24 WHOLESALE
          </span>

          <h1>
            Retailer
            <br />

            <strong>
              Access.
            </strong>
          </h1>

          <p>
            Login to access exclusive
            wholesale prices, bulk
            enquiries and retailer
            benefits.
          </p>


          <div className="retailer-benefits">

            <div>

              <strong>
                01
              </strong>

              <span>
                Exclusive Wholesale Pricing
              </span>

            </div>


            <div>

              <strong>
                02
              </strong>

              <span>
                Bulk Order Enquiries
              </span>

            </div>


            <div>

              <strong>
                03
              </strong>

              <span>
                Retailer Enquiry History
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            LOGIN BOX
        ================================================= */}

        <div className="retailer-login-box">


          {/* =================================================
              TABS
          ================================================= */}

          <div className="retailer-tabs">

            <button
              type="button"
              className={
                mode === "login"
                  ? "active"
                  : ""
              }
              onClick={() =>
                switchMode("login")
              }
            >
              Login
            </button>


            <button
              type="button"
              className={
                mode === "register"
                  ? "active"
                  : ""
              }
              onClick={() =>
                switchMode("register")
              }
            >
              Create Account
            </button>

          </div>


          {/* =================================================
              HEADER
          ================================================= */}

          <div className="retailer-form-header">

            <span>
              {mode === "login"
                ? "RETAILER LOGIN"
                : "NEW RETAILER"}
            </span>

            <h2>
              {mode === "login"
                ? "Welcome Back"
                : "Create Account"}
            </h2>

            <p>
              {mode === "login"
                ? "Login to unlock wholesale pricing."
                : "Create your retailer account."}
            </p>

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="retailer-error">
              {error}
            </div>

          )}


          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (

            <div className="retailer-success">
              {success}
            </div>

          )}


          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
          >


            {/* =============================================
                REGISTER NAME
            ============================================= */}

            {mode === "register" && (
              <>

                <div className="retailer-form-group">

                  <label>
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />

                </div>


                <div className="retailer-form-group">

                  <label>
                    Business Name
                  </label>

                  <input
                    type="text"
                    name="businessName"
                    placeholder="Your business name"
                    value={
                      form.businessName
                    }
                    onChange={handleChange}
                    autoComplete="organization"
                    required
                  />

                </div>

              </>
            )}


            {/* =============================================
                PHONE
            ============================================= */}

            <div className="retailer-form-group">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
                required={
                  mode === "register"
                }
              />

            </div>


            {/* =============================================
                EMAIL
            ============================================= */}

            <div className="retailer-form-group">

              <label>
                {mode === "login"
                  ? "Email / Phone"
                  : "Email"}
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />

            </div>


            {/* =============================================
                GST
            ============================================= */}

            {mode === "register" && (

              <div className="retailer-form-group">

                <label>
                  GST Number
                  <small>
                    {" "}
                    Optional
                  </small>
                </label>

                <input
                  type="text"
                  name="gstNumber"
                  placeholder="Enter GST number"
                  value={
                    form.gstNumber
                  }
                  onChange={handleChange}
                />

              </div>

            )}


            {/* =============================================
                PASSWORD
            ============================================= */}

            <div className="retailer-form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={
                  form.password
                }
                onChange={handleChange}
                autoComplete={
                  mode === "login"
                    ? "current-password"
                    : "new-password"
                }
                minLength={6}
                required
              />

            </div>


            {/* =============================================
                SUBMIT
            ============================================= */}

            <button
              type="submit"
              className="retailer-submit"
              disabled={loading}
            >

              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Login to Wholesale →"
                : "Create Retailer Account →"}

            </button>

          </form>


          {/* =================================================
              BACK
          ================================================= */}

          <button
            type="button"
            className="back-to-store"
            onClick={() =>
              navigate("/")
            }
          >
            ← Back to C24 Store
          </button>

        </div>

      </div>

    </section>
  );
}