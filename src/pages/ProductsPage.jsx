import "./ProductsPage.css";

const products = [
  {
    id: 1,
    name: "C24 Smart 4K TV",
    category: "Television",
    price: "₹24,999",
    image: "/images/products/c24-smart-tv.jpg",
  },

  {
    id: 2,
    name: "Premium Washing Machine",
    category: "Washing Machine",
    price: "₹19,999",
    image: "/images/products/c24-washing-machine.jpg",
  },

  {
    id: 3,
    name: "Double Door Refrigerator",
    category: "Refrigerator",
    price: "₹32,999",
    image: "/images/products/c24-refrigerator.jpg",
  },

  {
    id: 4,
    name: "Power Air Cooler",
    category: "Cooling",
    price: "₹8,999",
    image: "/images/products/c24-air-cooler.jpg",
  },
];

export default function ProductsPage() {
  return (
    <section
      className="products-section"
      id="products"
    >

      {/* ================================
          HEADER
      ================================= */}

      <div className="products-header">

        <div>

          <span className="products-label">
            C24 PRODUCT COLLECTION
          </span>

          <h2>
            Premium
            <br />
            <strong>Products.</strong>
          </h2>

        </div>

        <p>
          Explore our collection of premium
          home appliances and electronics
          available for wholesale.
        </p>

      </div>


      {/* ================================
          PRODUCT GRID
      ================================= */}

      <div className="products-grid">

        {products.map((product) => (

          <article
            className="product-card"
            key={product.id}
          >

            {/* IMAGE */}

            <div className="product-image">

              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
              />

              <span className="product-category">
                {product.category}
              </span>

            </div>


            {/* INFO */}

            <div className="product-info">

              <h3>
                {product.name}
              </h3>

              <p className="product-category-text">
                {product.category}
              </p>


              <div className="product-bottom">

                <div className="product-price">

                  <span>
                    Starting from
                  </span>

                  <strong>
                    {product.price}
                  </strong>

                </div>


                {/* WHATSAPP */}

                <a
                  href={`https://wa.me/919724445650?text=${encodeURIComponent(
                    `Hello C24 Wholesale 👋\n\nI am interested in ${product.name}.\nStarting price: ${product.price}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-enquiry"
                >
                  Enquire →
                </a>

              </div>

            </div>

          </article>

        ))}

      </div>


      {/* ================================
          BOTTOM CTA
      ================================= */}

      <div className="products-bottom">

        <div>

          <span>
            WHOLESALE COLLECTION
          </span>

          <h3>
            Need products in
            <strong> bulk quantity?</strong>
          </h3>

        </div>


        <a href="#enquiry">
          Get Wholesale Quote →
        </a>

      </div>

    </section>
  );
}