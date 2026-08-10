import { useEffect, useState } from "react";
import ThreeScene from "./ThreeScene";
import "./Home.css";

export default function Home() {
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHome(true);
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="home">

      {/* 3D CINEMATIC EXPERIENCE */}
      {!showHome && (
        <section className="cinematic-hero">
          <ThreeScene />

          <div className="scene-vignette" />
        </section>
      )}

      {/* ACTUAL HOME PAGE */}
      {showHome && (
        <section className="real-home">

          <div className="home-content">

            <span className="home-eyebrow">
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

            <div className="home-buttons">
              <button>
                Explore Products
              </button>

              <button className="secondary-btn">
                Get Wholesale Quote
              </button>
            </div>

          </div>

        </section>
      )}

    </main>
  );
}