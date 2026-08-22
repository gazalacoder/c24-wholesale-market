import { useState } from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "../LanguageContext";

import "./Navbar.css";


export default function Navbar() {

  const {
    language,
    setLanguage,
    t,
  } = useLanguage();


  const [menuOpen, setMenuOpen] =
    useState(false);


  /* =====================================
     CLOSE MOBILE MENU
  ===================================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* =====================================
     LANGUAGE CHANGE
  ===================================== */

  const handleLanguageChange = (e) => {

    setLanguage(
      e.target.value
    );

  };


  return (

    <nav className="navbar">


      {/* =================================
          LOGO
      ================================= */}

      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >

        C24

        <span>
          Wholesale
        </span>

      </Link>


      {/* =================================
          DESKTOP / MOBILE MENU
      ================================= */}

      <div
        className={`navbar-menu ${
          menuOpen
            ? "menu-open"
            : ""
        }`}
      >


        <ul className="nav-links">


          {/* HOME */}

          <li>

            <Link
              to="/"
              onClick={closeMenu}
            >
              {t("home")}
            </Link>

          </li>


          {/* PRODUCTS */}

          <li>

            <Link
              to="/products"
              onClick={closeMenu}
            >
              {t("products")}
            </Link>

          </li>


          {/* CATEGORIES */}

          <li>

            <Link
              to="/categories"
              onClick={closeMenu}
            >
              {t("categories")}
            </Link>

          </li>


          {/* DAILY OFFERS */}

          <li>

            <Link
              to="/offers"
              onClick={closeMenu}
            >
              {t("offers")}
            </Link>

          </li>


          {/* CONTACT */}

          <li>

            <Link
              to="/contact"
              onClick={closeMenu}
            >
              {t("contact")}
            </Link>

          </li>

        </ul>


        {/* =================================
            RIGHT SIDE
        ================================= */}

        <div className="navbar-right">


          {/* =================================
              LANGUAGE
          ================================= */}

          <div className="language-box">

            <span className="language-icon">
              🌐
            </span>


            <select
              value={language}
              onChange={
                handleLanguageChange
              }
              aria-label="Select language"
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


          {/* =================================
              RETAILER LOGIN
          ================================= */}

          <Link
            to="/retailer-login"
            className="retailer-login-btn"
            onClick={closeMenu}
          >

            {t("login")}

          </Link>


          {/* =================================
              WHOLESALE QUOTE
          ================================= */}

          <Link
            to="/enquiry"
            className="quote-btn"
            onClick={closeMenu}
          >

            {t("wholesaleQuote")}

            <span>
              →
            </span>

          </Link>

        </div>

      </div>


      {/* =================================
          MOBILE MENU BUTTON
      ================================= */}

      <button
        type="button"
        className={`menu-toggle ${
          menuOpen
            ? "active"
            : ""
        }`}
        onClick={() =>
          setMenuOpen(
            !menuOpen
          )
        }
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >

        <span></span>
        <span></span>
        <span></span>

      </button>

    </nav>

  );

}