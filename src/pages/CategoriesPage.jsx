import "./CategoriesPage.css";

const categories = [
  {
    name: "Televisions",
    count: "25+ Products",
    image: "/images/categories/tv.jpg",
  },
  {
    name: "Washing Machines",
    count: "18+ Products",
    image: "/images/categories/washing-machine.jpg",
  },
  {
    name: "Refrigerators",
    count: "20+ Products",
    image: "/images/categories/refrigerator.jpg",
  },
  {
    name: "Kitchen Appliances",
    count: "35+ Products",
    image: "/images/categories/kitchen.jpg",
  },
  {
    name: "Fans",
    count: "15+ Products",
    image: "/images/categories/fan.jpg",
  },
  {
    name: "Cooling",
    count: "12+ Products",
    image: "/images/categories/cooling.jpg",
  },
];

export default function CategoriesPage() {
  return (
    <section className="categories-page">

      {/* HEADER */}

      <div className="categories-header">

        <span>
          C24 PRODUCT CATEGORIES
        </span>

        <h2>
          Shop By
          <br />
          <strong>Category.</strong>
        </h2>

        <p>
          Explore our complete range of
          premium home appliances and
          electronics.
        </p>

      </div>


      {/* CATEGORY GRID */}

      <div className="categories-grid">

        {categories.map((category) => (

          <article
            className="category-card"
            key={category.name}
          >

            <div className="category-image">

              <img
                src={category.image}
                alt={category.name}
              />

            </div>


            <div className="category-content">

              <span>
                {category.count}
              </span>

              <h3>
                {category.name}
              </h3>

              <a href="#products">
                View Products →
              </a>

            </div>

          </article>

        ))}

      </div>

    </section>
  );
}