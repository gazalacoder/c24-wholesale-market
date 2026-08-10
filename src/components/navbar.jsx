import { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {

  const [language, setLanguage] = useState("EN");

  const [menuOpen, setMenuOpen] = useState(false);


  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (
    <nav className="navbar">


      {/* LOGO */}

      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        C24
        <span>Wholesale</span>
      </Link>


      {/* MENU */}

      <div
        className={`navbar-menu ${
          menuOpen ? "menu-open" : ""
        }`}
      >

        <ul className="nav-links">


          {/* HOME */}

          <li>
            <Link
              to="/"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>


          {/* ABOUT PAGE */}

          <li>
            <Link
              to="/about"
              onClick={closeMenu}
            >
              About Us
            </Link>
          </li>


          {/* PRODUCTS PAGE */}

          <li>
            <Link
              to="/products"
              onClick={closeMenu}
            >
              Products
            </Link>
          </li>


          {/* CATEGORIES PAGE */}

          <li>
            <Link
              to="/categories"
              onClick={closeMenu}
            >
              Categories
            </Link>
          </li>


          {/* OFFERS PAGE */}

          <li>
            <Link
              to="/offers"
              onClick={closeMenu}
            >
              Daily Offers
            </Link>
          </li>


          {/* CONTACT PAGE */}

          <li>
            <Link
              to="/contact"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>

        </ul>


        {/* LANGUAGE */}

        <div className="language-box">

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

          </select>

        </div>


        {/* QUOTE */}

        <Link
          to="/enquiry"
          className="quote-btn"
          onClick={closeMenu}
        >
          Get Wholesale Quote
          <span>→</span>
        </Link>

      </div>


      {/* MOBILE MENU */}

      <button
        className={`menu-toggle ${
          menuOpen ? "active" : ""
        }`}
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >

        <span></span>
        <span></span>
        <span></span>

      </button>

    </nav>
  );
}