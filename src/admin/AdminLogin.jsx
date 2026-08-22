import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanUsername = username.trim();
    const cleanPassword = password;

    if (!cleanUsername || !cleanPassword) {
      setError(
        "Username aur password dono enter karo."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API}/admin/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: cleanUsername,
            password: cleanPassword,
          }),
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Login failed (${response.status})`
        );
      }

      if (!data.success) {
        throw new Error(
          data.message ||
            "Invalid admin login."
        );
      }

      /* =========================================
         SAVE ADMIN LOGIN
      ========================================= */

      sessionStorage.setItem(
        "c24_admin",
        JSON.stringify(
          data.admin || {
            username: cleanUsername,
            role: "admin",
          }
        )
      );

      setSuccess(
        "Login successful. Opening dashboard..."
      );

      /* =========================================
         DASHBOARD
      ========================================= */

      setTimeout(() => {
        navigate(
          "/admin/dashboard",
          {
            replace: true,
          }
        );
      }, 300);

    } catch (err) {
      console.error(
        "ADMIN LOGIN ERROR:",
        err
      );

      if (
        err instanceof TypeError
      ) {
        setError(
          "Backend server se connection nahi ho raha. Pehle node server.js chalao."
        );
      } else {
        setError(
          err.message ||
            "Admin login failed."
        );
      }

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="admin-login-page">

      <div className="admin-login-box">

        {/* =====================================
            LOGO
        ===================================== */}

        <div className="admin-login-logo">
          C24
        </div>

        <span className="admin-login-label">
          C24 WHOLESALE
        </span>


        {/* =====================================
            TITLE
        ===================================== */}

        <h1>
          Admin Login
        </h1>

        <p>
          Sign in to manage your
          wholesale store.
        </p>


        {/* =====================================
            ERROR
        ===================================== */}

        {error && (
          <div className="admin-login-error">
            {error}
          </div>
        )}


        {/* =====================================
            SUCCESS
        ===================================== */}

        {success && (
          <div className="admin-login-success">
            {success}
          </div>
        )}


        {/* =====================================
            LOGIN FORM
        ===================================== */}

        <form
          onSubmit={handleLogin}
        >

          {/* USERNAME */}

          <div className="login-field">

            <label>
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              autoComplete="username"
              disabled={loading}
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="login-field">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              autoComplete="current-password"
              disabled={loading}
              required
            />

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Signing in..."
              : "Login to Dashboard →"}

          </button>

        </form>


        {/* =====================================
            BACK TO WEBSITE
        ===================================== */}

        <button
          type="button"
          className="back-website"
          onClick={() =>
            navigate("/")
          }
          disabled={loading}
        >
          ← Back to Website
        </button>


      </div>

    </div>
  );
}