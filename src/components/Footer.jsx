import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div>
          <h2>C24 Wholesale</h2>
          <p>India's Premium Home Appliances Wholesale Platform.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>Products</p>
          <p>Brands</p>
          <p>About</p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>📞 +91 9724445650</p>
          <p>✉️ info@c24.com</p>
          <p>📍 India</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 C24 Wholesale. All Rights Reserved.
      </p>
    </footer>
  );
}