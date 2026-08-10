import React from "react";

function Contact() {
  return (
    <section
      className="contact-section"
      style={{
        minHeight: "650px",
        padding: "100px 30px",
        background: "#030607",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

        {/* TOP LABEL */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <span
            style={{
              color: "#00cfff",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "4px",
            }}
          >
            C24 HOME APPLICATION WHOLESALE
          </span>

          <h1
            style={{
              margin: "15px 0",
              fontSize: "clamp(38px, 6vw, 65px)",
              fontWeight: "800",
            }}
          >
            Contact Us
          </h1>

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              color: "#888",
              lineHeight: "1.7",
              fontSize: "14px",
            }}
          >
            Need wholesale products, bulk pricing,
            product information or a business enquiry?
            Contact the C24 team.
          </p>
        </div>


        {/* CONTACT CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "45px",
          }}
        >

          {/* WHATSAPP */}

          <div
            style={{
              padding: "30px",
              border:
                "1px solid rgba(37,211,102,.2)",
              borderRadius: "16px",
              background:
                "rgba(37,211,102,.04)",
            }}
          >

            <div
              style={{
                fontSize: "30px",
                marginBottom: "15px",
              }}
            >
              💬
            </div>

            <h3
              style={{
                margin: "0 0 10px",
              }}
            >
              WhatsApp
            </h3>

            <p
              style={{
                color: "#777",
                fontSize: "13px",
              }}
            >
              Chat with us for wholesale
              product enquiries.
            </p>

            <a
              href="https://wa.me/919724445650"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "12px 18px",
                borderRadius: "8px",
                background: "#25D366",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "12px",
              }}
            >
              Chat on WhatsApp →
            </a>

          </div>


          {/* PHONE */}

          <div
            style={{
              padding: "30px",
              border:
                "1px solid rgba(0,207,255,.18)",
              borderRadius: "16px",
              background:
                "rgba(0,207,255,.035)",
            }}
          >

            <div
              style={{
                fontSize: "30px",
                marginBottom: "15px",
              }}
            >
              📞
            </div>

            <h3
              style={{
                margin: "0 0 10px",
              }}
            >
              Call Us
            </h3>

            <p
              style={{
                color: "#777",
                fontSize: "13px",
              }}
            >
              Speak directly with our
              wholesale team.
            </p>

            <a
              href="tel:+919724445650"
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "12px 18px",
                borderRadius: "8px",
                background:
                  "linear-gradient(90deg,#008cff,#00cfff)",
                color: "#001018",
                textDecoration: "none",
                fontWeight: "800",
                fontSize: "12px",
              }}
            >
              Call +91 9724445650
            </a>

          </div>


          {/* BUSINESS */}

          <div
            style={{
              padding: "30px",
              border:
                "1px solid rgba(255,255,255,.08)",
              borderRadius: "16px",
              background:
                "rgba(255,255,255,.025)",
            }}
          >

            <div
              style={{
                fontSize: "30px",
                marginBottom: "15px",
              }}
            >
              🏢
            </div>

            <h3
              style={{
                margin: "0 0 10px",
              }}
            >
              Wholesale Business
            </h3>

            <p
              style={{
                color: "#777",
                fontSize: "13px",
                lineHeight: "1.6",
              }}
            >
              Looking for bulk quantities,
              distributor pricing or
              regular supply?
            </p>

            <a
              href="#enquiry"
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "12px 18px",
                borderRadius: "8px",
                border:
                  "1px solid rgba(0,207,255,.5)",
                color: "#00cfff",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "12px",
              }}
            >
              Send Enquiry →
            </a>

          </div>

        </div>


        {/* BOTTOM CTA */}

        <div
          style={{
            padding: "35px",
            textAlign: "center",
            borderRadius: "18px",
            border:
              "1px solid rgba(0,207,255,.15)",
            background:
              "linear-gradient(135deg,rgba(0,140,255,.07),rgba(0,207,255,.025))",
          }}
        >

          <h2
            style={{
              margin: "0 0 12px",
              fontSize: "25px",
            }}
          >
            Ready to Start Wholesale?
          </h2>

          <p
            style={{
              color: "#777",
              fontSize: "13px",
              marginBottom: "22px",
            }}
          >
            Contact C24 today for products,
            prices and bulk orders.
          </p>

          <a
            href="https://wa.me/919724445650?text=Hello%20C24%20Wholesale%2C%20I%20want%20to%20know%20about%20wholesale%20products."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "14px 25px",
              borderRadius: "9px",
              background:
                "linear-gradient(90deg,#008cff,#00cfff)",
              color: "#001018",
              textDecoration: "none",
              fontWeight: "900",
            }}
          >
            Get Wholesale Quote →
          </a>

        </div>

      </div>
    </section>
  );
}


/* =====================================================
   DEFAULT EXPORT
===================================================== */

export default Contact;