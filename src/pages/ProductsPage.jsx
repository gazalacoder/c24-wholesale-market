import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useLanguage,
} from "../LanguageContext";

import "./ProductsPage.css";


const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


/* =====================================================
   IMAGE URL
===================================================== */

const getImageUrl = (product) => {
  const image =
    product?.image ||
    product?.images?.[0] ||
    "";

  if (!image) return "";

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:")
  ) {
    return image;
  }

  if (image.startsWith("/")) {
    return image;
  }

  return `/${image}`;
};


/* =====================================================
   PRODUCTS PAGE
===================================================== */

export default function ProductsPage() {

  const {
    t,
  } = useLanguage();

  const navigate =
    useNavigate();


  /* ===================================================
     PRODUCTS
  =================================================== */

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* ===================================================
     FILTERS
  =================================================== */

  const [search, setSearch] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [sort, setSort] =
    useState("");

  const [inStock, setInStock] =
    useState(false);


  /* ===================================================
     RETAILER
  =================================================== */

  const [retailer, setRetailer] =
    useState(null);


  /* ===================================================
     CART COUNT
  =================================================== */

  const [cartCount, setCartCount] =
    useState(0);


  /* ===================================================
     CHECK RETAILER
  =================================================== */

  useEffect(() => {

    const checkRetailer = () => {

      try {

        const saved =
          localStorage.getItem(
            "c24Retailer"
          );

        if (!saved) {

          setRetailer(null);

          return;
        }

        const data =
          JSON.parse(saved);

        if (!data) {

          setRetailer(null);

          return;
        }

        setRetailer(data);

      } catch (err) {

        console.error(
          "Retailer storage error:",
          err
        );

        localStorage.removeItem(
          "c24Retailer"
        );

        setRetailer(null);
      }
    };


    checkRetailer();


    window.addEventListener(
      "storage",
      checkRetailer
    );


    window.addEventListener(
      "c24-retailer-login",
      checkRetailer
    );


    window.addEventListener(
      "c24-retailer-logout",
      checkRetailer
    );


    return () => {

      window.removeEventListener(
        "storage",
        checkRetailer
      );

      window.removeEventListener(
        "c24-retailer-login",
        checkRetailer
      );

      window.removeEventListener(
        "c24-retailer-logout",
        checkRetailer
      );

    };

  }, []);


  /* ===================================================
     CART COUNT
  =================================================== */

  const updateCartCount = () => {

    try {

      const saved =
        JSON.parse(
          localStorage.getItem(
            "c24Cart"
          ) || "[]"
        );


      if (!Array.isArray(saved)) {

        setCartCount(0);

        return;
      }


      const count =
        saved.reduce(
          (total, item) =>
            total +
            Number(
              item.quantity || 1
            ),
          0
        );


      setCartCount(count);

    } catch (err) {

      console.error(
        "Cart count error:",
        err
      );

      setCartCount(0);
    }
  };


  useEffect(() => {

    updateCartCount();


    window.addEventListener(
      "storage",
      updateCartCount
    );


    window.addEventListener(
      "c24-cart-updated",
      updateCartCount
    );


    return () => {

      window.removeEventListener(
        "storage",
        updateCartCount
      );

      window.removeEventListener(
        "c24-cart-updated",
        updateCartCount
      );

    };

  }, []);


  /* ===================================================
     LOAD PRODUCTS
  =================================================== */

  useEffect(() => {

    let cancelled = false;


    const loadProducts = async () => {

      try {

        setLoading(true);

        setError("");


        const response =
          await fetch(
            `${API}/products`
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data?.message ||
            "Products request failed"
          );

        }


        const list =
          Array.isArray(data)
            ? data
            : Array.isArray(
                data.products
              )
            ? data.products
            : [];


        if (!cancelled) {

          setProducts(list);

        }

      } catch (err) {

        console.error(
          "Products API error:",
          err
        );


        if (!cancelled) {

          setProducts([]);

          setError(
            "Products load nahi ho rahe. Backend check karo."
          );

        }

      } finally {

        if (!cancelled) {

          setLoading(false);

        }

      }

    };


    loadProducts();


    return () => {

      cancelled = true;

    };

  }, []);


  /* ===================================================
     BRANDS
  =================================================== */

  const brands =
    useMemo(() => {

      return [
        ...new Set(
          products
            .map(
              (product) =>
                product.brand
            )
            .filter(Boolean)
        ),
      ].sort();

    }, [products]);


  /* ===================================================
     CATEGORIES
  =================================================== */

  const categories =
    useMemo(() => {

      return [
        ...new Set(
          products
            .map(
              (product) =>
                product.category
            )
            .filter(Boolean)
        ),
      ].sort();

    }, [products]);


  /* ===================================================
     FILTER PRODUCTS
  =================================================== */

  const filteredProducts =
    useMemo(() => {

      let result =
        [...products];


      /* SEARCH */

      if (search.trim()) {

        const text =
          search
            .trim()
            .toLowerCase();


        result =
          result.filter(
            (product) => {

              const name =
                String(
                  product.name ||
                  ""
                ).toLowerCase();


              const brandName =
                String(
                  product.brand ||
                  ""
                ).toLowerCase();


              const categoryName =
                String(
                  product.category ||
                  ""
                ).toLowerCase();


              return (
                name.includes(text) ||
                brandName.includes(text) ||
                categoryName.includes(text)
              );

            }
          );

      }


      /* BRAND */

      if (brand) {

        result =
          result.filter(
            (product) =>
              String(
                product.brand ||
                ""
              ).toLowerCase() ===
              brand.toLowerCase()
          );

      }


      /* CATEGORY */

      if (category) {

        result =
          result.filter(
            (product) =>
              String(
                product.category ||
                ""
              ).toLowerCase() ===
              category.toLowerCase()
          );

      }


      /* STOCK */

      if (inStock) {

        result =
          result.filter(
            (product) =>
              Number(
                product.stock || 0
              ) > 0
          );

      }


      /* PRICE LOW */

      if (sort === "low") {

        result.sort(
          (a, b) =>
            Number(
              a.wholesalePrice ||
              a.price ||
              0
            ) -
            Number(
              b.wholesalePrice ||
              b.price ||
              0
            )
        );

      }


      /* PRICE HIGH */

      if (sort === "high") {

        result.sort(
          (a, b) =>
            Number(
              b.wholesalePrice ||
              b.price ||
              0
            ) -
            Number(
              a.wholesalePrice ||
              a.price ||
              0
            )
        );

      }


      /* NEWEST */

      if (sort === "newest") {

        result.sort(
          (a, b) =>
            new Date(
              b.createdAt || 0
            ) -
            new Date(
              a.createdAt || 0
            )
        );

      }


      return result;

    }, [
      products,
      search,
      brand,
      category,
      sort,
      inStock,
    ]);


  /* ===================================================
     ADD TO CART
  =================================================== */

  const addToCart = (product) => {

    /* RETAILER REQUIRED */

    if (!retailer) {

      navigate(
        "/retailer-login"
      );

      return;
    }


    const stock =
      Number(
        product.stock || 0
      );


    if (stock <= 0) {

      alert(
        t("outOfStock")
      );

      return;
    }


    try {

      const saved =
        JSON.parse(
          localStorage.getItem(
            "c24Cart"
          ) || "[]"
        );


      const cart =
        Array.isArray(saved)
          ? saved
          : [];


      const existing =
        cart.find(
          (item) =>
            String(item.id) ===
            String(product.id)
        );


      let newCart;


      /* EXISTING PRODUCT */

      if (existing) {

        const quantity =
          Number(
            existing.quantity || 1
          ) + 1;


        if (quantity > stock) {

          alert(
            `${t("stock")}: ${stock}`
          );

          return;
        }


        newCart =
          cart.map(
            (item) =>
              String(item.id) ===
              String(product.id)
                ? {
                    ...item,
                    quantity,
                  }
                : item
          );

      }


      /* NEW PRODUCT */

      else {

        newCart = [

          ...cart,

          {
            id:
              product.id,

            name:
              product.name,

            brand:
              product.brand ||
              "",

            category:
              product.category ||
              "",

            image:
              product.image ||
              product.images?.[0] ||
              "",

            price:
              Number(
                product.wholesalePrice ||
                product.price ||
                0
              ),

            wholesalePrice:
              Number(
                product.wholesalePrice ||
                product.price ||
                0
              ),

            mrp:
              Number(
                product.mrp ||
                product.price ||
                0
              ),

            stock:
              stock,

            quantity:
              1,
          },

        ];

      }


      localStorage.setItem(
        "c24Cart",
        JSON.stringify(
          newCart
        )
      );


      const count =
        newCart.reduce(
          (total, item) =>
            total +
            Number(
              item.quantity || 1
            ),
          0
        );


      setCartCount(count);


      window.dispatchEvent(
        new Event(
          "c24-cart-updated"
        )
      );


      alert(
        `${product.name} - ${t("addToCart")}`
      );


    } catch (err) {

      console.error(
        "Cart error:",
        err
      );

      alert(
        "Cart update failed."
      );

    }

  };


  /* ===================================================
     WHATSAPP
  =================================================== */

  const whatsapp = (product) => {

    const price =
      Number(
        product.wholesalePrice ||
        product.price ||
        0
      );


    const message =
`Hello C24 Wholesale 👋

Product: ${product.name}
Brand: ${product.brand || "N/A"}
Category: ${product.category || "N/A"}
Price: ₹${price.toLocaleString("en-IN")}

Please share wholesale details.`;


    const url =
      `https://wa.me/919724445650?text=${encodeURIComponent(
        message
      )}`;


    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  };


  /* ===================================================
     LOGOUT
  =================================================== */

  const logout = () => {

    localStorage.removeItem(
      "c24Retailer"
    );

    localStorage.removeItem(
      "c24_retailer"
    );

    localStorage.removeItem(
      "c24_retailer_id"
    );


    setRetailer(null);


    window.dispatchEvent(
      new Event(
        "c24-retailer-logout"
      )
    );

  };


  /* ===================================================
     CLEAR FILTERS
  =================================================== */

  const clearFilters = () => {

    setSearch("");

    setBrand("");

    setCategory("");

    setSort("");

    setInStock(false);

  };


  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {

    return (

      <section
        id="products"
        className="products-section"
      >

        <div className="products-heading">

          <span>
            C24 PRODUCT COLLECTION
          </span>

          <h2>
            {t("products")}
          </h2>

          <p>
            {t("loading")}
          </p>

        </div>

      </section>

    );

  }


  /* ===================================================
     PAGE
  =================================================== */

  return (

    <section
      id="products"
      className="products-section"
    >


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="products-heading">

        <span>
          {t("productCollection")}
        </span>

        <h2>

          Premium

          <br />

          <strong>
            {t("products")}.
          </strong>

        </h2>

        <p>
          {t("categoryDescription")}
        </p>

      </div>


      {/* =================================================
          CART BAR
      ================================================= */}

      <div className="products-topbar">

        <div>

          <strong>
            {
              filteredProducts.length
            }
          </strong>{" "}

          {t("productsAvailable")}

        </div>


        <button
          type="button"
          onClick={() =>
            navigate("/cart")
          }
        >

          🛒{" "}
          {t("cart")}

          {cartCount > 0 && (

            <b>
              {cartCount}
            </b>

          )}

        </button>

      </div>


      {/* =================================================
          RETAILER STATUS
      ================================================= */}

      <div className="retailer-status">

        {retailer ? (

          <>

            <div>

              <small>
                {t("retailerAccess")}
              </small>

              <strong>

                {t("welcome")},{" "}

                {retailer.name ||
                  retailer.businessName ||
                  "Retailer"}

              </strong>

              <span>
                {t("loginWholesale")}
              </span>

            </div>


            <button
              type="button"
              onClick={logout}
            >
              {t("logout")}
            </button>

          </>

        ) : (

          <>

            <div>

              <small>
                {t("wholesalePricing")}
              </small>

              <strong>
                {t(
                  "retailerLoginRequired"
                )}
              </strong>

              <span>
                {t(
                  "loginWholesale"
                )}
              </span>

            </div>


            {/* IMPORTANT:
                Direct React navigation
            */}

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/retailer-login"
                )
              }
            >

              {t("login")} →

            </button>

          </>

        )}

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="products-error">

          {error}

        </div>

      )}


      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="products-filters">

        <input
          type="text"
          placeholder={t("search")}
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />


        <select
          value={brand}
          onChange={(e) =>
            setBrand(
              e.target.value
            )
          }
        >

          <option value="">
            {t("allBrands")}
          </option>

          {brands.map(
            (item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            )
          )}

        </select>


        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >

          <option value="">
            {t("allCategories")}
          </option>

          {categories.map(
            (item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            )
          )}

        </select>


        <select
          value={sort}
          onChange={(e) =>
            setSort(
              e.target.value
            )
          }
        >

          <option value="">
            {t("sortProducts")}
          </option>

          <option value="low">
            {t("lowToHigh")}
          </option>

          <option value="high">
            {t("highToLow")}
          </option>

          <option value="newest">
            {t("newest")}
          </option>

        </select>


        <label>

          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) =>
              setInStock(
                e.target.checked
              )
            }
          />

          {t("inStock")}

        </label>


        <button
          type="button"
          onClick={
            clearFilters
          }
        >
          {t("clearFilters")}
        </button>

      </div>


      {/* =================================================
          PRODUCTS GRID
      ================================================= */}

      {filteredProducts.length === 0 ? (

        <div className="no-products">

          <h3>
            {t("noProducts")}
          </h3>

          <p>

            {products.length === 0
              ? "Admin panel se products add karo."
              : t("tryFilters")}

          </p>

        </div>

      ) : (

        <div className="products-grid">

          {filteredProducts.map(
            (product) => {

              const mrp =
                Number(
                  product.mrp ||
                  product.price ||
                  0
                );


              const wholesale =
                Number(
                  product.wholesalePrice ||
                  product.price ||
                  0
                );


              const stock =
                Number(
                  product.stock || 0
                );


              let discount = 0;


              if (
                mrp > 0 &&
                wholesale > 0 &&
                wholesale < mrp
              ) {

                discount =
                  Math.round(
                    (
                      (mrp - wholesale) /
                      mrp
                    ) * 100
                  );

              }


              return (

                <article
                  className="product-card"
                  key={product.id}
                >


                  {/* IMAGE */}

                  <div className="product-image">

                    {discount > 0 && (

                      <span className="discount-badge">

                        {discount}%{" "}
                        {t("discount")}

                      </span>

                    )}


                    {stock <= 0 && (

                      <span className="out-stock">

                        {t("outOfStock")}

                      </span>

                    )}


                    {getImageUrl(product) ? (

                      <img
                        src={
                          getImageUrl(
                            product
                          )
                        }
                        alt={
                          product.name ||
                          "C24 Product"
                        }
                        loading="lazy"
                      />

                    ) : (

                      <div className="image-placeholder">

                        C24

                      </div>

                    )}

                  </div>


                  {/* INFO */}

                  <div className="product-info">


                    {product.brand && (

                      <span className="product-brand">

                        {product.brand}

                      </span>

                    )}


                    <h3>
                      {product.name}
                    </h3>


                    <p>
                      {product.category}
                    </p>


                    {/* PRICE */}

                    <div className="price-box">

                      <span>
                        {t("mrp")}
                      </span>


                      <del>

                        ₹
                        {mrp.toLocaleString(
                          "en-IN"
                        )}

                      </del>


                      {retailer ? (

                        <>

                          <small>
                            {t("wholesale")}
                          </small>

                          <strong>

                            ₹
                            {wholesale.toLocaleString(
                              "en-IN"
                            )}

                          </strong>

                        </>

                      ) : (

                        <small>

                          🔒{" "}

                          {t(
                            "loginWholesale"
                          )}

                        </small>

                      )}

                    </div>


                    {/* ACTIONS */}

                    <div className="product-actions">


                      <button
                        type="button"
                        disabled={
                          stock <= 0
                        }
                        onClick={() =>
                          addToCart(
                            product
                          )
                        }
                      >

                        🛒{" "}

                        {t("addToCart")}

                      </button>


                      <button
                        type="button"
                        disabled={
                          stock <= 0
                        }
                        onClick={() =>
                          whatsapp(
                            product
                          )
                        }
                      >

                        💬{" "}

                        {t("whatsapp")}

                      </button>

                    </div>


                    {/* STOCK */}

                    <div className="stock-text">

                      {stock > 0

                        ? `${t(
                            "inStockText"
                          )}: ${stock}`

                        : t(
                            "outOfStock"
                          )}

                    </div>

                  </div>

                </article>

              );

            }
          )}

        </div>

      )}


      {/* =================================================
          BOTTOM CTA
      ================================================= */}

      <div className="products-cta">

        <div>

          <small>
            {t("wholesalePricing")}
          </small>

          <h3>

            Need products in{" "}

            <strong>
              {t("bulkQuantity")}
            </strong>

          </h3>

        </div>


        <button
          type="button"
          onClick={() =>
            navigate("/enquiry")
          }
        >

          {t("wholesaleQuote")} →

        </button>

      </div>


    </section>

  );

}