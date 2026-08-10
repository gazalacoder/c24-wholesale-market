import { useState } from "react";
import "./FloatingActions.css";
import QRScanner from "./QRScanner";

const API_URL = "http://localhost:5000";
const WHATSAPP_NUMBER = "919724445650";

export default function FloatingActions() {

  const [open, setOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text:
        "👋 Welcome to C24 Wholesale! How can I help you?"
    }
  ]);


  /* =====================================================
     AI CHAT
  ===================================================== */

  async function sendMessage() {

    const text = message.trim();

    if (!text || loading) return;

    setMessages((old) => [
      ...old,
      {
        type: "user",
        text
      }
    ]);

    setMessage("");
    setLoading(true);

    try {

      const response = await fetch(
        `${API_URL}/api/ai-chat`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            message: text
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.reply ||
          "AI request failed"
        );
      }

      setMessages((old) => [
        ...old,
        {
          type: "bot",
          text:
            data.reply ||
            "Sorry, response nahi mila."
        }
      ]);

    } catch (error) {

      console.error(
        "AI CHAT ERROR:",
        error
      );

      setMessages((old) => [
        ...old,
        {
          type: "bot",
          text:
            "⚠️ AI server se connection nahi ho raha."
        }
      ]);

    } finally {

      setLoading(false);

    }
  }


  /* =====================================================
     ENTER KEY
  ===================================================== */

  function handleKeyDown(e) {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      sendMessage();

    }

  }


  /* =====================================================
     WHATSAPP
  ===================================================== */

  function openWhatsApp() {

    const text =
      "Hello C24 Wholesale 👋\n\nI want to know about your products and wholesale prices.";

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  }


  return (
    <>

      {/* =================================================
          FLOATING BUTTONS
      ================================================= */}

      <div className="floating-actions">


        {/* WHATSAPP */}

        <button
          type="button"
          className="whatsapp-button"
          onClick={openWhatsApp}
          aria-label="WhatsApp"
          title="Chat on WhatsApp"
        >

          <svg
            className="whatsapp-svg"
            viewBox="0 0 32 32"
          >

            <path
              fill="currentColor"
              d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.47 1.73 6.4L3 29l6.78-1.69A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Zm0 23.5c-1.98 0-3.91-.53-5.6-1.54l-.4-.24-4.02 1 1.02-3.92-.26-.4A10.44 10.44 0 1 1 16 26.5Zm5.72-7.84c-.31-.16-1.83-.9-2.11-1-.28-.1-.49-.16-.7.16-.21.31-.8 1-.98 1.21-.18.21-.36.24-.67.08-.31-.16-1.3-.48-2.47-1.53-.91-.81-1.52-1.81-1.7-2.12-.18-.31-.02-.48.14-.64.14-.14.31-.36.46-.54.15-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.69-.96-2.31-.25-.6-.51-.52-.7-.53h-.6c-.21 0-.55.08-.83.39-.28.31-1.09 1.07-1.09 2.6s1.12 3.02 1.27 3.23c.16.21 2.2 3.36 5.33 4.71.74.32 1.41.21 1.94.13.59-.09 1.83-.75 2.09-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.21-.59-.37Z"
            />

          </svg>

        </button>


        {/* AI */}

        <button
          type="button"
          className="ai-button"
          onClick={() =>
            setOpen(!open)
          }
          aria-label="AI Chat"
          title="C24 AI Assistant"
        >

          {open ? (
            <span className="close-icon">
              ×
            </span>
          ) : (
            <span className="ai-chat-icon">
              💬
            </span>
          )}

        </button>


        {/* QR SCANNER */}

        <button
          type="button"
          className="qr-button"
          onClick={() =>
            setQrOpen(true)
          }
          aria-label="QR Scanner"
          title="Scan QR Code"
        >
          QR
        </button>

      </div>


      {/* =================================================
          AI CHAT WINDOW
      ================================================= */}

      {open && (

        <div className="ai-chat-window">

          {/* HEADER */}

          <div className="ai-chat-header">

            <div className="ai-header-left">

              <div className="ai-header-icon">
                AI
              </div>

              <div>

                <strong>
                  C24 AI Assistant
                </strong>

                <small>
                  <span className="online-dot"></span>
                  Online
                </small>

              </div>

            </div>


            <button
              type="button"
              className="chat-close-button"
              onClick={() =>
                setOpen(false)
              }
            >
              ×
            </button>

          </div>


          {/* MESSAGES */}

          <div className="ai-chat-messages">

            {messages.map(
              (item, index) => (

                <div
                  key={index}
                  className={
                    item.type === "user"
                      ? "chat-message user-message"
                      : "chat-message bot-message"
                  }
                >
                  {item.text}
                </div>

              )
            )}


            {loading && (

              <div className="chat-message bot-message typing">
                C24 AI is typing...
              </div>

            )}

          </div>


          {/* INPUT */}

          <div className="ai-chat-input">

            <input
              type="text"
              value={message}
              placeholder="Ask about products, prices..."
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              disabled={loading}
            />


            <button
              type="button"
              onClick={sendMessage}
              disabled={
                loading ||
                !message.trim()
              }
            >
              {loading ? "..." : "➤"}
            </button>

          </div>


          <div className="ai-chat-footer">
            Powered by C24 AI
          </div>

        </div>

      )}


      {/* =================================================
          QR SCANNER
      ================================================= */}

      {qrOpen && (

        <QRScanner
          onClose={() =>
            setQrOpen(false)
          }
        />

      )}

    </>
  );
}