import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useLanguage,
} from "../LanguageContext";

import "./DailyOffers.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


export default function DailyOffers() {

  const { t } =
    useLanguage();

  const navigate =
    useNavigate();


  const [offers, setOffers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [retailer, setRetailer] =
    useState(null);


  /* =====================================================
     CHECK RETAILER
  ===================================================== */

  useEffect(() => {

    const checkRetailer = () => {

      try {

        const saved =
          localStorage.getItem(
            "c24_retailer"
          );

        if (!saved) {
          setRetailer(null);
          return;
        }

        setRetailer(
          JSON.parse(saved)
        );

      } catch {

        setRetailer(null);

      }

    };


    checkRetailer();

    window.addEventListener(
      "storage",
      checkRetailer
    );


    return () => {

      window.removeEventListener(
        "storage",
        checkRetailer
      );

    };

  }, []);


  /* =====================================================
     LOAD OFFERS
  ===================================================== */

  useEffect(() => {

    let cancelled = false;


    const loadOffers = async () => {

      try {

        setLoading(true);


        const response =
          await fetch(
            `${API}/offers`
          );


        let data = [];


        try {

          data =
            await response.json();

        } catch {

          data = [];

        }


        if (!response.ok) {

          throw new Error(
            data?.message ||
              "Offers load failed"
          );

        }


        const list =
          Array.isArray(data)
            ? data
            : Array.isArray(
                data.offers
              )
            ? data.offers
            : [];


        if (!cancelled) {

          setOffers(list);

        }


      } catch (error) {

        console.error(
          "Daily offers error:",
          error
        );


        if (!cancelled) {

          setOffers([]);

        }


      } finally {

        if (!cancelled) {

          setLoading(false);

        }

      }

    };


    loadOffers();


    return () => {

      cancelled = true;

    };

  }, []);


  /* =====================================================
     ADD OFFER TO CART
  ===================================================== */

  const addToCart = (offer) => {

    if (!retailer) {

      alert(
        "Wholesale pricing ke liye pehle retailer login karo."
      );

      navigate(
        "/retailer-login"
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
            String(
              offer.productId ||
                offer.id
            )
        );


      if (existing) {

        const newCart =
          cart.map(
            (item) =>
              String(item.id) ===
              String(
                offer.productId ||
                  offer.id
              )
                ? {
                    ...item,

                    quantity:
                      Number(
                        item.quantity ||
                          1
                      ) + 1,
                  }
                : item
          );


        localStorage.setItem(
          "c24Cart",
          JSON.stringify(
            newCart
          )
        );

      } else {

        const newCart = [

          ...cart,

          {

            id:
              offer.productId ||
              offer.id,

            name:
              offer.product,

            brand:
              offer.brand ||
              "",

            category:
              offer.category ||
              "",

            image:
              offer.image ||
              "",

            price:
              Number(
                offer.offerPrice ||
                  0
              ),

            quantity:
              1,

          },

        ];


        localStorage.setItem(
          "c24Cart",
          JSON.stringify(
            newCart
          )
        );

      }


      window.dispatchEvent(
        new Event("storage")
      );


      alert(
        "Offer product cart mein add ho gaya."
      );


    } catch (error) {

      console.error(
        "Offer cart error:",
        error
      );

      alert(
        "Cart mein add nahi ho paya."
      );

    }

  };


  /* =====================================================
     IMAGE
  ===================================================== */

  const getImage =
    (offer) => {

      return (
        offer.image ||
        offer.images?.[0] ||
        ""
      );

    };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (

      <section
        id="offers"
        className="daily-offers-section"
      >

        <div className="offers-header">

          <span>
            {t("dailyDeals")}
          </span>

          <h2>
            {t("dailyOffers")}
          </h2>

        </div>


        <div className="offers-loading">

          {t("loading")}

        </div>

      </section>

    );

  }


  /* =====================================================
     PAGE
  ===================================================== */

  return (

    <section
      id="offers"
      className="daily-offers-section"
    >


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="offers-header">

        <span>
          {t("dailyDeals")}
        </span>

        <h2>
          {t("dailyOffers")}
        </h2>

        <p>
          {t("limitedOffers")}
        </p>

      </div>


      {/* =================================================
          EMPTY
      ================================================= */}

      {offers.length === 0 ? (

        <div className="offers-empty">

          <h3>
            No Daily Offers
          </h3>

          <p>
            Abhi koi active offer
            available nahi hai.
          </p>

        </div>

      ) : (


        /* =================================================
           OFFER GRID
        ================================================= */

        <div className="offers-grid">

          {offers.map(
            (offer) => {

              const oldPrice =
                Number(
                  offer.oldPrice ||
                    0
                );


              const offerPrice =
                Number(
                  offer.offerPrice ||
                    0
                );


              const discount =
                oldPrice > offerPrice &&
                oldPrice > 0
                  ? Math.round(
                      (
                        (
                          oldPrice -
                          offerPrice
                        ) /
                          oldPrice
                      ) *
                        100
                    )
                  : 0;


              const image =
                getImage(
                  offer
                );


              return (

                <article
                  className="offer-card"
                  key={offer.id}
                >


                  {/* IMAGE */}

                  <div className="offer-image">

                    {discount > 0 && (

                      <span className="offer-badge">

                        {discount}%{" "}
                        {t("discount")}

                      </span>

                    )}


                    {image ? (

                      <img
                        src={image}
                        alt={
                          offer.product ||
                          offer.title
                        }
                        loading="lazy"
                      />

                    ) : (

                      <div>
                        C24
                      </div>

                    )}

                  </div>


                  {/* CONTENT */}

                  <div className="offer-content">


                    <span>
                      {offer.title ||
                        t("offer")}
                    </span>


                    <h3>
                      {offer.product}
                    </h3>


                    {offer.brand && (

                      <small>
                        {offer.brand}
                      </small>

                    )}


                    {offer.description && (

                      <p>
                        {offer.description}
                      </p>

                    )}


                    {/* PRICE */}

                    <div className="offer-price">

                      {oldPrice > 0 && (

                        <del>

                          ₹
                          {oldPrice.toLocaleString(
                            "en-IN"
                          )}

                        </del>

                      )}


                      <strong>

                        ₹
                        {offerPrice.toLocaleString(
                          "en-IN"
                        )}

                      </strong>

                    </div>


                    {/* DATE */}

                    {offer.endDate && (

                      <small className="offer-end-date">

                        Offer valid till{" "}

                        {new Date(
                          offer.endDate
                        ).toLocaleDateString(
                          "en-IN"
                        )}

                      </small>

                    )}


                    {/* ACTIONS */}

                    <div className="offer-actions">


                      <button
                        type="button"
                        className="offer-button"
                        onClick={() =>
                          addToCart(
                            offer
                          )
                        }
                      >

                        🛒 Add to Cart

                      </button>


                      <button
                        type="button"
                        className="offer-enquiry-button"
                        onClick={() =>
                          navigate(
                            "/enquiry"
                          )
                        }
                      >

                        {t("enquireNow")} →

                      </button>

                    </div>

                  </div>

                </article>

              );

            }
          )}

        </div>

      )}


    </section>

  );

}