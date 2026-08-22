import { useLanguage } from "../LanguageContext";

import "./TrustSection.css";


export default function TrustSection() {

  const { t } =
    useLanguage();


  return (

    <section
      id="about"
      className="trust-section"
    >

      <div className="trust-heading">

        <span>
          C24 WHOLESALE
        </span>

        <h2>
          {t("trustedWholesale")}
        </h2>

        <p>
          {t("trustedDescription")}
        </p>

      </div>


      <div className="trust-grid">

        <div className="trust-card">

          <div>
            🏆
          </div>

          <h3>
            Quality Products
          </h3>

          <p>
            Reliable home appliances
            for wholesale buyers.
          </p>

        </div>


        <div className="trust-card">

          <div>
            💰
          </div>

          <h3>
            Best Wholesale Prices
          </h3>

          <p>
            Competitive pricing for
            retailers and bulk buyers.
          </p>

        </div>


        <div className="trust-card">

          <div>
            🤝
          </div>

          <h3>
            Retailer Support
          </h3>

          <p>
            Professional support for
            wholesale customers.
          </p>

        </div>


        <div className="trust-card">

          <div>
            🚚
          </div>

          <h3>
            Bulk Orders
          </h3>

          <p>
            Convenient wholesale
            ordering experience.
          </p>

        </div>

      </div>

    </section>

  );
}