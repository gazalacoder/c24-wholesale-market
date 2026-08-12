import "./about.css";

export default function About() {
  return (
    <main className="about-page">

      {/* HERO */}

      <section className="about-hero">

        <div className="about-hero-content">

          <span className="about-label">
            ABOUT C24
          </span>

          <h1>
            Powering
            <br />
            <span>Modern Homes.</span>
          </h1>

          <p>
            C24 Home Appliances Wholesale is a
            premium wholesale platform for
            electronics and home appliances.
          </p>

        </div>

        <div className="about-orb">
          <div className="orb-ring ring-1"></div>
          <div className="orb-ring ring-2"></div>
          <div className="orb-core"></div>
        </div>

      </section>


      {/* ABOUT CONTENT */}

      <section className="about-content">

        <div className="about-heading">

          <span>WHO WE ARE</span>

          <h2>
            Premium products.
            <br />
            Reliable wholesale.
          </h2>

        </div>


        <div className="about-text">

          <p>
            C24 Home Appliances Wholesale is
            focused on connecting retailers,
            distributors and businesses with
            quality home appliances and
            electronics.
          </p>

          <p>
            Our goal is to make wholesale
            purchasing simple, professional
            and efficient while providing
            competitive business opportunities.
          </p>

        </div>

      </section>


      {/* FEATURES */}

      <section className="about-features">

        <div className="feature-card">

          <div className="feature-number">
            01
          </div>

          <h3>
            Premium Quality
          </h3>

          <p>
            Carefully selected electronics
            and home appliance products.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-number">
            02
          </div>

          <h3>
            Wholesale Pricing
          </h3>

          <p>
            Competitive pricing designed
            for retailers and businesses.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-number">
            03
          </div>

          <h3>
            Business Support
          </h3>

          <p>
            Professional enquiry and
            wholesale assistance.
          </p>

        </div>

      </section>


      {/* MISSION */}

      <section className="about-mission">

        <div>

          <span>
            OUR MISSION
          </span>

          <h2>
            Making wholesale
            <br />
            <strong>simple & smarter.</strong>
          </h2>

        </div>

        <p>
          We want businesses to discover
          products, compare categories and
          connect with C24 easily through a
          modern digital wholesale experience.
        </p>

      </section>


      {/* CTA */}

      <section className="about-cta">

        <span>
          READY TO WORK WITH C24?
        </span>

        <h2>
          Let's build your
          <br />
          <strong>business together.</strong>
        </h2>

        <a href="/enquiry">
          Wholesale Enquiry →
        </a>

      </section>

    </main>
  );
}