import { useLanguage } from "../LanguageContext";
import "./PriceList.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function PriceList() {
  const { t, language } = useLanguage();

  const handleDownload = async () => {
    try {
      // Current retailer information
      let retailer = null;

      try {
        retailer = JSON.parse(
          localStorage.getItem("c24Retailer") ||
            localStorage.getItem("c24_retailer") ||
            "null"
        );
      } catch {
        retailer = null;
      }

      // Save download information for admin
      await fetch(
        `${API}/price-list-downloads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            retailerId:
              retailer?.id ||
              retailer?._id ||
              null,

            name:
              retailer?.name ||
              "",

            businessName:
              retailer?.businessName ||
              "",

            phone:
              retailer?.phone ||
              "",

            email:
              retailer?.email ||
              "",

            language:
              language ||
              localStorage.getItem(
                "c24Language"
              ) ||
              "EN",

            downloadedAt:
              new Date().toISOString(),
          }),
        }
      );
    } catch (error) {
      // PDF download ko block nahi karna
      console.error(
        "Price list tracking error:",
        error
      );
    }

    // PDF download/open
    window.open(
      "/price-list.pdf",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      id="price-list"
      className="price-list-section"
    >
      <div className="price-list-content">

        <span>
          C24 WHOLESALE
        </span>

        <h2>
          {t("wholesalePriceList")}
        </h2>

        <p>
          {t("wholesalePricing")}
        </p>

        <button
          type="button"
          className="price-list-button"
          onClick={handleDownload}
        >
          📄{" "}
          {t("downloadPriceList")}
        </button>

      </div>
    </section>
  );
}