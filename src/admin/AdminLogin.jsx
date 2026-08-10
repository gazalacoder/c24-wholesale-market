import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const API = "http://localhost:5000/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
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
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Invalid login details"
        );
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "c24_admin_logged_in",
        "true"
      );

      navigate("/admin/dashboard");

    } catch (error) {
      setError(
        "Backend connect nahi ho raha. Pehle node server.cjs chalao."
      );
    }

    setLoading(false);
  };

  return (
    <div className="admin-login">

      <div className="admin-login-glow"></div>

      <div className="admin-login-card">

        <div className="admin-login-logo">
          C24
          <span>WHOLESALE</span>
        </div>

        <div className="admin-login-title">
          <span>SECURE ACCESS</span>

          <h1>
            Admin
            <strong> Panel</strong>
          </h1>

          <p>
            Login to manage your C24 wholesale
            website.
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <label>
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />


          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />


          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Checking..."
              : "Login to Admin →"}
          </button>

        </form>

        <div className="admin-login-footer">
          C24 HOME APPLICATION WHOLESALE
        </div>

      </div>

    </div>
  );
}