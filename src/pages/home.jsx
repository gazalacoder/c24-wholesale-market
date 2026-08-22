import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useLanguage } from "../LanguageContext";

import IntroScene from "../components/IntroScene";
import TrustSection from "../components/TrustSection";
import BusinessTrust from "../components/BusinessTrust";
import DailyOffers from "../components/DailyOffers";
import PriceList from "../components/PriceList";

import ProductsPage from "./ProductsPage";
import CategoriesPage from "./CategoriesPage";
import Contact from "./contact";
import Enquiry from "./enquiry";

import "./Home.css";


export default function Home() {

  const {
    t,
    language,
    setLanguage
  } = useLanguage();


  const [showHome, setShowHome] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);


  /* =====================================================
     INTRO
  ===================================================== */

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowHome(true);
    }, 6500);

    return () => {
      clearTimeout(timer);
    };

  }, []);


  /* =====================================================
     CLOSE MOBILE MENU
  ===================================================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (

    <main className="home">

{/* =====================================================
    NAVBAR
===================================================== */}

<header className="c24-navbar">

  {/* LOGO */}
  <Link to="/" className="c24-logo">
    <strong>C24</strong>

    <span>
      HOME APPLICATION
      <small>WHOLESALE</small>
    </span>
  </Link>


  {/* NAV LINKS */}
  <nav className="c24-nav">

    <a href="#home">
      {t("home")}
    </a>

    <a href="#about">
      {t("about")}
    </a>

    <a href="#products">
      {t("products")}
    </a>

    <a href="#categories">
      {t("categories")}
    </a>

    <a href="#offers">
      {t("offers")}
    </a>

    <a href="#price-list">
      {t("priceList")}
    </a>

    <a href="#contact">
      {t("contact")}
    </a>

  </nav>


  {/* RIGHT SIDE */}
  <div className="c24-nav-actions">

    {/* LANGUAGE */}
    <div className="language-switcher">

      <span className="language-icon">
        🌐
      </span>

      <select
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
      >

        <option value="EN">
          English
        </option>

        <option value="HI">
          हिन्दी
        </option>

        <option value="GU">
          ગુજરાતી
        </option>

      </select>

    </div>


    {/* CART */}
    <Link
      to="/cart"
      className="nav-cart-button"
    >
      🛒 Cart
    </Link>


    {/* RETAILER LOGIN */}
    <Link
      to="/retailer-login"
      className="retailer-login"
    >
      {t("login")}
    </Link>

  </div>


  {/* MOBILE MENU */}
  <button
    type="button"
    className="mobile-menu-button"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    ☰
  </button>

</header>


     {/* =====================================================
    MOBILE NAVIGATION
===================================================== */}

{menuOpen && (
  <div className="mobile-navigation">

    <a
      href="#home"
      onClick={() => setMenuOpen(false)}
    >
      {t("home")}
    </a>

    <a
      href="#about"
      onClick={() => setMenuOpen(false)}
    >
      {t("about")}
    </a>

    <a
      href="#products"
      onClick={() => setMenuOpen(false)}
    >
      {t("products")}
    </a>

    <a
      href="#categories"
      onClick={() => setMenuOpen(false)}
    >
      {t("categories")}
    </a>

    <a
      href="#offers"
      onClick={() => setMenuOpen(false)}
    >
      {t("offers")}
    </a>

    <a
      href="#price-list"
      onClick={() => setMenuOpen(false)}
    >
      {t("priceList")}
    </a>

    <a
      href="#contact"
      onClick={() => setMenuOpen(false)}
    >
      {t("contact")}
    </a>


    {/* =========================
        MOBILE LANGUAGE
    ========================= */}

    <div className="mobile-language">

      <span>
        🌐
      </span>

      <select
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
      >
        <option value="EN">
          English
        </option>

        <option value="HI">
          हिन्दी
        </option>

        <option value="GU">
          ગુજરાતી
        </option>
      </select>

    </div>


    {/* =========================
        MOBILE CART
    ========================= */}

    <Link
      to="/cart"
      className="mobile-cart"
      onClick={() => setMenuOpen(false)}
    >
      🛒 {t("cart")}
    </Link>


    {/* =========================
        RETAILER LOGIN
    ========================= */}

    <Link
      to="/retailer-login"
      className="mobile-retailer"
      onClick={() => setMenuOpen(false)}
    >
      {t("login")}
    </Link>

  </div>
)}

      {/* =================================================
          INTRO SCENE
      ================================================= */}

      {!showHome && (

        <div className="intro-wrapper">

          <IntroScene
            onComplete={() => {
              setShowHome(true);
            }}
          />

        </div>

      )}


      {/* =================================================
          MAIN HOME
      ================================================= */}

      {showHome && (

        <motion.div
          className="home-main"

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            duration: 0.8,
          }}
        >


          {/* =================================================
              HERO
          ================================================= */}

          <section
            id="home"
            className="real-home"
          >

            {/* BLUE GLOW */}

            <div className="blue-glow glow-one" />

            <div className="blue-glow glow-two" />


            {/* HERO CONTENT */}

            <div className="home-content">

              <motion.span
                className="home-eyebrow"

                initial={{
                  opacity: 0,
                  y: -20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.15,
                  duration: 0.5,
                }}
              >
                C24 HOME APPLICATION WHOLESALE
              </motion.span>


              <motion.h1

                initial={{
                  opacity: 0,
                  x: -30,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                }}

                transition={{
                  delay: 0.3,
                  duration: 0.7,
                }}
              >

                {t("homeTitle")}

                <br />

                <span>
                  {t("homeTitle2")}
                </span>

              </motion.h1>


              <motion.p

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.5,
                  duration: 0.5,
                }}
              >
                {t("homeDescription")}
              </motion.p>


              {/* HERO BUTTONS */}

              <motion.div
                className="home-buttons"

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.7,
                  duration: 0.5,
                }}
              >

                <motion.a
                  href="#products"

                  whileHover={{
                    scale: 1.05,
                  }}

                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  {t("explore")}
                </motion.a>


                <motion.a
                  href="#enquiry"
                  className="secondary-btn"

                  whileHover={{
                    scale: 1.05,
                  }}

                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  {t("wholesaleQuote")}
                </motion.a>

              </motion.div>

            </div>


            {/* =================================================
                PREMIUM C24 VISUAL
            ================================================= */}

            <div className="hero-visual">

              <div className="hero-ring ring-one" />

              <div className="hero-ring ring-two" />

              <div className="hero-ring ring-three" />

              <div className="hero-logo">

                <strong>
                  C24
                </strong>

                <span>
                  WHOLESALE
                </span>

              </div>

            </div>

          </section>


          {/* =================================================
              ABOUT
          ================================================= */}

          <section
            id="about"
            className="home-section"
          >

            <TrustSection />

            <BusinessTrust />

          </section>


          {/* =================================================
              PRODUCTS
          ================================================= */}

          <section
            id="products"
            className="home-section"
          >

            <ProductsPage />

          </section>


          {/* =================================================
              CATEGORIES
          ================================================= */}

          <section
            id="categories"
            className="home-section"
          >

            <CategoriesPage />

          </section>


          {/* =================================================
              DAILY OFFERS
          ================================================= */}

          <section
            id="offers"
            className="home-section"
          >

            <DailyOffers />

          </section>


          {/* =================================================
              PRICE LIST
          ================================================= */}

          <section
            id="price-list"
            className="home-section"
          >

            <PriceList />

          </section>


          {/* =================================================
              CONTACT
          ================================================= */}

          <section
            id="contact"
            className="home-section"
          >

            <Contact />

          </section>


          {/* =================================================
              ENQUIRY
          ================================================= */}

          <section
            id="enquiry"
            className="home-section"
          >

            <Enquiry />

          </section>


          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="c24-footer">

            <div className="footer-admin">

              <Link
                to="/admin"
                className="admin-panel-link"
              >
                🔐 {t("adminPanel")}
              </Link>

            </div>

            <div className="footer-divider" />

            <p>
              © 2026 C24 Home Application Wholesale
            </p>

          </footer>

        </motion.div>

      )}

    </main>

  );
}