import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

export default function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [removingId, setRemovingId] = useState(null);

  /* =====================================================
     LOAD WISHLIST
  ===================================================== */

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("c24Wishlist") || "[]"
      );

      setWishlist(Array.isArray(saved) ? saved : []);
    } catch {
      setWishlist([]);
    }
  };

  /* =====================================================
     SAVE WISHLIST
  ===================================================== */

  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);

    localStorage.setItem(
      "c24Wishlist",
      JSON.stringify(newWishlist)
    );

    window.dispatchEvent(new Event("storage"));
  };

  /* =====================================================
     REMOVE FROM WISHLIST
  ===================================================== */

  const removeFromWishlist = (item) => {
    setRemovingId(item.id);

    setTimeout(() => {
      const newWishlist = wishlist.filter(
        (product) => String(product.id) !== String(item.id)
      );

      saveWishlist(newWishlist);
      setRemovingId(null);
    }, 500);
  };

  /* =====================================================
     MOVE TO CART
  ===================================================== */

  const moveToCart = (item) => {
    try {
      const cart = JSON.parse(
        localStorage.getItem("c24Cart") || "[]"
      );

      const exists = cart.find(
        (product) => String(product.id) === String(item.id)
      );

      let newCart;

      if (exists) {
        newCart = cart.map((product) =>
          String(product.id) === String(item.id)
            ? {
                ...product,
                quantity: Number(product.quantity || 1) + 1,
              }
            : product
        );
      } else {
        newCart = [...cart, { ...item, quantity: 1 }];
      }

      localStorage.setItem("c24Cart", JSON.stringify(newCart));
      window.dispatchEvent(new Event("storage"));

      // Remove from wishlist
      removeFromWishlist(item);

      // Navigate to cart after animation
      setTimeout(() => {
        navigate("/cart");
      }, 700);
    } catch (err) {
      console.error("MOVE TO CART ERROR:", err);
    }
  };

  /* =====================================================
     EMPTY WISHLIST
  ===================================================== */

  if (wishlist.length === 0) {
    return (
      <section className="wishlist-page">
        <div className="wishlist-container">
          <motion.div
            className="wishlist-empty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="wishlist-empty-icon"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              💖
            </motion.div>

            <h1>Your Wishlist is Empty</h1>
            <p>
              Apne favourite wholesale products yahan save karo.
            </p>

            <motion.button
              type="button"
              onClick={() => navigate("/products")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Products →
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  /* =====================================================
     MAIN WISHLIST PAGE
  ===================================================== */

  return (
    <section className="wishlist-page">
      <div className="wishlist-container">

        {/* HEADER */}
        <motion.div
          className="wishlist-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span>C24 WHOLESALE</span>
            <h1>My Wishlist 💖</h1>
            <p>{wishlist.length} saved items</p>
          </div>

          <motion.button
            type="button"
            onClick={() => navigate("/products")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Continue Shopping
          </motion.button>
        </motion.div>

        {/* WISHLIST GRID */}
        <motion.div
          className="wishlist-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <AnimatePresence>
            {wishlist.map((item) => (
              <motion.article
                key={item.id}
                className="wishlist-card"
                layout
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  x: 100,
                  transition: { duration: 0.4 },
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                {/* HEART BADGE */}
                <motion.div
                  className="wishlist-heart-badge"
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  💖
                </motion.div>

                {/* IMAGE */}
                <div className="wishlist-image">
                  {item.image ? (
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                  ) : (
                    <span>C24</span>
                  )}

                  {/* IMAGE OVERLAY */}
                  <div className="wishlist-image-overlay"></div>
                </div>

                {/* INFO */}
                <div className="wishlist-info">
                  <small>{item.brand || "C24"}</small>
                  <h3>{item.name}</h3>
                  <p className="wishlist-price">
                    ₹
                    {Number(item.price || 0).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="wishlist-actions">
                  <motion.button
                    type="button"
                    className="wishlist-cart-button"
                    onClick={() => moveToCart(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🛒 Move to Cart
                  </motion.button>

                  <motion.button
                    type="button"
                    className="wishlist-remove-button"
                    onClick={() => removeFromWishlist(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={removingId === item.id}
                  >
                    {removingId === item.id ? "..." : "🗑️"}
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* FLOATING ACTION BUTTON - MOVE ALL TO CART */}
        {wishlist.length > 0 && (
          <motion.button
            className="wishlist-move-all"
            onClick={() => {
              wishlist.forEach((item) => {
                try {
                  const cart = JSON.parse(
                    localStorage.getItem("c24Cart") || "[]"
                  );

                  const exists = cart.find(
                    (product) =>
                      String(product.id) === String(item.id)
                  );

                  if (!exists) {
                    cart.push({ ...item, quantity: 1 });
                  }

                  localStorage.setItem(
                    "c24Cart",
                    JSON.stringify(cart)
                  );
                  window.dispatchEvent(new Event("storage"));
                } catch (err) {
                  console.error(err);
                }
              });

              saveWishlist([]);
              navigate("/cart");
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.5 }}
          >
            🛒 Move All to Cart ({wishlist.length})
          </motion.button>
        )}

      </div>
    </section>
  );
}