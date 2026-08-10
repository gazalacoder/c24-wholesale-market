import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import "./App.css";

/* =====================================================
   COMPONENTS
===================================================== */

import Navbar from "./components/Navbar";
import ThreeScene from "./components/ThreeScene";
import IntroScene from "./components/IntroScene";
import FloatingActions from "./components/FloatingActions";

import DailyOffers from "./components/DailyOffers";
import Enquiry from "./components/Enquiry";

/* =====================================================
   PAGES
===================================================== */

import About from "./pages/About";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import Contact from "./pages/Contact";

/* =====================================================
   ADMIN
===================================================== */

import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/dashboard";


/* =====================================================
   HOME PAGE
===================================================== */

function HomePage() {

  const [showIntro, setShowIntro] = useState(true);

  return (
    <>

      {/* =================================================
          C24 GALAXY INTRO
      ================================================= */}

      {showIntro && (
        <IntroScene
          onComplete={() => setShowIntro(false)}
        />
      )}


      {/* =================================================
          HOME HERO
      ================================================= */}

      <section
        id="home"
        className="home-section"
      >

        <main className="hero">

          {/* LEFT CONTENT */}

          <section className="hero-left">

            <span className="hero-label">
              C24 HOME APPLICATION WHOLESALE
            </span>


            <h1>
              Premium Electronics
              <br />
              Wholesale Store
            </h1>


            <p>
              India's Premium Home Appliances
              Wholesale Platform
            </p>


            <div className="hero-buttons">

              <a
                href="#products"
                className="primary-btn"
              >
                Explore Products
              </a>


              <a
                href="#enquiry"
                className="outline-btn"
              >
                Wholesale Enquiry
              </a>

            </div>

          </section>


          {/* RIGHT 3D SCENE */}

          <section className="hero-right">

            <ThreeScene />

          </section>

        </main>

      </section>


      {/* =================================================
          PRODUCTS
      ================================================= */}

      <section
        id="products"
        className="website-section"
      >

        <ProductsPage />

      </section>


      {/* =================================================
          CATEGORIES
      ================================================= */}

      <section
        id="categories"
        className="website-section"
      >

        <CategoriesPage />

      </section>


      {/* =================================================
          DAILY OFFERS
      ================================================= */}

      <section
        id="offers"
        className="website-section"
      >

        <DailyOffers />

      </section>


      {/* =================================================
          WHOLESALE ENQUIRY
      ================================================= */}

      <section
        id="enquiry"
        className="website-section"
      >

        <Enquiry />

      </section>


      {/* =================================================
          CONTACT
      ================================================= */}

      <section
        id="contact"
        className="website-section"
      >

        <Contact />

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="c24-footer">

        <div className="footer-content">


          {/* BRAND */}

          <div className="footer-brand">

            <div className="footer-logo">
              C24 Wholesale
            </div>

            <p>
              Premium Electronics &
              Home Appliances Wholesale Platform.
            </p>

          </div>


          {/* QUICK LINKS */}

          <div className="footer-navigation">

            <span>
              QUICK LINKS
            </span>


            <a href="#home">
              Home
            </a>


            <a href="#products">
              Products
            </a>


            <a href="#categories">
              Categories
            </a>


            <a href="#offers">
              Daily Offers
            </a>

          </div>


          {/* BUSINESS */}

          <div className="footer-navigation">

            <span>
              BUSINESS
            </span>


            <a href="#enquiry">
              Wholesale Enquiry
            </a>


            <a href="#contact">
              Contact
            </a>


            {/* ADMIN LOGIN */}

            <Link
              to="/admin"
              className="admin-footer-link"
            >
              🔐 Admin Login
            </Link>

          </div>

        </div>


        {/* FOOTER BOTTOM */}

        <div className="footer-bottom">

          <small>
            © 2026 C24 Home Application Wholesale.
            All Rights Reserved.
          </small>


          <a href="#home">
            Back to Top ↑
          </a>

        </div>

      </footer>

    </>
  );
}


/* =====================================================
   APP
===================================================== */

function App() {

  const location = useLocation();


  /* =================================================
     ADMIN PAGES
  ================================================= */

  const isAdminPage =
    location.pathname === "/admin" ||
    location.pathname.startsWith(
      "/admin/"
    );


  return (
    <>

      {/* =================================================
          PUBLIC WEBSITE NAVBAR
          Admin pages par hide rahega
      ================================================= */}

      {!isAdminPage && (
        <Navbar />
      )}


      {/* =================================================
          FLOATING WHATSAPP + AI
          Admin pages par hide rahega
      ================================================= */}

      {!isAdminPage && (
        <FloatingActions />
      )}


      {/* =================================================
          ROUTES
      ================================================= */}

      <Routes>


        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/"
          element={
            <HomePage />
          }
        />


        {/* =================================================
            ABOUT
        ================================================= */}

        <Route
          path="/about"
          element={
            <About />
          }
        />


        {/* =================================================
            PRODUCTS
        ================================================= */}

        <Route
          path="/products"
          element={
            <ProductsPage />
          }
        />


        {/* =================================================
            CATEGORIES
        ================================================= */}

        <Route
          path="/categories"
          element={
            <CategoriesPage />
          }
        />


        {/* =================================================
            DAILY OFFERS
        ================================================= */}

        <Route
          path="/offers"
          element={
            <DailyOffers />
          }
        />


        {/* =================================================
            WHOLESALE ENQUIRY
        ================================================= */}

        <Route
          path="/enquiry"
          element={
            <Enquiry />
          }
        />


        {/* =================================================
            CONTACT
        ================================================= */}

        <Route
          path="/contact"
          element={
            <Contact />
          }
        />


        {/* =================================================
            ADMIN LOGIN
        ================================================= */}

        <Route
          path="/admin"
          element={
            <AdminLogin />
          }
        />


        {/* =================================================
            ADMIN DASHBOARD
        ================================================= */}

        <Route
          path="/admin/dashboard"
          element={
            <Dashboard />
          }
        />


        {/* =================================================
            FALLBACK
        ================================================= */}

        <Route
          path="*"
          element={
            <HomePage />
          }
        />

      </Routes>

    </>
  );
}


export default App;