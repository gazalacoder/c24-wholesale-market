import { useState } from "react";

import { useLanguage } from "../LanguageContext";

import "./Contact.css";


export default function Contact() {

  const { t } =
    useLanguage();


  const [form, setForm] =
    useState({
      name: "",
      phone: "",
      email: "",
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

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}

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
      id="contact"
      className="contact-section"
    >

      <div className="contact-heading">

        <span>
          C24 WHOLESALE
        </span>

        <h2>
          {t("contactUs")}
        </h2>

      </div>


      <div className="contact-wrapper">

        <div className="contact-info">

          <h3>
            C24 Home Application
            Wholesale
          </h3>

          <p>
            {t("wholesaleDescription")}
          </p>


          <div className="contact-item">

            📞

            <div>

              <span>
                {t("phone")}
              </span>

              <strong>
                +91 97244 45650
              </strong>

            </div>

          </div>


          <div className="contact-item">

            💬

            <div>

              <span>
                {t("whatsapp")}
              </span>

              <strong>
                WhatsApp
              </strong>

            </div>

          </div>

        </div>


        <form
          className="contact-form"
          onSubmit={submit}
        >

          <input
            name="name"
            value={form.name}
            onChange={update}
            placeholder={t("yourName")}
            required
          />


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


          <textarea
            name="message"
            value={form.message}
            onChange={update}
            placeholder={t("message")}
            rows="5"
            required
          />


          <button type="submit">

            💬{" "}
            {t("sendMessage")}

          </button>

        </form>

      </div>

    </section>

  );
}