import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [retailer, setRetailer] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);


  /* =====================================================
     LOAD DATA
  ===================================================== */

  useEffect(() => {
    loadCart();

    const savedRetailer =
      localStorage.getItem("c24_retailer");

    if (savedRetailer) {
      try {
        setRetailer(
          JSON.parse(savedRetailer)
        );
      } catch {
        setRetailer(null);
      }
    }
  }, []);


  /* =====================================================
     LOAD CART
  ===================================================== */

  const loadCart = () => {
    try {
      const saved =
        JSON.parse(
          localStorage.getItem("c24Cart") ||
            "[]"
        );

      setCart(
        Array.isArray(saved)
          ? saved
          : []
      );
    } catch {
      setCart([]);
    }
  };


  /* =====================================================
     UPDATE CART
  ===================================================== */

  const saveCart = (newCart) => {
    setCart(newCart);

    localStorage.setItem(
      "c24Cart",
      JSON.stringify(newCart)
    );

    window.dispatchEvent(
      new Event("storage")
    );
  };


  /* =====================================================
     INCREASE
  ===================================================== */

  const increase = (item) => {
    const newCart = cart.map(
      (product) => {

        if (
          String(product.id) !==
          String(item.id)
        ) {
          return product;
        }

        return {
          ...product,
          quantity:
            Number(
              product.quantity || 1
            ) + 1,
        };
      }
    );

    saveCart(newCart);
  };


  /* =====================================================
     DECREASE
  ===================================================== */

  const decrease = (item) => {
    const newCart = cart
      .map((product) => {

        if (
          String(product.id) !==
          String(item.id)
        ) {
          return product;
        }

        return {
          ...product,
          quantity:
            Number(
              product.quantity || 1
            ) - 1,
        };
      })
      .filter(
        (product) =>
          Number(
            product.quantity || 0
          ) > 0
      );

    saveCart(newCart);
  };


  /* =====================================================
     REMOVE
  ===================================================== */

  const removeItem = (item) => {
    const newCart =
      cart.filter(
        (product) =>
          String(product.id) !==
          String(item.id)
      );

    saveCart(newCart);
  };


  /* =====================================================
     TOTAL
  ===================================================== */

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => {

        const price =
          Number(
            item.price || 0
          );

        const quantity =
          Number(
            item.quantity || 1
          );

        return (
          sum +
          price * quantity
        );
      },
      0
    );
  }, [cart]);


  /* =====================================================
     PLACE ORDER
  ===================================================== */

  const placeOrder = async () => {

    setError("");
    setMessage("");

    if (!retailer) {
      setError(
        "Order place karne ke liye retailer login required hai."
      );

      return;
    }

    if (cart.length === 0) {
      setError(
        "Cart empty hai."
      );

      return;
    }

    setPlacing(true);

    try {

      const response =
        await fetch(
          `${API}/orders`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              retailerId:
                retailer.id,

              retailerName:
                retailer.name ||
                retailer.businessName ||
                "Retailer",

              name:
                retailer.name ||
                "Retailer",

              phone:
                retailer.phone ||
                "",

              email:
                retailer.email ||
                "",

              items:
                cart.map(
                  (item) => ({
                    productId:
                      item.id,

                    name:
                      item.name,

                    brand:
                      item.brand || "",

                    quantity:
                      Number(
                        item.quantity || 1
                      ),

                    price:
                      Number(
                        item.price || 0
                      ),

                    image:
                      item.image || "",
                  })
                ),

              totalAmount:
                total,

              message:
                "Order placed from C24 retailer cart.",

            }),
          }
        );


      let data = {};

      try {
        data =
          await response.json();
      } catch {
        throw new Error(
          "Server ne valid response nahi diya."
        );
      }


      if (!response.ok) {
        throw new Error(
          data.message ||
            "Order place nahi hua."
        );
      }


      /* CLEAR CART */

      localStorage.removeItem(
        "c24Cart"
      );

      setCart([]);


      setMessage(
        `Order successfully placed! Order ID: ${
          data.order?.id || "N/A"
        }`
      );

    } catch (err) {

      console.error(
        "PLACE ORDER ERROR:",
        err
      );

      setError(
        err.message ||
          "Order place nahi hua."
      );

    } finally {

      setPlacing(false);

    }
  };


  /* =====================================================
     EMPTY CART
  ===================================================== */

  if (cart.length === 0) {

    return (
      <section className="cart-page">

        <div className="cart-container">

          <div className="cart-empty">

            <div className="cart-empty-icon">
              🛒
            </div>

            <h1>
              Your Cart is Empty
            </h1>

            <p>
              Wholesale products cart mein
              add karo.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/products")
              }
            >
              Browse Products →
            </button>

          </div>

        </div>

      </section>
    );
  }


  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <section className="cart-page">

      <div className="cart-container">


        {/* HEADER */}

        <div className="cart-header">

          <div>

            <span>
              C24 WHOLESALE
            </span>

            <h1>
              Shopping Cart
            </h1>

          </div>


          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >
            ← Continue Shopping
          </button>

        </div>


        {/* SUCCESS */}

        {message && (
          <div className="cart-success">
            {message}

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/retailer-dashboard"
                )
              }
            >
              View Dashboard →
            </button>
          </div>
        )}


        {/* ERROR */}

        {error && (
          <div className="cart-error">
            {error}
          </div>
        )}


        {/* CART */}

        <div className="cart-layout">


          {/* ITEMS */}

          <div className="cart-items">

            {cart.map(
              (item) => (

                <article
                  className="cart-item"
                  key={item.id}
                >

                  <div className="cart-item-image">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={
                          item.name
                        }
                      />

                    ) : (

                      <span>
                        C24
                      </span>

                    )}

                  </div>


                  <div className="cart-item-info">

                    <small>
                      {item.brand ||
                        "C24"}
                    </small>

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      ₹
                      {Number(
                        item.price ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}{" "}
                      / unit
                    </p>


                    <div className="cart-quantity">

                      <button
                        type="button"
                        onClick={() =>
                          decrease(
                            item
                          )
                        }
                      >
                        −
                      </button>

                      <strong>
                        {item.quantity}
                      </strong>

                      <button
                        type="button"
                        onClick={() =>
                          increase(
                            item
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>


                  <div className="cart-item-total">

                    <strong>
                      ₹
                      {(
                        Number(
                          item.price ||
                            0
                        ) *
                        Number(
                          item.quantity ||
                            1
                        )
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>


                    <button
                      type="button"
                      onClick={() =>
                        removeItem(
                          item
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                </article>

              )
            )}

          </div>


          {/* SUMMARY */}

          <aside className="cart-summary">

            <span>
              ORDER SUMMARY
            </span>

            <h2>
              Wholesale Order
            </h2>


            <div className="summary-row">

              <span>
                Products
              </span>

              <strong>
                {cart.length}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Total Quantity
              </span>

              <strong>
                {cart.reduce(
                  (sum, item) =>
                    sum +
                    Number(
                      item.quantity ||
                        1
                    ),
                  0
                )}
              </strong>

            </div>


            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            <button
              type="button"
              className="place-order-button"
              onClick={placeOrder}
              disabled={placing}
            >

              {placing
                ? "Placing Order..."
                : "Place Wholesale Order →"}

            </button>


            <small>
              Order admin panel mein
              automatically send hoga.
            </small>

          </aside>

        </div>

      </div>

    </section>
  );
}