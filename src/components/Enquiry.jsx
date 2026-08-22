import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import "./Enquiry.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function Enquiry() {
  const { t } = useLanguage();

  const [retailer, setRetailer] = useState(null);

  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    product: "",
    quantity: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /* =====================================================
     LOAD RETAILER
  ===================================================== */

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem("c24Retailer");

      if (saved) {
        setRetailer(JSON.parse(saved));
      }
    } catch (err) {
      console.error(
        "Retailer load error:",
        err
      );
    }
  }, []);


  /* =====================================================
     AUTO FILL RETAILER
  ===================================================== */

  useEffect(() => {
    if (!retailer) return;

    setForm((prev) => ({
      ...prev,

      name:
        prev.name ||
        retailer.name ||
        "",

      business:
        prev.business ||
        retailer.businessName ||
        "",

      phone:
        prev.phone ||
        retailer.phone ||
        "",

      email:
        prev.email ||
        retailer.email ||
        "",
    }));
  }, [retailer]);


  /* =====================================================
     CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };


  /* =====================================================
     SUBMIT ENQUIRY
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      if (!form.name.trim()) {
        throw new Error(
          "Please enter your name."
        );
      }

      if (!form.business.trim()) {
        throw new Error(
          "Please enter business name."
        );
      }

      if (!form.phone.trim()) {
        throw new Error(
          "Please enter phone number."
        );
      }

      if (!form.product.trim()) {
        throw new Error(
          "Please enter product name."
        );
      }

      if (
        !form.quantity ||
        Number(form.quantity) <= 0
      ) {
        throw new Error(
          "Please enter valid quantity."
        );
      }


      /* ===============================================
         SEND TO BACKEND
      =============================================== */

      const response = await fetch(
        `${API}/enquiries`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: form.name.trim(),

            business:
              form.business.trim(),

            phone:
              form.phone.trim(),

            email:
              form.email.trim(),

            product:
              form.product.trim(),

            quantity:
              Number(form.quantity),

            message:
              form.message.trim(),

            retailerId:
              retailer?.id ||
              retailer?._id ||
              null,

            retailerName:
              retailer?.name ||
              form.name.trim(),
          }),
        }
      );


      let data;

      try {
        data =
          await response.json();
      } catch {
        throw new Error(
          "Server ne valid response nahi diya."
        );
      }


      if (!response.ok) {
        throw new Error(
          data?.message ||
          "Enquiry submit nahi hui."
        );
      }


      /* ===============================================
         SUCCESS
      =============================================== */

      setSuccess(
        "Your enquiry has been submitted successfully!"
      );

      setForm((prev) => ({
        ...prev,

        product: "",
        quantity: "",
        message: "",
      }));

    } catch (err) {
      console.error(
        "Enquiry error:",
        err
      );

      setError(
        err?.message ||
        "Enquiry submit failed."
      );
    } finally {
      setLoading(false);
    }
  };


  /* =====================================================
     WHATSAPP
  ===================================================== */

  const sendWhatsApp = () => {
    const message =
      `Hello C24 Wholesale 👋

I want to make a wholesale enquiry.

Name: ${form.name || "N/A"}
Business: ${form.business || "N/A"}
Phone: ${form.phone || "N/A"}
Product: ${form.product || "N/A"}
Quantity: ${form.quantity || "N/A"}

Message:
${form.message || "Please share wholesale details."}`;

    const url =
      `https://wa.me/919724445650?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };


  return (
    <main className="enquiry-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="enquiry-hero">

        <div className="enquiry-hero-content">

          <span className="enquiry-eyebrow">
            C24 WHOLESALE
          </span>

          <h1>
            {t("wholesaleEnquiry")}
          </h1>

          <p>
            Get competitive wholesale pricing
            for your business and bulk orders.
          </p>

        </div>

      </section>


      {/* =================================================
          MAIN
      ================================================= */}

      <section className="enquiry-main">

        {/* =================================================
            LEFT INFO
        ================================================= */}

        <div className="enquiry-info">

          <span>
            C24 BUSINESS SUPPORT
          </span>

          <h2>
            Let's grow your
            <strong>
              {" "}business.
            </strong>
          </h2>

          <p>
            Share your product requirements
            with us and our wholesale team
            will get back to you with pricing
            and availability.
          </p>


          {/* INFO CARDS */}

          <div className="contact-cards">

            <div className="contact-card">

              <div className="contact-icon">
                📞
              </div>

              <div>
                <small>
                  {t("phone")}
                </small>

                <strong>
                  +91 97244 45650
                </strong>
              </div>

            </div>


            <div className="contact-card">

              <div className="contact-icon">
                ✉️
              </div>

              <div>
                <small>
                  {t("email")}
                </small>

                <strong>
                  c24wholesale@gmail.com
                </strong>
              </div>

            </div>


            <div className="contact-card">

              <div className="contact-icon">
                💬
              </div>

              <div>
                <small>
                  WhatsApp
                </small>

                <strong>
                  Wholesale Support
                </strong>
              </div>

            </div>

          </div>


          {/* WHATSAPP */}

          <button
            type="button"
            className="enquiry-whatsapp"
            onClick={sendWhatsApp}
          >
            💬 Contact on WhatsApp →
          </button>

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <div className="enquiry-form-card">

          <div className="enquiry-form-header">

            <span>
              WHOLESALE REQUEST
            </span>

            <h2>
              Tell us what you need
            </h2>

            <p>
              Fill in your requirements
              and submit your enquiry.
            </p>

          </div>


          {/* SUCCESS */}

          {success && (
            <div className="enquiry-success">
              ✓ {success}
            </div>
          )}


          {/* ERROR */}

          {error && (
            <div className="enquiry-error">
              {error}
            </div>
          )}


          <form
            onSubmit={handleSubmit}
          >

            {/* NAME */}

            <div className="enquiry-row">

              <div className="enquiry-field">

                <label>
                  {t("yourName")}
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* BUSINESS */}

              <div className="enquiry-field">

                <label>
                  {t("businessName")}
                </label>

                <input
                  type="text"
                  name="business"
                  placeholder="Enter business name"
                  value={form.business}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* PHONE */}

            <div className="enquiry-row">

              <div className="enquiry-field">

                <label>
                  {t("phone")}
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="enquiry-field">

                <label>
                  {t("email")}
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* PRODUCT */}

            <div className="enquiry-row">

              <div className="enquiry-field">

                <label>
                  {t("product")}
                </label>

                <input
                  type="text"
                  name="product"
                  placeholder="Product name"
                  value={form.product}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* QUANTITY */}

              <div className="enquiry-field">

                <label>
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  min="1"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* MESSAGE */}

            <div className="enquiry-field">

              <label>
                {t("message")}
              </label>

              <textarea
                name="message"
                placeholder="Tell us about your requirements..."
                rows="5"
                value={form.message}
                onChange={handleChange}
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="enquiry-submit"
              disabled={loading}
            >

              {loading
                ? "Submitting..."
                : `${t("submitEnquiry")} →`}

            </button>

          </form>

        </div>

      </section>


      {/* =================================================
          CONTACT SECTION
      ================================================= */}

      <section className="contact-section">

        <div className="contact-section-heading">

          <span>
            C24 WHOLESALE
          </span>

          <h2>
            {t("contactUs")}
          </h2>

          <p>
            We're here to help with your
            wholesale requirements.
          </p>

        </div>


        <div className="contact-grid">

          <a
            href="tel:+919724445650"
            className="contact-box"
          >

            <span>
              📞
            </span>

            <small>
              {t("callNow")}
            </small>

            <strong>
              +91 97244 45650
            </strong>

          </a>


          <a
            href="mailto:c24wholesale@gmail.com"
            className="contact-box"
          >

            <span>
              ✉️
            </span>

            <small>
              {t("email")}
            </small>

            <strong>
              c24wholesale@gmail.com
            </strong>

          </a>


          <button
            type="button"
            className="contact-box"
            onClick={sendWhatsApp}
          >

            <span>
              💬
            </span>

            <small>
              WhatsApp
            </small>

            <strong>
              Chat With Us
            </strong>

          </button>

        </div>

      </section>

    </main>
  );
}