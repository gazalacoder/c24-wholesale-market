import "./Brands.css";

export default function Brands() {
  const brands = [
    "Samsung",
    "LG",
    "Sony",
    "Whirlpool",
    "Panasonic",
    "Haier",
  ];

  return (
    <section className="brands">
      <h2>Our Brands</h2>

      <div className="brand-grid">
        {brands.map((brand, index) => (
          <div className="brand-card" key={index}>
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}