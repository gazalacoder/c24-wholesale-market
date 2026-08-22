import { useLanguage } from "../LanguageContext";

import "./BusinessTrust.css";


export default function BusinessTrust() {

  const { t } =
    useLanguage();


  return (

    <section
      className="business-trust"
    >

      <div className="business-heading">

        <span>
          {t("businessTrust")}
        </span>

        <h2>
          {t("growBusiness")}
        </h2>

        <p>
          {t("businessDescription")}
        </p>

      </div>


      <div className="business-grid">

        <div className="business-card">

          <strong>
            100+
          </strong>

          <span>
            {t("products")}
          </span>

        </div>


        <div className="business-card">

          <strong>
            24/7
          </strong>

          <span>
            {t("retailerSupport")}
          </span>

        </div>


        <div className="business-card">

          <strong>
            Best
          </strong>

          <span>
            {t("wholesalePricing")}
          </span>

        </div>

      </div>

    </section>

  );
}