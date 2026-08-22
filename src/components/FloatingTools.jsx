import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import "./FloatingTools.css";

export default function FloatingTools() {
  const { t } = useLanguage();

  const [cartCount, setCartCount] = useState(0);

  /* =========================================
     BASE URL
  ========================================= */

  const BASE = import.meta.env.BASE_URL;

  /* =========================================
     UPDATE CART COUNT
  ========================================= */

  const updateCart = () => {
    try {
      const cart = JSON.parse(
        localStorage.getItem("c24Cart") || "[]"
      );

      const count = Array.isArray(cart)
        ? cart.reduce(
            (total, item) =>
              total + Number(item.quantity || 1),
            0
          )
        : 0;

      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  /* =========================================
     CART LISTENER
  ========================================= */

  useEffect(() => {
    updateCart();

    window.addEventListener(
      "storage",
      updateCart
    );

    window.addEventListener(
      "c24-cart-updated",
      updateCart
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateCart
      );

      window.removeEventListener(
        "c24-cart-updated",
        updateCart
      );
    };
  }, []);

  /* =========================================
     WHATSAPP
  ========================================= */

  const openWhatsApp = () => {
    const message =
      "Hello C24 Wholesale 👋 I need wholesale information.";

    const url =
      `https://wa.me/919724445650?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================================
     SCANNER
  ========================================= */

  const openScanner = () => {
    window.location.href =
      `${BASE}scanner`;
  };

  /* =========================================
     AI CHAT
  ========================================= */

  const openAIChat = () => {
    window.location.href =
      `${BASE}ai-chat`;
  };

  /* =========================================
     CART
  ========================================= */

  const openCart = () => {
    window.location.href =
      `${BASE}cart`;
  };

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="c24-floating-tools">

      {/* CART */}

      <button
        type="button"
        onClick={openCart}
        title={t("cart")}
        className="floating-cart"
      >
        🛒

        {cartCount > 0 && (
          <span>{cartCount}</span>
        )}
      </button>


      {/* WHATSAPP */}

      <button
        type="button"
        onClick={openWhatsApp}
        title={t("whatsapp")}
        aria-label={t("whatsapp")}
      >
        💬
      </button>


      {/* AI CHAT */}

      <button
        type="button"
        onClick={openAIChat}
        title={t("liveAiChat")}
        aria-label={t("liveAiChat")}
      >
        🤖
      </button>


      {/* SCANNER */}

      <button
        type="button"
        onClick={openScanner}
        title={t("scanner")}
        aria-label={t("scanner")}
      >
        📷
      </button>

    </div>
  );
}