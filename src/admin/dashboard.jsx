import { useEffect, useState } from "react";
import "./dashboard.css";

const API = "http://localhost:5000/api";

const BASE = import.meta.env.BASE_URL;

const getImageUrl = (image) => {
  if (!image) return "";

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:")
  ) {
    return image;
  }

  if (image.startsWith("/")) {
    return `${BASE}${image.slice(1)}`;
  }

  return image;
};

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  const [activeTab, setActiveTab] = useState("dashboard");

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  /* =====================================================
     LOAD DATA
  ===================================================== */

  const loadData = async () => {
    try {
      const productsResponse = await fetch(`${API}/products`);
      const offersResponse = await fetch(`${API}/offers`);
      const enquiriesResponse = await fetch(`${API}/enquiries`);

      const productsData = await productsResponse.json();
      const offersData = await offersResponse.json();
      const enquiriesData = await enquiriesResponse.json();

      setProducts(productsData);
      setOffers(offersData);
      setEnquiries(enquiriesData);
    } catch (error) {
      console.error("Backend connection error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* =====================================================
     ADD PRODUCT
  ===================================================== */

  const addProduct = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.category ||
      !product.price
    ) {
      alert(
        "Product name, category and price required."
      );
      return;
    }

    try {
      const response = await fetch(
        `${API}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Product add failed."
        );
        return;
      }

      setProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: "",
      });

      await loadData();

      alert(
        "Product added successfully!"
      );
    } catch (error) {
      alert(
        "Backend connect nahi ho raha."
      );
    }
  };

  /* =====================================================
     DELETE PRODUCT
  ===================================================== */

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Kya aap ye product delete karna chahte ho?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `${API}/products/${id}`,
        {
          method: "DELETE",
        }
      );

      await loadData();
    } catch (error) {
      alert(
        "Product delete nahi hua."
      );
    }
  };

  /* =====================================================
     DASHBOARD
  ===================================================== */

  return (
    <div className="admin-panel">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="admin-sidebar">

        <div className="admin-logo">
          C24

          <span>
            WHOLESALE ADMIN
          </span>
        </div>

        <button
          className={
            activeTab === "dashboard"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("dashboard")
          }
        >
          📊 Dashboard
        </button>

        <button
          className={
            activeTab === "products"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("products")
          }
        >
          📦 Products
        </button>

        <button
          className={
            activeTab === "offers"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("offers")
          }
        >
          🔥 Daily Offers
        </button>

        <button
          className={
            activeTab === "enquiries"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("enquiries")
          }
        >
          📩 Enquiries
        </button>

        <div className="admin-sidebar-bottom">
          <a href="/">
            ← Back to Website
          </a>
        </div>

      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="admin-main">

        {/* HEADER */}

        <header className="admin-header">

          <div>
            <span>
              C24 HOME APPLICATION WHOLESALE
            </span>

            <h1>
              Admin Panel
            </h1>
          </div>

          <div className="admin-online">
            <i></i>
            Backend Online
          </div>

        </header>

        {/* =================================================
            DASHBOARD TAB
        ================================================= */}

        {activeTab === "dashboard" && (
          <>

            <div className="admin-cards">

              <div className="admin-card">
                <span>
                  TOTAL PRODUCTS
                </span>

                <strong>
                  {products.length}
                </strong>
              </div>

              <div className="admin-card">
                <span>
                  DAILY OFFERS
                </span>

                <strong>
                  {offers.length}
                </strong>
              </div>

              <div className="admin-card">
                <span>
                  ENQUIRIES
                </span>

                <strong>
                  {enquiries.length}
                </strong>
              </div>

              <div className="admin-card">
                <span>
                  WEBSITE
                </span>

                <strong className="online-text">
                  LIVE
                </strong>
              </div>

            </div>

            <div className="admin-section">

              <div className="section-title">

                <div>
                  <span>
                    INVENTORY
                  </span>

                  <h2>
                    Recent Products
                  </h2>
                </div>

                <button
                  onClick={() =>
                    setActiveTab("products")
                  }
                >
                  + Add Product
                </button>

              </div>

              {products.length === 0 ? (

                <div className="empty-box">

                  <h3>
                    No Products Yet
                  </h3>

                  <p>
                    Products add karne ke liye
                    Products section open karo.
                  </p>

                </div>

              ) : (

                <div className="product-list">

                  {products.map((item) => (

                    <div
                      className="product-row"
                      key={item.id}
                    >

                      <div className="product-image">

                        {item.image ? (

                          <img
                            src={getImageUrl(
                              item.image
                            )}
                            alt={item.name}
                          />

                        ) : (

                          <span>
                            C24
                          </span>

                        )}

                      </div>

                      <div className="product-details">

                        <strong>
                          {item.name}
                        </strong>

                        <small>
                          {item.category}
                        </small>

                      </div>

                      <div className="product-price">

                        ₹
                        {Number(
                          item.price
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </div>

                      <div className="product-stock">

                        Stock:{" "}
                        {item.stock}

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </>
        )}

        {/* =================================================
            PRODUCTS TAB
        ================================================= */}

        {activeTab === "products" && (
          <>

            <div className="admin-section">

              <div className="section-title">

                <div>

                  <span>
                    INVENTORY MANAGEMENT
                  </span>

                  <h2>
                    Add New Product
                  </h2>

                </div>

              </div>

              <form
                className="product-form"
                onSubmit={addProduct}
              >

                <div className="form-group">

                  <label>
                    Product Name
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. C24 Smart 4K TV"
                    value={product.name}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        name:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Category
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Television"
                    value={product.category}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        category:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Price
                  </label>

                  <input
                    type="number"
                    placeholder="24999"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        price:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Stock
                  </label>

                  <input
                    type="number"
                    placeholder="20"
                    value={product.stock}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        stock:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group full">

                  <label>
                    Product Image
                  </label>

                  <input
                    type="text"
                    placeholder="/images/products/c24-smart-tv.jpg"
                    value={product.image}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        image:
                          e.target.value,
                      })
                    }
                  />

                  <small>
                    Abhi image ka path use karo.
                    Actual upload system next step mein
                    add karenge.
                  </small>

                </div>

                <button
                  className="add-product-button"
                  type="submit"
                >
                  + Add Product
                </button>

              </form>

            </div>

            <div className="admin-section">

              <div className="section-title">

                <div>

                  <span>
                    INVENTORY
                  </span>

                  <h2>
                    All Products
                  </h2>

                </div>

              </div>

              <div className="product-list">

                {products.map((item) => (

                  <div
                    className="product-row"
                    key={item.id}
                  >

                    <div className="product-image">

                      {item.image ? (

                        <img
                          src={getImageUrl(
                            item.image
                          )}
                          alt={item.name}
                        />

                      ) : (

                        <span>
                          C24
                        </span>

                      )}

                    </div>

                    <div className="product-details">

                      <strong>
                        {item.name}
                      </strong>

                      <small>
                        {item.category}
                      </small>

                    </div>

                    <div className="product-price">

                      ₹
                      {Number(
                        item.price
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </div>

                    <div className="product-stock">

                      Stock:{" "}
                      {item.stock}

                    </div>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteProduct(
                          item.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                ))}

              </div>

            </div>

          </>
        )}

        {/* =================================================
            OFFERS TAB
        ================================================= */}

        {activeTab === "offers" && (

          <div className="admin-section">

            <div className="section-title">

              <div>

                <span>
                  PROMOTIONS
                </span>

                <h2>
                  Daily Offers
                </h2>

              </div>

            </div>

            {offers.length === 0 ? (

              <div className="empty-box">

                <h3>
                  No Offers
                </h3>

                <p>
                  Abhi koi daily offer available nahi hai.
                </p>

              </div>

            ) : (

              <div className="offer-list">

                {offers.map((offer) => (

                  <div
                    className="offer-row"
                    key={offer.id}
                  >

                    {offer.image && (
                      <img
                        src={getImageUrl(
                          offer.image
                        )}
                        alt={offer.title}
                      />
                    )}

                    <div>

                      <strong>
                        {offer.title}
                      </strong>

                      <small>
                        {offer.product}
                      </small>

                    </div>

                    <del>
                      ₹{offer.oldPrice}
                    </del>

                    <strong className="offer-price">
                      ₹{offer.offerPrice}
                    </strong>

                  </div>

                ))}

              </div>

            )}

          </div>

        )}

        {/* =================================================
            ENQUIRIES TAB
        ================================================= */}

        {activeTab === "enquiries" && (

          <div className="admin-section">

            <div className="section-title">

              <div>

                <span>
                  CUSTOMER REQUESTS
                </span>

                <h2>
                  Wholesale Enquiries
                </h2>

              </div>

            </div>

            {enquiries.length === 0 ? (

              <div className="empty-box">

                <h3>
                  No Enquiries Yet
                </h3>

                <p>
                  Customer enquiries yahan
                  dikhengi.
                </p>

              </div>

            ) : (

              <div className="enquiry-list">

                {enquiries.map((item) => (

                  <div
                    className="enquiry-card"
                    key={item.id}
                  >

                    <div className="enquiry-name">
                      {item.name}
                    </div>

                    <div>
                      📞 {item.phone}
                    </div>

                    <div>
                      📧{" "}
                      {item.email ||
                        "No email"}
                    </div>

                    <div>
                      Product:{" "}
                      {item.product ||
                        "Not specified"}
                    </div>

                    <div>
                      Quantity:{" "}
                      {item.quantity ||
                        "Not specified"}
                    </div>

                    <p>
                      {item.message ||
                        "No message"}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

        )}

      </main>

    </div>
  );
}