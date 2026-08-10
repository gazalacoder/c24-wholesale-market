import "./Categories.css";

export default function Categories() {
  const categories = [
    "📺 Smart TV",
    "❄️ Air Conditioner",
    "🧺 Washing Machine",
    "🧊 Refrigerator",
    "🥣 Mixer Grinder",
    "🌀 Ceiling Fan",
    "🔥 Water Heater",
    "🍳 Kitchen Appliances",
  ];

  return (
    <section className="categories">
      <h2>Shop by Category</h2>

      <div className="category-grid">
        {categories.map((item, index) => (
          <div className="category-card" key={index}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}