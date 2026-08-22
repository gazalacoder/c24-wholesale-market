import { useState } from "react";

import { useLanguage } from "../LanguageContext";

import "./Enquiry.css";


export default function Enquiry() {

  const { t } =
    useLanguage();


  const [form, setForm] =
    useState({
      name: "",
      businessName: "",
      phone: "",
      email: "",
      product: "",
      quantity: "",
      message: "",
    });


  const update =
    (e) => {

      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });

    };


  const submit =
    (e) => {

      e.preventDefault();


      const text =
`Hello C24 Wholesale 👋

Wholesale Enquiry

Name: ${form.name}
Business: ${form.businessName}
Phone: ${form.phone}
Email: ${form.email}
Product: ${form.product}
Quantity: ${form.quantity}

Message:
${form.message}`;


      const url =
        `https://wa.me/919724445650?text=${encodeURIComponent(
          text
        )}`;


      window.open(
        url,
        "_blank"
      );

    };


  return (

    <section
      id="enquiry"
      className="enquiry-section"
    >

      <div className="enquiry-heading">

        <span>
          C24 WHOLESALE
        </span>

        <h2>
          {t("wholesaleEnquiry")}
        </h2>

        <p>
          {t("limitedOffers")}
        </p>

      </div>


      <form
        className="enquiry-form"
        onSubmit={submit}
      >

        <div className="form-row">

          <input
            name="name"
            value={form.name}
            onChange={update}
            placeholder={t("yourName")}
            required
          />

          <input
            name="businessName"
            value={form.businessName}
            onChange={update}
            placeholder={t("businessName")}
            required
          />

        </div>


        <div className="form-row">

          <input
            name="phone"
            value={form.phone}
            onChange={update}
            placeholder={t("phone")}
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            placeholder={t("email")}
          />

        </div>


        <div className="form-row">

          <input
            name="product"
            value={form.product}
            onChange={update}
            placeholder={t("product")}
            required
          />

          <input
            name="quantity"
            value={form.quantity}
            onChange={update}
            placeholder={t("quantity")}
            required
          />

        </div>


        <textarea
          name="message"
          value={form.message}
          onChange={update}
          placeholder={t("message")}
          rows="6"
        />


        <button type="submit">

          💬{" "}
          {t("submitEnquiry")}

        </button>

      </form>

    </section>

  );
}