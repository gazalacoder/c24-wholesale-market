import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Orders from "./Orders";

import "./dashboard.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const BASE =
  import.meta.env.BASE_URL || "/";


/* =====================================================
   IMAGE URL
===================================================== */

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

  return `${BASE}${image}`;
};


/* =====================================================
   DASHBOARD
===================================================== */

export default function Dashboard() {

  const navigate = useNavigate();

  /* ===================================================
     ADMIN
  =================================================== */

  const admin =
    sessionStorage.getItem("c24_admin");


  /* ===================================================
     STATES
  =================================================== */

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [products, setProducts] =
    useState([]);

  const [offers, setOffers] =
    useState([]);

  const [enquiries, setEnquiries] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  const [priceListDownloads, setPriceListDownloads] =
    useState([]);

  const [aiChats, setAiChats] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);


  /* ===================================================
     PRODUCT FORM
  =================================================== */

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    mrp: "",
    wholesalePrice: "",
    stock: "",
    image: "",
    description: "",
  });


  /* ===================================================
     OFFER FORM
  =================================================== */

  const [offer, setOffer] = useState({
    title: "",
    product: "",
    oldPrice: "",
    offerPrice: "",
    startDate: "",
    endDate: "",
    image: "",
    description: "",
  });


  /* ===================================================
     LOAD DATA
  =================================================== */

  const loadData = async () => {

    try {

      setLoading(true);
      setError("");

      const [
        productsResponse,
        offersResponse,
        enquiriesResponse,
        ordersResponse,
        priceListResponse,
        aiChatsResponse,
      ] = await Promise.all([

        fetch(`${API}/products`),

        fetch(`${API}/offers`),

        fetch(`${API}/enquiries`),

        fetch(`${API}/orders`),

        fetch(`${API}/price-list-downloads`),

        fetch(`${API}/ai-chats`),

      ]);


      const productsData =
        await productsResponse.json();

      const offersData =
        await offersResponse.json();

      const enquiriesData =
        await enquiriesResponse.json();

      const ordersData =
        await ordersResponse.json();

      const priceListData =
        await priceListResponse.json();

      const aiChatsData =
        await aiChatsResponse.json();


      if (!productsResponse.ok) {
        throw new Error(
          productsData.message ||
          "Products load failed"
        );
      }


      if (!offersResponse.ok) {
        throw new Error(
          offersData.message ||
          "Offers load failed"
        );
      }


      if (!enquiriesResponse.ok) {
        throw new Error(
          enquiriesData.message ||
          "Enquiries load failed"
        );
      }


      if (!ordersResponse.ok) {
        throw new Error(
          ordersData.message ||
          "Orders load failed"
        );
      }


      if (!priceListResponse.ok) {
        throw new Error(
          priceListData.message ||
          "Price list data load failed"
        );
      }


      if (!aiChatsResponse.ok) {
        throw new Error(
          aiChatsData.message ||
          "AI chats load failed"
        );
      }


      setProducts(
        Array.isArray(productsData)
          ? productsData
          : productsData.products || []
      );


      setOffers(
        Array.isArray(offersData)
          ? offersData
          : offersData.offers || []
      );


      setEnquiries(
        Array.isArray(enquiriesData)
          ? enquiriesData
          : enquiriesData.enquiries || []
      );


      setOrders(
        Array.isArray(ordersData)
          ? ordersData
          : ordersData.orders || []
      );


      setPriceListDownloads(
        Array.isArray(priceListData)
          ? priceListData
          : priceListData.downloads || []
      );


      setAiChats(
        Array.isArray(aiChatsData)
          ? aiChatsData
          : aiChatsData.chats || []
      );


    } catch (err) {

      console.error(
        "Dashboard load error:",
        err
      );

      setError(
        err.message ||
        "Backend connect nahi ho raha."
      );

    } finally {

      setLoading(false);

    }

  };


  /* ===================================================
     INITIAL LOAD
  =================================================== */

  useEffect(() => {

    if (admin) {
      loadData();
    }

  }, []);


  /* ===================================================
     RESET PRODUCT
  =================================================== */

  const resetProduct = () => {

    setEditingId(null);

    setProduct({
      name: "",
      brand: "",
      category: "",
      mrp: "",
      wholesalePrice: "",
      stock: "",
      image: "",
      description: "",
    });

  };


  /* ===================================================
     ADD PRODUCT
  =================================================== */

  const addProduct = async (e) => {

    e.preventDefault();

    if (
      !product.name.trim() ||
      !product.category.trim() ||
      !product.mrp
    ) {

      alert(
        "Product name, category and MRP required."
      );

      return;
    }


    try {

      const response =
        await fetch(
          `${API}/products`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              name:
                product.name.trim(),

              brand:
                product.brand.trim(),

              category:
                product.category.trim(),

              mrp:
                Number(product.mrp),

              wholesalePrice:
                Number(
                  product.wholesalePrice ||
                  product.mrp
                ),

              price:
                Number(product.mrp),

              stock:
                Number(
                  product.stock || 0
                ),

              image:
                product.image.trim(),

              description:
                product.description.trim(),

            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Product add failed."
        );

        return;
      }


      resetProduct();

      await loadData();


      alert(
        "Product added successfully!"
      );


    } catch (err) {

      console.error(err);

      alert(
        "Backend connect nahi ho raha."
      );

    }

  };


  /* ===================================================
     EDIT PRODUCT
  =================================================== */

  const editProduct = (item) => {

    setEditingId(item.id);

    setProduct({

      name:
        item.name || "",

      brand:
        item.brand || "",

      category:
        item.category || "",

      mrp:
        item.mrp ||
        item.price ||
        "",

      wholesalePrice:
        item.wholesalePrice ||
        item.price ||
        "",

      stock:
        item.stock || "",

      image:
        item.image ||
        item.images?.[0] ||
        "",

      description:
        item.description || "",

    });


    setActiveTab("products");


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* ===================================================
     UPDATE PRODUCT
  =================================================== */

  const updateProduct = async (e) => {

    e.preventDefault();

    if (!editingId) return;


    try {

      const response =
        await fetch(
          `${API}/products/${editingId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              name:
                product.name.trim(),

              brand:
                product.brand.trim(),

              category:
                product.category.trim(),

              mrp:
                Number(product.mrp),

              wholesalePrice:
                Number(
                  product.wholesalePrice ||
                  product.mrp
                ),

              price:
                Number(product.mrp),

              stock:
                Number(
                  product.stock || 0
                ),

              image:
                product.image.trim(),

              description:
                product.description.trim(),

            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Product update failed."
        );

        return;
      }


      resetProduct();

      await loadData();


      alert(
        "Product updated successfully!"
      );


    } catch (err) {

      console.error(err);

      alert(
        "Backend connect nahi ho raha."
      );

    }

  };


  /* ===================================================
     DELETE PRODUCT
  =================================================== */

  const deleteProduct = async (id) => {

    if (
      !window.confirm(
        "Kya aap ye product delete karna chahte ho?"
      )
    ) {
      return;
    }


    try {

      const response =
        await fetch(
          `${API}/products/${id}`,
          {
            method: "DELETE",
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Product delete failed."
        );

        return;
      }


      if (
        String(editingId) ===
        String(id)
      ) {
        resetProduct();
      }


      await loadData();


    } catch (err) {

      console.error(err);

      alert(
        "Product delete nahi hua."
      );

    }

  };


  /* ===================================================
     ADD OFFER
  =================================================== */

  const addOffer = async (e) => {

    e.preventDefault();

    if (
      !offer.title.trim() ||
      !offer.product.trim() ||
      !offer.offerPrice
    ) {

      alert(
        "Offer title, product and offer price required."
      );

      return;
    }


    try {

      const response =
        await fetch(
          `${API}/offers`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              title:
                offer.title.trim(),

              product:
                offer.product.trim(),

              oldPrice:
                Number(
                  offer.oldPrice || 0
                ),

              offerPrice:
                Number(
                  offer.offerPrice
                ),

              startDate:
                offer.startDate ||
                null,

              endDate:
                offer.endDate ||
                null,

              image:
                offer.image.trim(),

              description:
                offer.description.trim(),

            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Offer create failed."
        );

        return;
      }


      setOffer({
        title: "",
        product: "",
        oldPrice: "",
        offerPrice: "",
        startDate: "",
        endDate: "",
        image: "",
        description: "",
      });


      await loadData();


      alert(
        "Offer created successfully!"
      );


    } catch (err) {

      console.error(err);

      alert(
        "Backend connect nahi ho raha."
      );

    }

  };


  /* ===================================================
     DELETE OFFER
  =================================================== */

  const deleteOffer = async (id) => {

    if (
      !window.confirm(
        "Kya aap ye offer delete karna chahte ho?"
      )
    ) {
      return;
    }


    try {

      const response =
        await fetch(
          `${API}/offers/${id}`,
          {
            method: "DELETE",
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Offer delete failed."
        );

        return;
      }


      await loadData();


    } catch (err) {

      console.error(err);

      alert(
        "Offer delete nahi hua."
      );

    }

  };


  /* ===================================================
     UPDATE ENQUIRY STATUS
  =================================================== */

  const updateEnquiryStatus =
    async (
      id,
      status
    ) => {

      try {

        const response =
          await fetch(
            `${API}/enquiries/${id}/status`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                status,
              }),
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          alert(
            data.message ||
            "Status update failed."
          );

          return;
        }


        await loadData();


      } catch (err) {

        console.error(err);

        alert(
          "Backend connect nahi ho raha."
        );

      }

    };


  /* ===================================================
     DELETE ENQUIRY
  =================================================== */

  const deleteEnquiry =
    async (id) => {

      if (
        !window.confirm(
          "Kya aap ye enquiry delete karna chahte ho?"
        )
      ) {
        return;
      }


      try {

        const response =
          await fetch(
            `${API}/enquiries/${id}`,
            {
              method: "DELETE",
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          alert(
            data.message ||
            "Enquiry delete failed."
          );

          return;
        }


        await loadData();


      } catch (err) {

        console.error(err);

        alert(
          "Enquiry delete nahi hui."
        );

      }

    };


  /* ===================================================
     LOGOUT
  =================================================== */

  const logout = () => {

    sessionStorage.removeItem(
      "c24_admin"
    );

    navigate(
      "/admin",
      {
        replace: true,
      }
    );

  };


  /* ===================================================
     PROTECTION
  =================================================== */

  if (!admin) {

    return (
      <Navigate
        to="/admin"
        replace
      />
    );

  }


  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {

    return (

      <div className="admin-loading">

        <div>
          C24 Admin
        </div>

        <p>
          Loading dashboard...
        </p>

      </div>

    );

  }


  /* ===================================================
     UI
  =================================================== */

  return (

    <div className="admin-panel">


      {/* =========================================
          SIDEBAR
      ========================================= */}

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


        <button
          className={
            activeTab === "orders"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("orders")
          }
        >
          🛒 Orders
        </button>


        {/* NEW */}

        <button
          className={
            activeTab === "priceList"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("priceList")
          }
        >
          📄 Price List
        </button>


        <button
          className={
            activeTab === "aiChats"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("aiChats")
          }
        >
          🤖 AI Chats
        </button>


        <div className="admin-sidebar-bottom">


          <button
            type="button"
            onClick={logout}
          >
            🔐 Logout
          </button>


          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
          >
            ← Back to Website
          </button>


        </div>

      </aside>


      {/* =========================================
          MAIN
      ========================================= */}

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


        {/* ERROR */}

        {error && (

          <div className="admin-error">

            {error}

          </div>

        )}


        {/* =====================================
            DASHBOARD
        ===================================== */}

        {activeTab === "dashboard" && (

          <>


            {/* CARDS */}

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
                  ORDERS
                </span>

                <strong>
                  {orders.length}
                </strong>

              </div>


              <div className="admin-card">

                <span>
                  PRICE LIST DOWNLOADS
                </span>

                <strong>
                  {priceListDownloads.length}
                </strong>

              </div>


              <div className="admin-card">

                <span>
                  AI CHAT MESSAGES
                </span>

                <strong>
                  {aiChats.length}
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


            {/* QUICK ACTIONS */}

            <div className="admin-section">


              <div className="section-title">

                <div>

                  <span>
                    QUICK ACTIONS
                  </span>

                  <h2>
                    Manage Store
                  </h2>

                </div>

              </div>


              <div className="quick-actions">


                <button
                  onClick={() => {

                    resetProduct();

                    setActiveTab(
                      "products"
                    );

                  }}
                >
                  📦 Add Product
                </button>


                <button
                  onClick={() =>
                    setActiveTab(
                      "offers"
                    )
                  }
                >
                  🔥 Create Offer
                </button>


                <button
                  onClick={() =>
                    setActiveTab(
                      "enquiries"
                    )
                  }
                >
                  📩 View Enquiries
                </button>


                <button
                  onClick={() =>
                    setActiveTab(
                      "orders"
                    )
                  }
                >
                  🛒 View Orders
                </button>


                <button
                  onClick={() =>
                    setActiveTab(
                      "priceList"
                    )
                  }
                >
                  📄 Price List
                </button>


                <button
                  onClick={() =>
                    setActiveTab(
                      "aiChats"
                    )
                  }
                >
                  🤖 AI Chats
                </button>


              </div>

            </div>


            {/* RECENT PRODUCTS */}

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

                  {products
                    .slice(0, 8)
                    .map((item) => (

                      <div
                        className="product-row"
                        key={item.id}
                      >


                        <div className="product-image">

                          {getImageUrl(
                            item.image ||
                            item.images?.[0]
                          ) ? (

                            <img
                              src={getImageUrl(
                                item.image ||
                                item.images?.[0]
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

                            {item.brand
                              ? `${item.brand} • `
                              : ""}

                            {item.category}

                          </small>

                        </div>


                        <div className="product-price">

                          ₹
                          {Number(
                            item.wholesalePrice ||
                            item.price ||
                            0
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </div>


                        <div className="product-stock">

                          Stock:{" "}
                          {item.stock || 0}

                        </div>


                      </div>

                    ))}

                </div>

              )}

            </div>

          </>

        )}


        {/* =====================================
            PRODUCTS
        ===================================== */}

        {activeTab === "products" && (

          <>


            <div className="admin-section">

              <div className="section-title">

                <div>

                  <span>
                    INVENTORY MANAGEMENT
                  </span>

                  <h2>
                    {editingId
                      ? "Edit Product"
                      : "Add New Product"}
                  </h2>

                </div>

              </div>


              <form
                className="product-form"
                onSubmit={
                  editingId
                    ? updateProduct
                    : addProduct
                }
              >


                <div className="form-group">

                  <label>
                    Product Name
                  </label>

                  <input
                    type="text"
                    placeholder="C24 Smart 4K TV"
                    value={product.name}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        name:
                          e.target.value,
                      })
                    }
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Brand
                  </label>

                  <input
                    type="text"
                    placeholder="C24"
                    value={product.brand}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        brand:
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
                    placeholder="Television"
                    value={
                      product.category
                    }
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        category:
                          e.target.value,
                      })
                    }
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    MRP
                  </label>

                  <input
                    type="number"
                    placeholder="24999"
                    value={product.mrp}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        mrp:
                          e.target.value,
                      })
                    }
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Wholesale Price
                  </label>

                  <input
                    type="number"
                    placeholder="21999"
                    value={
                      product.wholesalePrice
                    }
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        wholesalePrice:
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
                    min="0"
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
                    Product Image URL
                  </label>

                  <input
                    type="text"
                    placeholder="/images/products/product.jpg"
                    value={product.image}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        image:
                          e.target.value,
                      })
                    }
                  />

                </div>


                <div className="form-group full">

                  <label>
                    Description
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Product description..."
                    value={
                      product.description
                    }
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        description:
                          e.target.value,
                      })
                    }
                  />

                </div>


                <button
                  type="submit"
                  className="add-product-button"
                >
                  {editingId
                    ? "✓ Update Product"
                    : "+ Add Product"}
                </button>


                {editingId && (

                  <button
                    type="button"
                    className="cancel-button"
                    onClick={
                      resetProduct
                    }
                  >
                    Cancel Edit
                  </button>

                )}

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


              {products.length === 0 ? (

                <div className="empty-box">

                  <h3>
                    No Products
                  </h3>

                  <p>
                    Abhi koi product add nahi hua.
                  </p>

                </div>

              ) : (

                <div className="product-list">

                  {products.map(
                    (item) => (

                      <div
                        className="product-row"
                        key={item.id}
                      >

                        <div className="product-image">

                          {getImageUrl(
                            item.image ||
                            item.images?.[0]
                          ) ? (

                            <img
                              src={getImageUrl(
                                item.image ||
                                item.images?.[0]
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

                            {item.brand
                              ? `${item.brand} • `
                              : ""}

                            {item.category}

                          </small>

                        </div>


                        <div className="product-price">

                          ₹
                          {Number(
                            item.wholesalePrice ||
                            item.price ||
                            0
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </div>


                        <div className="product-stock">

                          Stock:{" "}
                          {item.stock || 0}

                        </div>


                        <button
                          type="button"
                          className="edit-button"
                          onClick={() =>
                            editProduct(
                              item
                            )
                          }
                        >
                          Edit
                        </button>


                        <button
                          type="button"
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

                    )
                  )}

                </div>

              )}

            </div>

          </>

        )}


        {/* =====================================
            OFFERS
        ===================================== */}

        {activeTab === "offers" && (

          <>


            <div className="admin-section">

              <div className="section-title">

                <div>

                  <span>
                    PROMOTIONS
                  </span>

                  <h2>
                    Create Daily Offer
                  </h2>

                </div>

              </div>


              <form
                className="product-form"
                onSubmit={addOffer}
              >


                <div className="form-group">

                  <label>
                    Offer Title
                  </label>

                  <input
                    type="text"
                    placeholder="Summer TV Offer"
                    value={offer.title}
                    onChange={(e) =>
                      setOffer({
                        ...offer,
                        title:
                          e.target.value,
                      })
                    }
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Product
                  </label>

                  <input
                    type="text"
                    placeholder="C24 Smart 4K TV"
                    value={
                      offer.product
                    }
                    onChange={(e) =>
                      setOffer({
                        ...offer,
                        product:
                          e.target.value,
                      })
                    }
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Old Price
                  </label>

                  <input
                    type="number"
                    placeholder="24999"
                    value={
                      offer.oldPrice
                    }
                    onChange={(e) =>
                      setOffer({
                        ...offer,
                        oldPrice:
                          e.target.value,
                      })
                    }
                  />

                </div>


                <div className="form-group">

                  <label>
                    Offer Price
                  </label>

                  <input
                    type="number"
                    placeholder="14999"
                    value={
                      offer.offerPrice
                    }
                    onChange={(e) =>
                      setOffer({
                        ...offer,
                        offerPrice:
                          e.target.value,
                      })
                    }
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={
                      offer.startDate
                    }
                    onChange={(e) =>
                      setOffer({
                        ...offer,
                        startDate:
                          e.target.value,
                      })
                    }
                  />

                </div>


                <div className="form-group">

                  <label>
                    End Date
                  </label>

                  <input
                    type="date"
                    value={
                      offer.endDate
                    }
                    onChange={(e) =>
                      setOffer({
                        ...offer,
                        endDate:
                          e.target.value,
                      })
                    }
                  />

                </div>


                <div className="form-group full">

                  <label>
                    Offer Image URL
                  </label>

                  <input
                    type="text"
                    placeholder="/images/offers/offer.jpg"
                    value={offer.image}
                    onChange={(e) =>
                      setOffer({
                        ...offer,
                        image:
                          e.target.value,
                      })
                    }
                  />

                </div>


                <div className="form-group full">

                  <label>
                    Description
                  </label>

                  <textarea
                    rows="3"
                    placeholder="Offer description..."
                    value={
                      offer.description
                    }
                    onChange={(e) =>
                      setOffer({
                        ...offer,
                        description:
                          e.target.value,
                      })
                    }
                  />

                </div>


                <button
                  type="submit"
                  className="add-product-button"
                >
                  + Create Offer
                </button>

              </form>

            </div>


            <div className="admin-section">

              <div className="section-title">

                <div>

                  <span>
                    ACTIVE PROMOTIONS
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
                    Abhi koi offer available nahi hai.
                  </p>

                </div>

              ) : (

                <div className="offer-list">

                  {offers.map(
                    (item) => (

                      <div
                        className="offer-row"
                        key={item.id}
                      >

                        {getImageUrl(
                          item.image
                        ) && (

                          <img
                            src={getImageUrl(
                              item.image
                            )}
                            alt={item.title}
                          />

                        )}


                        <div>

                          <strong>
                            {item.title}
                          </strong>

                          <small>
                            {item.product}
                          </small>

                        </div>


                        <del>
                          ₹
                          {Number(
                            item.oldPrice ||
                            0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </del>


                        <strong className="offer-price">

                          ₹
                          {Number(
                            item.offerPrice ||
                            0
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </strong>


                        <button
                          type="button"
                          className="delete-button"
                          onClick={() =>
                            deleteOffer(
                              item.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          </>

        )}


        {/* =====================================
            ENQUIRIES
        ===================================== */}

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

                {enquiries.map(
                  (item) => (

                    <div
                      className="enquiry-card"
                      key={item.id}
                    >

                      <h3>
                        {item.name}
                      </h3>


                      <p>
                        🏢{" "}
                        {item.business ||
                        "No business"}
                      </p>


                      <p>
                        📞{" "}
                        {item.phone}
                      </p>


                      <p>
                        📧{" "}
                        {item.email ||
                        "No email"}
                      </p>


                      <p>
                        Product:{" "}
                        {item.product}
                      </p>


                      <p>
                        Quantity:{" "}
                        {item.quantity}
                      </p>


                      <p>
                        {item.message ||
                        "No message"}
                      </p>


                      <div className="enquiry-actions">


                        <select
                          value={
                            item.status ||
                            "New"
                          }
                          onChange={(e) =>
                            updateEnquiryStatus(
                              item.id,
                              e.target.value
                            )
                          }
                        >

                          <option value="New">
                            New
                          </option>

                          <option value="Contacted">
                            Contacted
                          </option>

                          <option value="Closed">
                            Closed
                          </option>

                        </select>


                        <button
                          type="button"
                          className="delete-button"
                          onClick={() =>
                            deleteEnquiry(
                              item.id
                            )
                          }
                        >
                          Delete
                        </button>


                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        )}


        {/* =====================================
            ORDERS
        ===================================== */}

        {activeTab === "orders" && (

          <Orders />

        )}


        {/* =====================================
            PRICE LIST DOWNLOADS
        ===================================== */}

        {activeTab === "priceList" && (

          <div className="admin-section">


            <div className="section-title">

              <div>

                <span>
                  PRICE LIST
                </span>

                <h2>
                  Price List Downloads
                </h2>

              </div>

            </div>


            {priceListDownloads.length === 0 ? (

              <div className="empty-box">

                <h3>
                  No Downloads Yet
                </h3>

                <p>
                  Price list download hone par
                  customer details yahan दिखाई देंगी.
                </p>

              </div>

            ) : (

              <div className="enquiry-list">

                {priceListDownloads.map(
                  (item) => (

                    <div
                      className="enquiry-card"
                      key={item.id}
                    >

                      <h3>
                        📄 Price List Download
                      </h3>


                      <p>
                        👤{" "}
                        {item.name ||
                        "Guest"}
                      </p>


                      <p>
                        🏢{" "}
                        {item.business ||
                        "No business"}
                      </p>


                      <p>
                        📞{" "}
                        {item.phone ||
                        "No phone"}
                      </p>


                      <p>
                        📧{" "}
                        {item.email ||
                        "No email"}
                      </p>


                      <p>
                        🌐 Language:{" "}
                        {item.language ||
                        "EN"}
                      </p>


                      <small>

                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleString(
                              "en-IN"
                            )
                          : ""}

                      </small>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        )}


        {/* =====================================
            AI CHATS
        ===================================== */}

        {activeTab === "aiChats" && (

          <div className="admin-section">


            <div className="section-title">

              <div>

                <span>
                  CUSTOMER SUPPORT
                </span>

                <h2>
                  AI Chat Messages
                </h2>

              </div>

            </div>


            {aiChats.length === 0 ? (

              <div className="empty-box">

                <h3>
                  No AI Chats Yet
                </h3>

                <p>
                  Website par AI chat hone par
                  messages yahan दिखाई देंगे.
                </p>

              </div>

            ) : (

              <div className="enquiry-list">

                {aiChats.map(
                  (chat) => (

                    <div
                      className="enquiry-card"
                      key={chat.id}
                    >

                      <h3>
                        🤖{" "}
                        {chat.name ||
                        "Website Visitor"}
                      </h3>


                      <p>
                        📞{" "}
                        {chat.phone ||
                        "No phone"}
                      </p>


                      <p>
                        📧{" "}
                        {chat.email ||
                        "No email"}
                      </p>


                      <p>
                        🌐 Language:{" "}
                        {chat.language ||
                        "EN"}
                      </p>


                      <div
                        style={{
                          marginTop:
                            "12px",
                          padding:
                            "12px",
                          background:
                            "#f5f5f5",
                          borderRadius:
                            "8px",
                        }}
                      >

                        <strong>
                          User Message
                        </strong>

                        <p>
                          {chat.message ||
                          "No message"}
                        </p>

                      </div>


                      {chat.reply && (

                        <div
                          style={{
                            marginTop:
                              "10px",
                            padding:
                              "12px",
                            background:
                              "#eeeeee",
                            borderRadius:
                              "8px",
                          }}
                        >

                          <strong>
                            AI Reply
                          </strong>

                          <p>
                            {chat.reply}
                          </p>

                        </div>

                      )}


                      <small>

                        {chat.createdAt
                          ? new Date(
                              chat.createdAt
                            ).toLocaleString(
                              "en-IN"
                            )
                          : ""}

                      </small>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        )}

      </main>

    </div>

  );

}