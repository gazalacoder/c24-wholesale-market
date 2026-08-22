import { useLanguage } from "../LanguageContext";

import "./Categories.css";


export default function Categories() {

  const { t } = useLanguage();


  const categories = [
    {
      icon: "📺",
      key: "smartTV",
      defaultName: "Smart TV",
    },
    {
      icon: "❄️",
      key: "airConditioner",
      defaultName: "Air Conditioner",
    },
    {
      icon: "🧺",
      key: "washingMachine",
      defaultName: "Washing Machine",
    },
    {
      icon: "🧊",
      key: "refrigerator",
      defaultName: "Refrigerator",
    },
    {
      icon: "🥣",
      key: "mixerGrinder",
      defaultName: "Mixer Grinder",
    },
    {
      icon: "🌀",
      key: "ceilingFan",
      defaultName: "Ceiling Fan",
    },
    {
      icon: "🔥",
      key: "waterHeater",
      defaultName: "Water Heater",
    },
    {
      icon: "🍳",
      key: "kitchenAppliances",
      defaultName: "Kitchen Appliances",
    },
  ];


  return (

    <section
      className="categories"
      id="categories"
    >

      {/* =================================
          HEADER
      ================================= */}

      <div className="categories-header">

        <span>
          C24 PRODUCT CATEGORIES
        </span>


        <h2>
          {t("shopByCategory")}
        </h2>


        <p>
          {t("categoryDescription")}
        </p>

      </div>


      {/* =================================
          CATEGORY GRID
      ================================= */}

      <div className="category-grid">

        {categories.map(
          (item) => (

            <div
              className="category-card"
              key={item.key}
            >

              <span className="category-icon">
                {item.icon}
              </span>


              <span className="category-name">

                {t(item.key) !== item.key
                  ? t(item.key)
                  : item.defaultName}

              </span>


              <span className="category-arrow">
                →
              </span>

            </div>

          )
        )}

      </div>

    </section>

  );

}