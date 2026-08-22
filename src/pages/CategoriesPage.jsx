import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { useLanguage } from "../LanguageContext";

import "./CategoriesPage.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


const categoryIcons = {
  Television: "📺",
  TV: "📺",
  Refrigerator: "🧊",
  Fridge: "🧊",
  "Washing Machine": "🧺",
  Fan: "🌀",
  Mixer: "🥤",
  Microwave: "♨️",
  Cooler: "❄️",
  AC: "❄️",
  AirConditioner: "❄️",
  "Home Appliances": "🏠",
};


export default function CategoriesPage() {

  const {
    t,
    language,
  } = useLanguage();


  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("");


  useEffect(() => {

    let cancelled = false;

    const loadProducts = async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            `${API}/products`
          );

        if (!response.ok) {
          throw new Error(
            "Categories API failed"
          );
        }

        const data =
          await response.json();

        const list =
          Array.isArray(data)
            ? data
            : Array.isArray(data.products)
            ? data.products
            : [];

        if (!cancelled) {
          setProducts(list);
        }

      } catch (error) {

        console.error(
          "Categories error:",
          error
        );

        if (!cancelled) {
          setProducts([]);
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


  const categories =
    useMemo(() => {

      const map = {};

      products.forEach((product) => {

        const name =
          String(
            product.category || ""
          ).trim();

        if (!name) return;

        map[name] =
          (map[name] || 0) + 1;

      });

      return Object.entries(map);

    }, [products]);


  const getCategoryName = (name) => {

    const map = {

      Television: t("television"),
      TV: "TV",

      Refrigerator:
        t("refrigerator"),

      Fridge:
        t("refrigerator"),

      "Washing Machine":
        t("washingMachine"),

      Fan:
        t("fan"),

      Mixer:
        t("mixerGrinder"),

      Microwave:
        t("microwave"),

      Cooler:
        t("cooler"),

      AC:
        "AC",

      AirConditioner:
        t("airConditioner"),

      "Home Appliances":
        t("homeAppliances"),
    };

    return map[name] || name;
  };


  const visibleProducts =
    selectedCategory
      ? products.filter(
          (product) =>
            String(
              product.category || ""
            ).toLowerCase() ===
            selectedCategory.toLowerCase()
        )
      : [];


  const getImage = (product) => {

    return (
      product?.image ||
      product?.images?.[0] ||
      ""
    );

  };


  if (loading) {

    return (

      <section
        id="categories"
        className="categories-page"
      >

        <div className="categories-header">

          <span>
            C24 CATEGORIES
          </span>

          <h1>
            {t("loading")}
          </h1>

        </div>

      </section>

    );
  }


  return (

    <section
      id="categories"
      className="categories-page"
    >

      <div className="categories-header">

        <span>
          C24 CATEGORY COLLECTION
        </span>

        <h1>
          {t("shopByCategory")}
        </h1>

        <p>
          {t("categoryDescription")}
        </p>

      </div>


      {categories.length === 0 ? (

        <div className="categories-empty">

          <h3>
            {t("noCategories")}
          </h3>

          <p>
            Admin panel se products add
            karne par categories yahan
            automatically aayengi.
          </p>

        </div>

      ) : (

        <div className="categories-grid">

          {categories.map(
            ([name, count]) => (

              <button
                key={name}
                type="button"
                className={
                  selectedCategory === name
                    ? "category-card active"
                    : "category-card"
                }
                onClick={() =>
                  setSelectedCategory(name)
                }
              >

                <div className="category-icon">

                  {categoryIcons[name] ||
                    "🏠"}

                </div>


                <div className="category-info">

                  <h3>
                    {getCategoryName(
                      name
                    )}
                  </h3>

                  <span>
                    {count}{" "}
                    {t("products")}
                  </span>

                </div>


                <span className="category-arrow">
                  →
                </span>

              </button>

            )
          )}

        </div>

      )}


      {selectedCategory && (

        <div className="category-products">

          <div className="category-products-header">

            <div>

              <span>
                {t("categoryProducts")}
              </span>

              <h2>
                {getCategoryName(
                  selectedCategory
                )}
              </h2>

            </div>


            <button
              type="button"
              onClick={() =>
                setSelectedCategory("")
              }
            >
              ✕
            </button>

          </div>


          <div className="category-product-grid">

            {visibleProducts.map(
              (product) => {

                const image =
                  getImage(product);

                const price =
                  Number(
                    product.wholesalePrice ||
                    product.price ||
                    0
                  );

                return (

                  <article
                    className="category-product-card"
                    key={product.id}
                  >

                    <div className="category-product-image">

                      {image ? (

                        <img
                          src={image}
                          alt={
                            product.name
                          }
                        />

                      ) : (

                        <span>
                          C24
                        </span>

                      )}

                    </div>


                    <div className="category-product-info">

                      {product.brand && (

                        <small>
                          {product.brand}
                        </small>

                      )}

                      <h3>
                        {product.name}
                      </h3>

                      <p>
                        {product.category}
                      </p>

                      <strong>
                        ₹
                        {price.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>

                  </article>

                );

              }
            )}

          </div>


          <Link
            to={`/products?category=${encodeURIComponent(
              selectedCategory
            )}`}
            className="category-view-products"
          >
            {t("viewProducts")} →
          </Link>

        </div>

      )}

    </section>

  );
}