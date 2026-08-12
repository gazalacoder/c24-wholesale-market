import "./DailyOffers.css";

const BASE = import.meta.env.BASE_URL;

const offers = [
  {
    title: "Smart TV",
    subtitle: "Premium 4K Displays",
    image: `${BASE}images/products/smart-tv.jpg`,
    offer: "Special Wholesale Deal",
    badge: "HOT DEAL",
  },
  {
    title: "Washing Machine",
    subtitle: "Modern Laundry Collection",
    image: `${BASE}images/products/washing-machine.jpg`,
    offer: "Bulk Order Offer",
    badge: "LIMITED",
  },
  {
    title: "Mixer Grinder",
    subtitle: "Kitchen Essentials",
    image: `${BASE}images/products/mixer.jpg`,
    offer: "Today's Wholesale Deal",
    badge: "BEST DEAL",
  },
];

export default function DailyOffers() {
  return (
    <section className="daily-offers">

      <div className="offers-header">
        <span>🔥 C24 DAILY OFFERS</span>

        <h2>
          Today's
          <br />
          <strong>Best Deals.</strong>
        </h2>

        <p>
          Premium home appliances with special
          wholesale offers for bulk buyers.
        </p>
      </div>

      <div className="offers-grid">

        {offers.map((offer) => (
          <article
            className="offer-product"
            key={offer.title}
          >

            <div className="offer-image">

              <img
                src={offer.image}
                alt={offer.title}
                loading="lazy"
              />

              <span className="offer-badge">
                {offer.badge}
              </span>

            </div>

            <div className="offer-content">

              <span className="offer-small">
                {offer.subtitle}
              </span>

              <h3>
                {offer.title}
              </h3>

              <p>
                {offer.offer}
              </p>

              <a href="#enquiry">
                Enquire Now →
              </a>

            </div>

          </article>
        ))}

      </div>

      <div className="offers-bottom">

        <div>
          <span>WHOLESALE SPECIAL</span>

          <h3>
            Bigger Quantity.
            <strong> Better Deal.</strong>
          </h3>
        </div>

        <a href="#enquiry">
          Get Wholesale Quote →
        </a>

      </div>

    </section>
  );
}