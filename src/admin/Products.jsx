import React from "react";

const BASE = import.meta.env.BASE_URL;

const products = [
  {
    id: 1,
    name: "C24 Smart 4K TV",
    category: "Television",
    price: "₹24,999",
    image: `${BASE}images/products/c24-smart-tv.jpg`,
  },
  {
    id: 2,
    name: "C24 Refrigerator",
    category: "Refrigerator",
    price: "₹32,999",
    image: `${BASE}images/products/c24-refrigerator.jpg`,
  },
  {
    id: 3,
    name: "C24 Washing Machine",
    category: "Washing Machine",
    price: "₹19,999",
    image: `${BASE}images/products/c24-washing-machine.jpg`,
  },
  {
    id: 4,
    name: "C24 Air Cooler",
    category: "Air Cooler",
    price: "₹8,999",
    image: `${BASE}images/products/c24-air-cooler.jpg`,
  },
  {
    id: 5,
    name: "C24 Microwave Oven",
    category: "Microwave",
    price: "₹9,999",
    image: `${BASE}images/products/c24-microwave.jpg`,
  },
  {
    id: 6,
    name: "C24 Mixer Grinder",
    category: "Kitchen Appliance",
    price: "₹3,499",
    image: `${BASE}images/products/c24-mixer.jpg`,
  },
  {
    id: 7,
    name: "C24 Split AC",
    category: "Air Conditioner",
    price: "₹34,999",
    image: `${BASE}images/products/c24-ac.jpg`,
  },
];

function Product() {
  return (
    <section className="products-page">
      <div className="products-container">

        <div className="products-heading">
          <span>
            C24 HOME APPLICATION WHOLESALE
          </span>

          <h1>
            Our Products
          </h1>

          <p>
            Explore our premium home appliances
            available for wholesale orders.
          </p>
        </div>

        <div className="products-grid">

          {products.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >

              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="product-info">

                <small>
                  {product.category}
                </small>

                <h2>
                  {product.name}
                </h2>

                <div className="product-price">
                  {product.price}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const text =
                      `Hello C24 Wholesale 👋\n\nI am interested in:\n${product.name}\nPrice: ${product.price}`;

                    const url =
                      `https://wa.me/919724445650?text=${encodeURIComponent(text)}`;

                    window.open(
                      url,
                      "_blank"
                    );
                  }}
                >
                  Enquire on WhatsApp →
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Product;