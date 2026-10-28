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

// ✅ Video Import
import videoSrc from "/videos/welcome.mp4";

export default function Home() {
  const { t, language, setLanguage } = useLanguage();

  const [showHome, setShowHome] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHome(true);
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <main className="home">

      {/* ================= NAVBAR ================= */}

      {/* ================= NAVBAR ================= */}

<header className="c24-navbar">

  <Link to="/" className="c24-logo">
    <strong>C24</strong>

    <span>
      HOME APPLICATION
      <small>WHOLESALE</small>
    </span>
  </Link>


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


    {/* ================= MY ORDERS ================= */}

    <Link
      to="/my-orders"
      className="nav-my-orders"
    >
      📦 My Orders
    </Link>

  </nav>


  <div className="c24-nav-actions">


    {/* LANGUAGE */}

    <div className="language-switcher">

      <span className="language-icon">
        🌐
      </span>

      <select
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
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


    {/* LOGIN */}

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
    onClick={() =>
      setMenuOpen(!menuOpen)
    }
  >
    ☰
  </button>

</header>

      {/* ================= MOBILE MENU ================= */}

      {menuOpen && (
        <div className="mobile-navigation">

          <a href="#home" onClick={closeMenu}>
            {t("home")}
          </a>

          <a href="#about" onClick={closeMenu}>
            {t("about")}
          </a>

          <a href="#products" onClick={closeMenu}>
            {t("products")}
          </a>

          <a href="#categories" onClick={closeMenu}>
            {t("categories")}
          </a>

          <a href="#offers" onClick={closeMenu}>
            {t("offers")}
          </a>

          <a href="#price-list" onClick={closeMenu}>
            {t("priceList")}
          </a>

          <a href="#contact" onClick={closeMenu}>
            {t("contact")}
          </a>

          <div className="mobile-language">

            <span>🌐</span>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="EN">English</option>
              <option value="HI">हिन्दी</option>
              <option value="GU">ગુજરાતી</option>
            </select>

          </div>

          <Link
            to="/cart"
            className="mobile-cart"
            onClick={closeMenu}
          >
            🛒 {t("cart")}
          </Link>

          <Link
            to="/retailer-login"
            className="mobile-retailer"
            onClick={closeMenu}
          >
            {t("login")}
          </Link>

        </div>
      )}


      {/* ================= INTRO ================= */}

      {!showHome && (
        <div className="intro-wrapper">
          <IntroScene
            onComplete={() => setShowHome(true)}
          />
        </div>
      )}


      {/* ================= MAIN WEBSITE ================= */}

      {showHome && (

        <motion.div
          className="home-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >

          {/* ================= HERO SECTION - LEFT RIGHT LAYOUT ================= */}

          <section
            id="home"
            className="real-home"
          >

            {/* ===== VIDEO - RIGHT SIDE ===== */}
<div className="video-wrapper" style={{ 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  background: '#000',
  overflow: 'hidden'
}}>
  <video
    className="welcome-video"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      objectPosition: 'center'
    }}
  >
    <source src={videoSrc} type="video/mp4" />
  </video>
  <div className="video-overlay-right"></div>
</div>


            {/* ===== CONTENT - LEFT SIDE ===== */}

            <div className="home-content-wrapper">

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


                {/* BUTTONS */}

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

            </div>

          </section>


          {/* ================= ABOUT ================= */}

          <section
            id="about"
            className="home-section"
          >
            <TrustSection />
            <BusinessTrust />
          </section>


          {/* ================= PRODUCTS ================= */}

          <section
            id="products"
            className="home-section"
          >
            <ProductsPage />
          </section>


          {/* ================= CATEGORIES ================= */}

          <section
            id="categories"
            className="home-section"
          >
            <CategoriesPage />
          </section>


          {/* ================= OFFERS ================= */}

          <section
            id="offers"
            className="home-section"
          >
            <DailyOffers />
          </section>


          {/* ================= PRICE LIST ================= */}

          <section
            id="price-list"
            className="home-section"
          >
            <PriceList />
          </section>


          {/* ================= CONTACT ================= */}

          <section
            id="contact"
            className="home-section"
          >
            <Contact />
          </section>


          {/* ================= ENQUIRY ================= */}

          <section
            id="enquiry"
            className="home-section"
          >
            <Enquiry />
          </section>


          {/* ================= FOOTER ================= */}

          <footer className="c24-footer">

            <div className="footer-admin">

              <Link
                to="/admin"
                className="admin-panel-link"
              >
                🔐 {t("adminPanel")}
              </Link>

            </div>

            <div className="footer-divider"></div>

            <p>
              © 2026 C24 Home Application Wholesale
            </p>

          </footer>

        </motion.div>

      )}

    </main>
  );
}