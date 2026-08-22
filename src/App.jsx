import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home";
import Enquiry from "./pages/enquiry";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./components/Cart";

import RetailerLogin from "./pages/RetailerLogin";
import RetailerDashboard from "./pages/RetailerDashboard";
import RetailerProfile from "./pages/RetailerProfile";
import MyOrders from "./pages/MyOrders";

import AIChat from "./pages/AIChat";

import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/dashboard";

/* FLOATING TOOLS */
import FloatingTools from "./components/FloatingTools";

import "./App.css";


export default function App() {

  return (

    <>

      <Routes>

        {/* =========================
            HOME
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =========================
            PRODUCTS
        ========================= */}

        <Route
          path="/products"
          element={<ProductsPage />}
        />


        {/* =========================
            CART
        ========================= */}

        <Route
          path="/cart"
          element={<Cart />}
        />


        {/* =========================
            ENQUIRY
        ========================= */}

        <Route
          path="/enquiry"
          element={<Enquiry />}
        />


        {/* =========================
            RETAILER LOGIN
        ========================= */}

        <Route
          path="/retailer-login"
          element={<RetailerLogin />}
        />


        {/* =========================
            RETAILER DASHBOARD
        ========================= */}

        <Route
          path="/retailer-dashboard"
          element={<RetailerDashboard />}
        />


        {/* =========================
            RETAILER PROFILE
        ========================= */}

        <Route
          path="/retailer-profile"
          element={<RetailerProfile />}
        />


        {/* =========================
            MY ORDERS
        ========================= */}

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />


        {/* =========================
            AI CHAT
        ========================= */}

        <Route
          path="/ai-chat"
          element={<AIChat />}
        />


        {/* =========================
            SCANNER
        ========================= */}

        <Route
          path="/scanner"
          element={
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
                textAlign: "center",
              }}
            >
              <div>
                <h1>📷 C24 Product Scanner</h1>

                <p>
                  Product scanner coming soon.
                </p>
              </div>
            </div>
          }
        />


        {/* =========================
            ADMIN LOGIN
        ========================= */}

        <Route
          path="/admin"
          element={<AdminLogin />}
        />


        {/* =========================
            ADMIN DASHBOARD
        ========================= */}

        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />


        {/* =========================
            FALLBACK
        ========================= */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>


      {/* =========================
          FLOATING SIDE TOOLS

          Cart
          WhatsApp
          AI Chat
          Scanner
      ========================= */}

      <FloatingTools />

    </>

  );

}