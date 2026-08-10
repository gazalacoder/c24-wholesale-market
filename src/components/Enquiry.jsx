import { useState } from "react";
import "./Enquiry.css";

export default function Enquiry() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    product: "",
    quantity: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappMessage = `
C24 Wholesale Enquiry

Name: ${form.name}
Business: ${form.business}
Phone: ${form.phone}
Product: ${form.product}
Quantity: ${form.quantity}

Requirement:
${form.message}
    `.trim();

    const whatsappUrl =
      "https://wa.me/?text=" +
      encodeURIComponent(whatsappMessage);

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="enquiry-section" id="enquiry">

      {/* LEFT */}

      <div className="enquiry-intro">

        <span className="enquiry-label">
          C24 WHOLESALE ENQUIRY
        </span>

        <h2>
          Let's Build
          <br />
          <strong>Business Together.</strong>
        </h2>

        <p>
          Tell us what products you need,
          the quantity required and your
          business requirements.
        </p>


        <div className="enquiry-points">

          <div>
            <span>01</span>
            <p>Bulk Quantity Orders</p>
          </div>

          <div>
            <span>02</span>
            <p>Wholesale Pricing</p>
          </div>

          <div>
            <span>03</span>
            <p>Fast Business Response</p>
          </div>

        </div>

      </div>


      {/* FORM */}

      <div className="enquiry-box">

        <div className="enquiry-box-header">

          <span>
            REQUEST A QUOTE
          </span>

          <h3>
            Wholesale Enquiry
          </h3>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="form-row">

            <div className="form-group">

              <label>
                Your Name
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


            <div className="form-group">

              <label>
                Business Name
              </label>

              <input
                type="text"
                name="business"
                placeholder="Your business name"
                value={form.business}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          <div className="form-row">

            <div className="form-group">

              <label>
                Phone Number
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


            <div className="form-group">

              <label>
                Product
              </label>

              <select
                name="product"
                value={form.product}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Product
                </option>

                <option value="Smart TV">
                  Smart TV
                </option>

                <option value="Washing Machine">
                  Washing Machine
                </option>

                <option value="Refrigerator">
                  Refrigerator
                </option>

                <option value="Mixer Grinder">
                  Mixer Grinder
                </option>

                <option value="Fan">
                  Fan
                </option>

                <option value="Air Cooler">
                  Air Cooler
                </option>

                <option value="Kitchen Appliances">
                  Kitchen Appliances
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

          </div>


          <div className="form-group">

            <label>
              Required Quantity
            </label>

            <input
              type="number"
              name="quantity"
              min="1"
              placeholder="Example: 50"
              value={form.quantity}
              onChange={handleChange}
              required
            />

          </div>


          <div className="form-group">

            <label>
              Your Requirement
            </label>

            <textarea
              name="message"
              rows="5"
              placeholder="Tell us about your product requirement..."
              value={form.message}
              onChange={handleChange}
            ></textarea>

          </div>


          <button
            type="submit"
            className="enquiry-submit"
          >
            Send Enquiry on WhatsApp
            <span>→</span>
          </button>

        </form>

      </div>

    </section>
  );
}