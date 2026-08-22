import React, { useEffect, useMemo, useState } from "react";

const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const BASE = import.meta.env.BASE_URL;

const emptyForm = {
  name: "",
  brand: "",
  category: "",
  mrp: "",
  wholesalePrice: "",
  stock: "",
  images: "",
  description: "",
  specifications: "",
};

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  // ================================
  // LOAD PRODUCTS
  // ================================

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API}/api/products`);

      if (!response.ok) {
        throw new Error("Products load nahi ho paaye");
      }

      const data = await response.json();

      setProducts(
        Array.isArray(data) ? data : data.products || []
      );
    } catch (err) {
      console.error(err);
      setError(
        "Products load nahi ho pa rahe. Backend check karo."
      );
    } finally {
      setLoading(false);
    }
  }

  // ================================
  // UNIQUE BRANDS
  // ================================

  const brands = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product.brand)
          .filter(Boolean)
      ),
    ].sort();
  }, [products]);

  // ================================
  // UNIQUE CATEGORIES
  // ================================

  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ].sort();
  }, [products]);

  // ================================
  // DISCOUNT CALCULATION
  // ================================

  const calculatedDiscount = useMemo(() => {
    const mrp = Number(form.mrp);
    const wholesale = Number(form.wholesalePrice);

    if (!mrp || !wholesale || mrp <= 0) {
      return 0;
    }

    const discount =
      ((mrp - wholesale) / mrp) * 100;

    return Math.max(
      0,
      Math.round(discount * 100) / 100
    );
  }, [form.mrp, form.wholesalePrice]);

  // ================================
  // FILTER PRODUCTS
  // ================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const text = search.toLowerCase().trim();

      result = result.filter((product) => {
        const name = String(
          product.name || ""
        ).toLowerCase();

        const productBrand = String(
          product.brand || ""
        ).toLowerCase();

        const productCategory = String(
          product.category || ""
        ).toLowerCase();

        return (
          name.includes(text) ||
          productBrand.includes(text) ||
          productCategory.includes(text)
        );
      });
    }

    if (brand) {
      result = result.filter(
        (product) =>
          String(product.brand || "").toLowerCase() ===
          brand.toLowerCase()
      );
    }

    if (category) {
      result = result.filter(
        (product) =>
          String(product.category || "").toLowerCase() ===
          category.toLowerCase()
      );
    }

    if (inStock) {
      result = result.filter(
        (product) => Number(product.stock || 0) > 0
      );
    }

    if (sort === "low") {
      result.sort(
        (a, b) =>
          Number(
            a.wholesalePrice || a.price || 0
          ) -
          Number(
            b.wholesalePrice || b.price || 0
          )
      );
    }

    if (sort === "high") {
      result.sort(
        (a, b) =>
          Number(
            b.wholesalePrice || b.price || 0
          ) -
          Number(
            a.wholesalePrice || a.price || 0
          )
      );
    }

    if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
    }

    return result;
  }, [
    products,
    search,
    brand,
    category,
    inStock,
    sort,
  ]);

  // ================================
  // FORM INPUT
  // ================================

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ================================
  // OPEN ADD FORM
  // ================================

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  }

  // ================================
  // OPEN EDIT FORM
  // ================================

  function openEditForm(product) {
    setEditingId(product.id);

    setForm({
      name: product.name || "",
      brand: product.brand || "",
      category: product.category || "",
      mrp: product.mrp || product.price || "",
      wholesalePrice:
        product.wholesalePrice ||
        product.price ||
        "",
      stock: product.stock || "",
      images: Array.isArray(product.images)
        ? product.images.join(", ")
        : product.image || "",
      description: product.description || "",
      specifications:
        typeof product.specifications === "object"
          ? JSON.stringify(
              product.specifications,
              null,
              2
            )
          : product.specifications || "",
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  }

  // ================================
  // SAVE PRODUCT
  // ================================

  async function saveProduct(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Product name required hai.");
      return;
    }

    if (!form.brand.trim()) {
      setError("Brand select/enter karo.");
      return;
    }

    if (!form.category.trim()) {
      setError("Category required hai.");
      return;
    }

    if (!form.mrp || Number(form.mrp) <= 0) {
      setError("Valid MRP enter karo.");
      return;
    }

    if (
      !form.wholesalePrice ||
      Number(form.wholesalePrice) <= 0
    ) {
      setError("Valid wholesale price enter karo.");
      return;
    }

    if (
      Number(form.wholesalePrice) >
      Number(form.mrp)
    ) {
      setError(
        "Wholesale price MRP se zyada nahi ho sakta."
      );
      return;
    }

    try {
      setSaving(true);

      const images = form.images
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      let specifications = form.specifications;

      if (form.specifications.trim()) {
        try {
          specifications = JSON.parse(
            form.specifications
          );
        } catch {
          // Keep plain text if JSON is not provided
          specifications = form.specifications;
        }
      }

      const productData = {
        name: form.name.trim(),
        brand: form.brand.trim(),
        category: form.category.trim(),
        images,
        mrp: Number(form.mrp),
        wholesalePrice: Number(
          form.wholesalePrice
        ),
        discountPercent: calculatedDiscount,
        stock: Number(form.stock || 0),
        description: form.description.trim(),
        specifications,
      };

      const url = editingId
        ? `${API}/api/products/${editingId}`
        : `${API}/api/products`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(
          "Product save nahi ho paaya"
        );
      }

      setSuccess(
        editingId
          ? "Product successfully updated."
          : "Product successfully added."
      );

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);

      await loadProducts();
    } catch (err) {
      console.error(err);

      setError(
        "Product save nahi ho paaya. Backend API check karo."
      );
    } finally {
      setSaving(false);
    }
  }

  // ================================
  // DELETE PRODUCT
  // ================================

  async function deleteProduct(product) {
    const confirmDelete = window.confirm(
      `Kya aap "${product.name}" delete karna chahte ho?`
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API}/api/products/${product.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Product delete nahi ho paaya"
        );
      }

      setSuccess("Product successfully deleted.");

      await loadProducts();
    } catch (err) {
      console.error(err);

      setError(
        "Product delete nahi ho paaya."
      );
    }
  }

  // ================================
  // IMAGE
  // ================================

  function getImage(product) {
    if (
      product.images &&
      Array.isArray(product.images) &&
      product.images.length
    ) {
      const image = product.images[0];

      if (String(image).startsWith("http")) {
        return image;
      }

      return `${BASE}${String(image).replace(
        /^\/+/,
        ""
      )}`;
    }

    if (product.image) {
      if (
        String(product.image).startsWith("http")
      ) {
        return product.image;
      }

      return `${BASE}${String(
        product.image
      ).replace(/^\/+/, "")}`;
    }

    return "";
  }

  // ================================
  // WHATSAPP
  // ================================

  function enquireWhatsApp(product) {
    const price =
      product.wholesalePrice ||
      product.price ||
      0;

    const text = `Hello C24 Wholesale 👋

I am interested in:

Product: ${product.name}
Brand: ${product.brand || "N/A"}
Category: ${product.category || "N/A"}
Wholesale Price: ₹${price}
Quantity: `;

    const url =
      `https://wa.me/919724445650?text=${encodeURIComponent(
        text
      )}`;

    window.open(url, "_blank");
  }

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <section className="products-page">
        <div className="products-container">
          <div className="products-heading">
            <span>
              C24 HOME APPLICATION WHOLESALE
            </span>

            <h1>Product Manager</h1>

            <p>
              Loading products...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ================================
  // PAGE
  // ================================

  return (
    <section className="products-page">
      <div className="products-container">

        {/* HEADER */}

        <div className="products-heading">
          <span>
            C24 HOME APPLICATION WHOLESALE
          </span>

          <h1>Product Manager</h1>

          <p>
            Manage brands, categories,
            pricing, stock and products.
          </p>
        </div>

        {/* ADD PRODUCT */}

        <div className="admin-product-actions">
          <button
            type="button"
            onClick={openAddForm}
          >
            + Add New Product
          </button>
        </div>

        {/* SUCCESS */}

        {success && (
          <div className="products-success">
            {success}
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="products-error">
            {error}
          </div>
        )}

        {/* ADD / EDIT FORM */}

        {showForm && (
          <div className="product-form-wrapper">

            <div className="product-form-header">
              <div>
                <span>C24 ADMIN PANEL</span>

                <h2>
                  {editingId
                    ? "Edit Product"
                    : "Add New Product"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                ✕
              </button>
            </div>

            <form
              className="product-form"
              onSubmit={saveProduct}
            >

              {/* NAME */}

              <div className="form-group">
                <label>
                  Product Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Samsung 55 Inch Smart TV"
                />
              </div>

              {/* BRAND */}

              <div className="form-group">
                <label>
                  Brand *
                </label>

                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="Samsung"
                  list="brand-list"
                />

                <datalist id="brand-list">
                  {brands.map((item) => (
                    <option
                      key={item}
                      value={item}
                    />
                  ))}
                </datalist>
              </div>

              {/* CATEGORY */}

              <div className="form-group">
                <label>
                  Category *
                </label>

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="TV"
                  list="category-list"
                />

                <datalist id="category-list">
                  {categories.map((item) => (
                    <option
                      key={item}
                      value={item}
                    />
                  ))}
                </datalist>
              </div>

              {/* MRP */}

              <div className="form-group">
                <label>
                  MRP *
                </label>

                <input
                  type="number"
                  name="mrp"
                  value={form.mrp}
                  onChange={handleChange}
                  placeholder="50000"
                  min="0"
                />
              </div>

              {/* WHOLESALE */}

              <div className="form-group">
                <label>
                  Wholesale Price *
                </label>

                <input
                  type="number"
                  name="wholesalePrice"
                  value={form.wholesalePrice}
                  onChange={handleChange}
                  placeholder="25000"
                  min="0"
                />
              </div>

              {/* DISCOUNT */}

              <div className="form-group">
                <label>
                  Discount %
                </label>

                <div className="calculated-discount">
                  {calculatedDiscount}% OFF
                </div>

                <small>
                  MRP aur Wholesale Price
                  ke basis par automatically
                  calculate hoga.
                </small>
              </div>

              {/* STOCK */}

              <div className="form-group">
                <label>
                  Stock Quantity
                </label>

                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="100"
                  min="0"
                />
              </div>

              {/* IMAGES */}

              <div className="form-group">
                <label>
                  Product Images
                </label>

                <input
                  type="text"
                  name="images"
                  value={form.images}
                  onChange={handleChange}
                  placeholder="image1.jpg, image2.jpg"
                />

                <small>
                  Multiple images comma se
                  separate karo.
                </small>
              </div>

              {/* DESCRIPTION */}

              <div className="form-group full-width">
                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Product description..."
                />
              </div>

              {/* SPECIFICATIONS */}

              <div className="form-group full-width">
                <label>
                  Specifications
                </label>

                <textarea
                  name="specifications"
                  value={form.specifications}
                  onChange={handleChange}
                  rows="6"
                  placeholder={`Example:
{
  "Screen": "55 Inch",
  "Resolution": "4K",
  "Warranty": "1 Year"
}`}
                />
              </div>

              {/* BUTTONS */}

              <div className="form-buttons">

                <button
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Product"
                    : "Add Product"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                >
                  Cancel
                </button>

              </div>

            </form>
          </div>
        )}

        {/* SEARCH + FILTERS */}

        <div className="products-filters">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={brand}
            onChange={(e) =>
              setBrand(e.target.value)
            }
          >
            <option value="">
              All Brands
            </option>

            {brands.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="">
              All Categories
            </option>

            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="">
              Sort Products
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

            <option value="newest">
              Newest
            </option>
          </select>

          <label className="stock-filter">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) =>
                setInStock(
                  e.target.checked
                )
              }
            />

            In Stock Only
          </label>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setBrand("");
              setCategory("");
              setInStock(false);
              setSort("");
            }}
          >
            Clear Filters
          </button>

        </div>

        {/* RESULT COUNT */}

        <div className="products-result-count">
          Showing{" "}
          <strong>
            {filteredProducts.length}
          </strong>{" "}
          products
        </div>

        {/* PRODUCTS */}

        {filteredProducts.length === 0 ? (
          <div className="no-products">

            <h2>
              No Products Found
            </h2>

            <p>
              Add your first product using
              the button above.
            </p>

          </div>
        ) : (
          <div className="products-grid">

            {filteredProducts.map(
              (product) => {

                const mrp = Number(
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

                const discount =
                  Number(
                    product.discountPercent ||
                    (
                      mrp > 0
                        ? ((mrp - wholesale) /
                            mrp) *
                          100
                        : 0
                    )
                  );

                const stock =
                  Number(
                    product.stock || 0
                  );

                return (
                  <div
                    className="product-card"
                    key={product.id}
                  >

                    {/* IMAGE */}

                    <div className="product-image">

                      {discount > 0 && (
                        <span className="discount-badge">
                          {Math.round(
                            discount
                          )}% OFF
                        </span>
                      )}

                      {stock <= 0 && (
                        <span className="out-stock-badge">
                          Out of Stock
                        </span>
                      )}

                      {getImage(product) ? (
                        <img
                          src={getImage(
                            product
                          )}
                          alt={
                            product.name
                          }
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <div className="no-image">
                          No Image
                        </div>
                      )}

                    </div>

                    {/* INFO */}

                    <div className="product-info">

                      {product.brand && (
                        <small className="product-brand">
                          {product.brand}
                        </small>
                      )}

                      <small>
                        {product.category}
                      </small>

                      <h2>
                        {product.name}
                      </h2>

                      <div className="product-pricing">

                        <span className="mrp-price">
                          ₹
                          {mrp.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        <span className="wholesale-price">
                          ₹
                          {wholesale.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                      <div className="product-stock">
                        {stock > 0
                          ? `In Stock: ${stock}`
                          : "Out of Stock"}
                      </div>

                      {/* ADMIN BUTTONS */}

                      <div className="product-admin-buttons">

                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(
                              product
                            )
                          }
                        >
                          ✏️ Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteProduct(
                              product
                            )
                          }
                        >
                          🗑️ Delete
                        </button>

                      </div>

                      {/* WHATSAPP */}

                      <button
                        type="button"
                        disabled={
                          stock <= 0
                        }
                        onClick={() =>
                          enquireWhatsApp(
                            product
                          )
                        }
                      >
                        Enquire on WhatsApp →
                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>
    </section>
  );
}

export default Product;