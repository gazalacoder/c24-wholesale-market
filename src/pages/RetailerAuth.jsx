import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RetailerAuth.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function RetailerAuth() {
  const navigate = useNavigate();

  const [mode, setMode] =
    useState("login");

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    gstNumber: "",
    password: "",
  });

  const updateField = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "register") {
      if (
        !form.name.trim() ||
        !form.businessName.trim() ||
        !form.phone.trim() ||
        !form.password
      ) {
        alert(
          "Please fill all required fields."
        );
        return;
      }

      if (form.password.length < 6) {
        alert(
          "Password minimum 6 characters ka hona chahiye."
        );
        return;
      }
    }

    if (
      mode === "login" &&
      !form.phone.trim() &&
      !form.email.trim()
    ) {
      alert(
        "Phone ya Email enter karo."
      );
      return;
    }

    if (!form.password) {
      alert("Password enter karo.");
      return;
    }

    try {
      setLoading(true);

      const endpoint =
        mode === "login"
          ? `${API}/retailers/login`
          : `${API}/retailers/register`;

      const body =
        mode === "login"
          ? {
              phone: form.phone.trim(),
              email: form.email
                .trim()
                .toLowerCase(),
              password: form.password,
            }
          : {
              name: form.name.trim(),
              businessName:
                form.businessName.trim(),
              phone: form.phone.trim(),
              email: form.email
                .trim()
                .toLowerCase(),
              gstNumber:
                form.gstNumber.trim(),
              password: form.password,
            };

      const response =
        await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(body),
        });

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Something went wrong."
        );
        return;
      }

      if (data.retailer) {
        localStorage.setItem(
          "c24Retailer",
          JSON.stringify(
            data.retailer
          )
        );
      }

      alert(
        mode === "login"
          ? "Retailer login successful!"
          : "Retailer account created successfully!"
      );

      navigate("/products");

    } catch (error) {
      console.error(
        "Retailer Auth Error:",
        error
      );

      alert(
        "Backend connect nahi ho raha. Server check karo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="retailer-auth">

      <div className="retailer-auth-box">

        {/* HEADER */}

        <div className="retailer-auth-heading">

          <span>
            C24 WHOLESALE
          </span>

          <h1>
            {mode === "login"
              ? "Retailer Login"
              : "Create Retailer Account"}
          </h1>

          <p>
            {mode === "login"
              ? "Login karke exclusive wholesale prices unlock karein."
              : "Register karein aur C24 wholesale pricing access karein."}
          </p>

        </div>


        {/* FORM */}

        <form
          className="retailer-auth-form"
          onSubmit={handleSubmit}
        >

          {/* REGISTER ONLY */}

          {mode === "register" && (
            <>
              <div className="retailer-field">

                <label>
                  Full Name *
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) =>
                    updateField(
                      "name",
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="retailer-field">

                <label>
                  Business Name *
                </label>

                <input
                  type="text"
                  placeholder="Enter business name"
                  value={
                    form.businessName
                  }
                  onChange={(e) =>
                    updateField(
                      "businessName",
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="retailer-field">

                <label>
                  GST Number
                </label>

                <input
                  type="text"
                  placeholder="Enter GST number"
                  value={
                    form.gstNumber
                  }
                  onChange={(e) =>
                    updateField(
                      "gstNumber",
                      e.target.value
                    )
                  }
                />

              </div>
            </>
          )}


          {/* PHONE */}

          <div className="retailer-field">

            <label>
              Phone Number
              {mode === "register"
                ? " *"
                : ""}
            </label>

            <input
              type="tel"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={(e) =>
                updateField(
                  "phone",
                  e.target.value
                )
              }
            />

          </div>


          {/* EMAIL */}

          <div className="retailer-field">

            <label>
              Email
              {mode === "login"
                ? " / Login Email"
                : ""}
            </label>

            <input
              type="email"
              placeholder="business@email.com"
              value={form.email}
              onChange={(e) =>
                updateField(
                  "email",
                  e.target.value
                )
              }
            />

          </div>


          {/* PASSWORD */}

          <div className="retailer-field">

            <label>
              Password *
            </label>

            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={
                form.password
              }
              onChange={(e) =>
                updateField(
                  "password",
                  e.target.value
                )
              }
              minLength={6}
            />

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className="retailer-submit"
            disabled={loading}
          >

            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login →"
              : "Create Account →"}

          </button>

        </form>


        {/* SWITCH */}

        <div className="retailer-auth-switch">

          {mode === "login" ? (
            <>
              <span>
                New retailer?
              </span>

              <button
                type="button"
                onClick={() =>
                  setMode(
                    "register"
                  )
                }
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              <span>
                Already have an account?
              </span>

              <button
                type="button"
                onClick={() =>
                  setMode("login")
                }
              >
                Login
              </button>
            </>
          )}

        </div>


        {/* BACK */}

        <button
          type="button"
          className="retailer-back"
          onClick={() =>
            navigate("/")
          }
        >
          ← Back to C24 Store
        </button>

      </div>

    </main>
  );
}

export default RetailerAuth;