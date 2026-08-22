import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../LanguageContext";
import "./AIChat.css";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


/* =========================================
   RETAILER
========================================= */

const getRetailer = () => {
  try {
    const saved =
      localStorage.getItem("c24_retailer");

    return saved
      ? JSON.parse(saved)
      : null;
  } catch {
    return null;
  }
};


/* =========================================
   LANGUAGE
========================================= */

const getCurrentLanguage = () => {
  const possibleKeys = [
    "c24_language",
    "language",
    "selectedLanguage",
  ];

  for (const key of possibleKeys) {
    const value =
      localStorage.getItem(key);

    if (value) {
      return value;
    }
  }

  return "EN";
};


/* =========================================
   PRODUCT MATCH
========================================= */

const findProducts = (
  text,
  products
) => {

  const query =
    text.toLowerCase().trim();

  if (!query) return [];

  return products
    .filter((product) => {

      const name =
        String(
          product.name || ""
        ).toLowerCase();

      const brand =
        String(
          product.brand || ""
        ).toLowerCase();

      const category =
        String(
          product.category || ""
        ).toLowerCase();

      return (
        query.includes(name) ||
        name.includes(query) ||
        query.includes(brand) ||
        brand.includes(query) ||
        query.includes(category) ||
        category.includes(query)
      );

    })
    .slice(0, 5);
};


/* =========================================
   WEBSITE-ONLY AI
========================================= */

const getWebsiteReply = ({
  text,
  products,
  retailer,
  language,
}) => {

  const q =
    text
      .toLowerCase()
      .trim();


  /* =======================================
     GREETING
  ======================================= */

  if (
    /^(hi|hello|hey|hii|helo|namaste|नमस्ते|हाय)/i.test(q)
  ) {

    if (retailer?.name) {

      return (
        `Hello ${retailer.name} 👋\n\n` +
        "Welcome to C24 Wholesale AI Assistant. " +
        "Main aapko products, wholesale prices, stock, cart, orders, retailer account, enquiry, price list aur website navigation mein help kar sakta hoon."
      );

    }

    return (
      "Hello 👋 Welcome to C24 Wholesale AI Assistant.\n\n" +
      "Main aapko C24 website se related help de sakta hoon — products, wholesale prices, stock, cart, orders, retailer login, enquiry, price list aur contact."
    );

  }


  /* =======================================
     WEBSITE / C24
  ======================================= */

  if (
    q.includes("c24") ||
    q.includes("website") ||
    q.includes("site")
  ) {

    return (
      "🏢 C24 Home Application Wholesale ek wholesale website hai jahan retailers products dekh sakte hain, wholesale pricing access kar sakte hain, cart mein products add kar sakte hain aur bulk enquiry/order submit kar sakte hain."
    );

  }


  /* =======================================
     PRODUCTS
  ======================================= */

  if (
    q.includes("product") ||
    q.includes("products") ||
    q.includes("product list") ||
    q.includes("catalog") ||
    q.includes("catalogue") ||
    q.includes("item") ||
    q.includes("saman") ||
    q.includes("saamaan") ||
    q.includes("kya kya hai") ||
    q.includes("kya available")
  ) {

    if (!products.length) {

      return (
        "📦 Abhi products load nahi ho rahe. " +
        "Please thodi der baad Products section check karein."
      );

    }

    const list =
      products
        .slice(0, 12)
        .map((product) => {

          return (
            `• ${product.name}` +
            (
              product.brand
                ? ` — ${product.brand}`
                : ""
            )
          );

        })
        .join("\n");

    return (
      "🛍️ C24 par available products:\n\n" +
      list +
      "\n\nKisi specific product ka naam bhejiye, main uska price aur stock bata sakta hoon."
    );

  }


  /* =======================================
     SPECIFIC PRODUCT
  ======================================= */

  const matched =
    findProducts(
      q,
      products
    );

  if (matched.length > 0) {

    return matched
      .map((product) => {

        const mrp =
          Number(
            product.mrp ||
            product.price ||
            0
          );

        const wholesale =
          Number(
            product.wholesalePrice ||
            product.price ||
            0
          );

        const stock =
          Number(
            product.stock || 0
          );

        return (
          `📦 ${product.name}\n\n` +

          `🏷️ Brand: ${
            product.brand || "N/A"
          }\n` +

          `📂 Category: ${
            product.category || "N/A"
          }\n` +

          `💰 MRP: ₹${mrp.toLocaleString(
            "en-IN"
          )}\n` +

          `🔐 Wholesale Price: ${
            retailer
              ? `₹${wholesale.toLocaleString(
                  "en-IN"
                )}`
              : "Retailer login required"
          }\n` +

          `📊 Stock: ${
            stock > 0
              ? `${stock} available`
              : "Out of stock"
          }\n\n` +

          `${
            product.description
              ? product.description
              : "Product details available on the Products page."
          }`
        );

      })
      .join("\n\n----------------\n\n");

  }


  /* =======================================
     PRICE
  ======================================= */

  if (
    q.includes("price") ||
    q.includes("price list") ||
    q.includes("pricelist") ||
    q.includes("rate") ||
    q.includes("cost") ||
    q.includes("daam") ||
    q.includes("dam") ||
    q.includes("kimat") ||
    q.includes("keemat") ||
    q.includes("कीमत") ||
    q.includes("रेट")
  ) {

    if (!retailer) {

      return (
        "🔐 Wholesale prices dekhne ke liye Retailer Login karein.\n\n" +
        "Login ke baad Products page par wholesale pricing aur cart access mil jayega."
      );

    }

    if (!products.length) {

      return (
        "💰 Price information abhi load nahi ho rahi. Please Products page refresh karein."
      );

    }

    const list =
      products
        .slice(0, 10)
        .map((product) => {

          const price =
            Number(
              product.wholesalePrice ||
              product.price ||
              0
            );

          return (
            `• ${product.name} — ₹${price.toLocaleString(
              "en-IN"
            )}`
          );

        })
        .join("\n");

    return (
      "💰 C24 Wholesale Prices:\n\n" +
      list +
      "\n\nSpecific product ka naam bhejiye for exact details."
    );

  }


  /* =======================================
     PRICE LIST DOWNLOAD
  ======================================= */

  if (
    q.includes("download price list") ||
    q.includes("price list download") ||
    q.includes("price list kaha") ||
    q.includes("price list kahan") ||
    q.includes("price list kaise") ||
    q.includes("pricelist download")
  ) {

    return (
      "📄 Price List download karne ke liye website ke Price List section mein jaakar **Download Price List** button par click karein."
    );

  }


  /* =======================================
     STOCK
  ======================================= */

  if (
    q.includes("stock") ||
    q.includes("available") ||
    q.includes("availability") ||
    q.includes("in stock") ||
    q.includes("out of stock") ||
    q.includes("maal hai")
  ) {

    if (!products.length) {

      return (
        "📦 Inventory information abhi available nahi hai. Please thodi der baad try karein."
      );

    }

    const list =
      products
        .slice(0, 10)
        .map((product) => {

          const stock =
            Number(
              product.stock || 0
            );

          return (
            `• ${product.name}: ${
              stock > 0
                ? `${stock} available`
                : "Out of stock"
            }`
          );

        })
        .join("\n");

    return (
      "📦 Current Product Stock:\n\n" +
      list
    );

  }


  /* =======================================
     RETAILER LOGIN
  ======================================= */

  if (
    q.includes("retailer login") ||
    q.includes("retailer account") ||
    q.includes("login") ||
    q.includes("sign in") ||
    q.includes("signin") ||
    q.includes("login kaise") ||
    q.includes("account kaise")
  ) {

    return (
      "👤 Retailer Login ke liye website ke Retailer Login option par click karein.\n\n" +
      "Login ke baad aap wholesale prices dekh sakte hain aur products cart mein add kar sakte hain."
    );

  }


  /* =======================================
     REGISTER
  ======================================= */

  if (
    q.includes("register") ||
    q.includes("registration") ||
    q.includes("account bana") ||
    q.includes("account banau") ||
    q.includes("new account") ||
    q.includes("signup") ||
    q.includes("sign up")
  ) {

    return (
      "📝 Naya retailer account banane ke liye Retailer Login page par registration option use karein.\n\n" +
      "Registration ke baad login karke wholesale pricing access kar sakte hain."
    );

  }


  /* =======================================
     CART
  ======================================= */

  if (
    q.includes("cart") ||
    q.includes("add to cart") ||
    q.includes("cart mein") ||
    q.includes("cart me") ||
    q.includes("cart kaise")
  ) {

    return (
      "🛒 Product ko cart mein add karne ke liye retailer login zaroori hai.\n\n" +
      "Products page → Product select karein → Add to Cart par click karein → Cart page se order continue karein."
    );

  }


  /* =======================================
     ORDER
  ======================================= */

  if (
    q.includes("order") ||
    q.includes("orders") ||
    q.includes("order kaise") ||
    q.includes("order place") ||
    q.includes("buy") ||
    q.includes("purchase") ||
    q.includes("kharid")
  ) {

    return (
      "🛒 Order place karne ke liye:\n\n" +
      "1. Retailer Login karein.\n" +
      "2. Products page open karein.\n" +
      "3. Required products Cart mein add karein.\n" +
      "4. Cart open karke order details submit karein.\n\n" +
      "Aap My Orders section se apne orders check kar sakte hain."
    );

  }


  /* =======================================
     MY ORDERS
  ======================================= */

  if (
    q.includes("my order") ||
    q.includes("order history") ||
    q.includes("previous order") ||
    q.includes("mere order") ||
    q.includes("order status")
  ) {

    return (
      "📋 Apne previous orders aur order status dekhne ke liye Retailer Dashboard ke **My Orders** section par jaayein."
    );

  }


  /* =======================================
     ENQUIRY
  ======================================= */

  if (
    q.includes("enquiry") ||
    q.includes("inquiry") ||
    q.includes("bulk enquiry") ||
    q.includes("bulk order") ||
    q.includes("wholesale enquiry") ||
    q.includes("enquiry kaise")
  ) {

    return (
      "📩 Wholesale enquiry submit karne ke liye website ka **Enquiry** page open karein.\n\n" +
      "Product name, quantity aur contact details fill karke enquiry submit karein. C24 team aapki request receive karegi."
    );

  }


  /* =======================================
     CONTACT
  ======================================= */

  if (
    q.includes("contact") ||
    q.includes("contact kaise") ||
    q.includes("contact number") ||
    q.includes("phone") ||
    q.includes("whatsapp") ||
    q.includes("whatsapp number")
  ) {

    return (
      "📞 C24 se contact karne ke liye website par WhatsApp option use karein.\n\n" +
      "Aap Enquiry page se bhi apni requirement directly submit kar sakte hain."
    );

  }


  /* =======================================
     WHATSAPP
  ======================================= */

  if (
    q.includes("whatsapp") ||
    q.includes("whatsapp par")
  ) {

    return (
      "💬 WhatsApp button website ke floating tools mein available hai. Us par click karke C24 Wholesale se directly contact kar sakte hain."
    );

  }


  /* =======================================
     AI CHAT
  ======================================= */

  if (
    q.includes("ai chat") ||
    q.includes("assistant") ||
    q.includes("chatbot") ||
    q.includes("ai kya")
  ) {

    return (
      "🤖 Main C24 Wholesale ka website assistant hoon. Main aapko products, prices, stock, retailer account, cart, orders, enquiry aur website navigation mein help kar sakta hoon."
    );

  }


  /* =======================================
     SCANNER
  ======================================= */

  if (
    q.includes("scanner") ||
    q.includes("scan") ||
    q.includes("qr") ||
    q.includes("qr code")
  ) {

    return (
      "📷 C24 website ke floating tools mein Scanner option available hai. Scanner button par click karke scanner page open kar sakte hain."
    );

  }


  /* =======================================
     LANGUAGE
  ======================================= */

  if (
    q.includes("language") ||
    q.includes("language change") ||
    q.includes("language kaise") ||
    q.includes("भाषा") ||
    q.includes("हिंदी")
  ) {

    return (
      "🌐 Website par available Language option se language change kar sakte hain. Language change karne ke baad website ka supported text selected language mein show hoga."
    );

  }


  /* =======================================
     PRODUCT DETAIL
  ======================================= */

  if (
    q.includes("detail") ||
    q.includes("details") ||
    q.includes("specification") ||
    q.includes("specifications") ||
    q.includes("description")
  ) {

    return (
      "📋 Product details dekhne ke liye Products page par product select karein. Agar aap product ka naam bhejenge to main available product information bata sakta hoon."
    );

  }


  /* =======================================
     WHOLESALE
  ======================================= */

  if (
    q.includes("wholesale") ||
    q.includes("wholesale business") ||
    q.includes("wholesale kaise")
  ) {

    return (
      "🏢 C24 Wholesale retailers ke liye products aur wholesale purchasing facility provide karta hai.\n\n" +
      "Wholesale pricing access karne ke liye retailer login karein."
    );

  }


  /* =======================================
     PAYMENT
  ======================================= */

  if (
    q.includes("payment") ||
    q.includes("pay") ||
    q.includes("online payment") ||
    q.includes("payment kaise")
  ) {

    return (
      "💳 Payment/order process website ke available checkout options ke according hota hai. Agar aapko payment related specific issue aa raha hai to Enquiry page se C24 team ko contact karein."
    );

  }


  /* =======================================
     DELIVERY
  ======================================= */

  if (
    q.includes("delivery") ||
    q.includes("shipping") ||
    q.includes("dispatch") ||
    q.includes("deliver")
  ) {

    return (
      "🚚 Delivery/shipping details order aur location ke according vary kar sakti hain. Exact information ke liye enquiry submit karein ya C24 WhatsApp support se contact karein."
    );

  }


  /* =======================================
     BUSINESS / COMPANY
  ======================================= */

  if (
    q.includes("business") ||
    q.includes("company") ||
    q.includes("about c24") ||
    q.includes("c24 kya")
  ) {

    return (
      "🏢 C24 Home Application Wholesale ek wholesale-focused website hai jahan retailers products browse karke wholesale purchasing, enquiry aur order related services use kar sakte hain."
    );

  }


  /* =======================================
     HELP
  ======================================= */

  if (
    q.includes("help") ||
    q.includes("madad") ||
    q.includes("kya kar sakte") ||
    q.includes("what can you do")
  ) {

    return (
      "🤖 Main in C24 website topics mein help kar sakta hoon:\n\n" +
      "🛍️ Products\n" +
      "💰 Wholesale Prices\n" +
      "📦 Stock\n" +
      "👤 Retailer Login/Register\n" +
      "🛒 Cart & Orders\n" +
      "📩 Enquiry\n" +
      "📄 Price List\n" +
      "💬 WhatsApp\n" +
      "📷 Scanner\n" +
      "🌐 Language\n" +
      "📞 Contact"
    );

  }


  /* =======================================
     WEBSITE ONLY FALLBACK
  ======================================= */

  return (
    "🤖 Main C24 Wholesale Website Assistant hoon.\n\n" +
    "Main sirf C24 website se related help kar sakta hoon, jaise:\n\n" +
    "• Products\n" +
    "• Wholesale prices\n" +
    "• Stock\n" +
    "• Retailer login/register\n" +
    "• Cart & orders\n" +
    "• Enquiry\n" +
    "• Price list\n" +
    "• WhatsApp/contact\n" +
    "• Scanner\n\n" +
    "Aap apna C24 website related question pooch sakte hain."
  );

};


/* =========================================
   COMPONENT
========================================= */

export default function AIChat() {

  const { t } = useLanguage();

  const [messages, setMessages] =
    useState([
      {
        sender: "ai",
        text:
          "Hello! 👋 C24 Wholesale AI Assistant mein aapka welcome hai.\n\nAap products, wholesale prices, stock, retailer login, cart, orders, enquiry ya website ke kisi feature ke baare mein pooch sakte hain.",
      },
    ]);

  const [message, setMessage] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const [products, setProducts] =
    useState([]);

  const [retailer, setRetailer] =
    useState(null);


  /* =========================================
     LOAD RETAILER
  ========================================= */

  useEffect(() => {

    setRetailer(
      getRetailer()
    );

  }, []);


  /* =========================================
     LOAD PRODUCTS
  ========================================= */

  useEffect(() => {

    const loadProducts =
      async () => {

        try {

          const response =
            await fetch(
              `${API}/products`
            );

          if (!response.ok) {
            return;
          }

          const data =
            await response.json();

          const list =
            Array.isArray(data)
              ? data
              : data.products || [];

          setProducts(list);

        } catch (error) {

          console.error(
            "Products load error:",
            error
          );

        }

      };

    loadProducts();

  }, []);


  /* =========================================
     PRODUCT COUNT
  ========================================= */

  const productCount =
    useMemo(
      () => products.length,
      [products]
    );


  /* =========================================
     SEND MESSAGE
  ========================================= */

  const sendMessage =
    async (e) => {

      e.preventDefault();

      const text =
        message.trim();

      if (
        !text ||
        sending
      ) {
        return;
      }


      /* USER MESSAGE */

      setMessages((prev) => [
        ...prev,

        {
          sender: "user",
          text,
        },

      ]);

      setMessage("");
      setSending(true);


      try {

        const language =
          getCurrentLanguage();


        /* =====================================
           GENERATE WEBSITE RESPONSE
        ===================================== */

        const reply =
          getWebsiteReply({
            text,
            products,
            retailer,
            language,
          });


        /* =====================================
           SHOW RESPONSE
        ===================================== */

        setMessages((prev) => [
          ...prev,

          {
            sender: "ai",
            text: reply,
          },

        ]);


        /* =====================================
           SAVE TO ADMIN
        ===================================== */

        try {

          await fetch(
            `${API}/ai-chats`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({

                  retailerId:
                    retailer?.id ||
                    null,

                  name:
                    retailer?.name ||
                    "",

                  businessName:
                    retailer?.businessName ||
                    "",

                  phone:
                    retailer?.phone ||
                    "",

                  email:
                    retailer?.email ||
                    "",

                  message:
                    text,

                  reply,

                  language,

                }),
            }
          );

        } catch (saveError) {

          console.error(
            "AI chat admin save error:",
            saveError
          );

        }

      } catch (error) {

        console.error(
          "AI response error:",
          error
        );

        setMessages((prev) => [
          ...prev,

          {
            sender: "ai",
            text:
              "Sorry, response generate nahi ho paaya. C24 website ke products, price, stock, order ya enquiry ke baare mein pooch sakte hain.",
          },

        ]);

      } finally {

        setSending(false);

      }

    };


  /* =========================================
     UI
  ========================================= */

  return (

    <section className="ai-chat-page">

      <div className="ai-chat-container">


        {/* =================================
            HEADER
        ================================= */}

        <div className="ai-chat-header">

          <div className="ai-avatar">
            🤖
          </div>

          <div>

            <span>
              C24 WHOLESALE
            </span>

            <h1>
              AI Assistant
            </h1>

            <small>
              🟢 Online • Ready to help
            </small>

          </div>

        </div>


        {/* =================================
            WEBSITE INFO
        ================================= */}

        <div
          style={{
            padding: "10px 16px",
            fontSize: "13px",
            opacity: 0.75,
          }}
        >
          C24 Website Assistant •{" "}
          {productCount} products available
        </div>


        {/* =================================
            MESSAGES
        ================================= */}

        <div className="ai-chat-messages">

          {messages.map(
            (item, index) => (

              <div
                key={index}
                className={`chat-message ${
                  item.sender === "user"
                    ? "user-message"
                    : "ai-message"
                }`}
              >

                {item.sender === "ai" && (

                  <div className="message-icon">
                    🤖
                  </div>

                )}

                <div
                  className="message-bubble"
                  style={{
                    whiteSpace:
                      "pre-line",
                  }}
                >
                  {item.text}
                </div>

              </div>

            )
          )}


          {sending && (

            <div className="chat-message ai-message">

              <div className="message-icon">
                🤖
              </div>

              <div className="message-bubble typing">
                Thinking...
              </div>

            </div>

          )}

        </div>


        {/* =================================
            INPUT
        ================================= */}

        <form
          className="ai-chat-input"
          onSubmit={sendMessage}
        >

          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Ask about C24 products, prices, stock, orders..."
            disabled={sending}
          />

          <button
            type="submit"
            disabled={
              sending ||
              !message.trim()
            }
          >
            ➤
          </button>

        </form>


      </div>

    </section>

  );

}