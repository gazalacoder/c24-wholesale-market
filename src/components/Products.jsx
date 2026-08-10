import "./Products.css";

const products = [
  {
    name: "Smart TV",
    price: "₹24,999",
    wholesale: "₹21,500",
    img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500",
  },
  {
    name: "Washing Machine",
    price: "₹18,999",
    wholesale: "₹16,500",
    img: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500",
  },
  {
    name: "Mixer Grinder",
    price: "₹3,999",
    wholesale: "₹3,200",
    img: "https://images.unsplash.com/photo-1585515656973-5d2e7b65cf95?w=500",
  },
  {
    name: "Ceiling Fan",
    price: "₹2,499",
    wholesale: "₹2,000",
    img: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500",
  },
];
export default function Products() {
  return (
    <section className="products">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.img} alt={item.name} />

            <h3>{item.name}</h3>

            <p>{item.price}</p>

            <span>Wholesale: {item.wholesale}</span>

            <button>View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
}