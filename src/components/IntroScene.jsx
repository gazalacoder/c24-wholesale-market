import { useEffect, useRef, useState } from "react";
import "./IntroScene.css";

function IntroScene({ onComplete = () => {} }) {
  const starsRef = useRef(null);
  const [closing, setClosing] = useState(false);

  /* =========================================
     GALAXY ANIMATION
  ========================================= */

  useEffect(() => {
    const canvas = starsRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame;
    let stars = [];

    const resize = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        1.5
      );

      canvas.width =
        window.innerWidth * dpr;

      canvas.height =
        window.innerHeight * dpr;

      canvas.style.width =
        `${window.innerWidth}px`;

      canvas.style.height =
        `${window.innerHeight}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      stars = Array.from(
        { length: 160 },
        () => ({
          x:
            Math.random() *
            window.innerWidth,

          y:
            Math.random() *
            window.innerHeight,

          size:
            Math.random() * 1.8 +
            0.3,

          speed:
            Math.random() * 0.35 +
            0.08,

          opacity:
            Math.random() * 0.7 +
            0.2,
        })
      );
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    const animate = () => {
      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      const centerX =
        window.innerWidth / 2;

      const centerY =
        window.innerHeight / 2;

      /* =====================================
         GALAXY
      ===================================== */

      const gradient =
        ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          Math.max(
            window.innerWidth,
            window.innerHeight
          ) * 0.7
        );

      gradient.addColorStop(
        0,
        "rgba(0,170,255,0.20)"
      );

      gradient.addColorStop(
        0.25,
        "rgba(0,90,200,0.12)"
      );

      gradient.addColorStop(
        0.55,
        "rgba(0,30,80,0.08)"
      );

      gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      /* =====================================
         STARS
      ===================================== */

      stars.forEach((star) => {
        star.y -= star.speed;

        if (star.y < -5) {
          star.y =
            window.innerHeight + 5;

          star.x =
            Math.random() *
            window.innerWidth;
        }

        const twinkle =
          0.5 +
          Math.sin(
            Date.now() *
              0.002 +
              star.x
          ) *
            0.3;

        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          star.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          `rgba(90,210,255,${
            star.opacity *
            twinkle
          })`;

        ctx.fill();
      });

      /* =====================================
         GALAXY ORBIT
      ===================================== */

      const radius =
        Math.min(
          window.innerWidth,
          window.innerHeight
        ) * 0.36;

      ctx.save();

      ctx.translate(
        centerX,
        centerY
      );

      ctx.rotate(
        Date.now() * 0.00008
      );

      ctx.beginPath();

      ctx.ellipse(
        0,
        0,
        radius,
        radius * 0.32,
        0,
        0,
        Math.PI * 2
      );

      ctx.strokeStyle =
        "rgba(0,200,255,0.18)";

      ctx.lineWidth = 2;

      ctx.shadowBlur = 20;

      ctx.shadowColor =
        "#00cfff";

      ctx.stroke();

      ctx.restore();

      /* =====================================
         ORBIT PARTICLES
      ===================================== */

      for (
        let i = 0;
        i < 30;
        i++
      ) {
        const angle =
          Date.now() *
            0.0007 +
          i * 0.4;

        const particleRadius =
          radius *
          (
            0.45 +
            (i % 5) *
              0.09
          );

        const x =
          centerX +
          Math.cos(angle) *
            particleRadius;

        const y =
          centerY +
          Math.sin(angle) *
            particleRadius *
            0.38;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          1.5,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(0,210,255,0.8)";

        ctx.shadowBlur = 12;

        ctx.shadowColor =
          "#00cfff";

        ctx.fill();
      }

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    animate();

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  /* =========================================
     INTRO FINISH
  ========================================= */

  useEffect(() => {
    const timer =
      setTimeout(() => {

        setClosing(true);

        setTimeout(() => {

          if (
            typeof onComplete ===
            "function"
          ) {
            onComplete();
          }

        }, 1000);

      }, 4200);

    return () => {
      clearTimeout(timer);
    };

  }, [onComplete]);

  /* =========================================
     UI
  ========================================= */

  return (
    <div
      className={
        `intro-scene ${
          closing
            ? "intro-closing"
            : ""
        }`
      }
    >

      <canvas
        ref={starsRef}
        className="galaxy-canvas"
      />

      <div className="logo-wrapper">

        <div className="logo-galaxy" />

        <div className="logo-glow" />

        <div className="logo-ring ring-one" />

        <div className="logo-ring ring-two" />

        <img
          src={
            `${import.meta.env.BASE_URL}images/c24-logo-crop.png`
          }
          alt="C24"
          className="intro-logo"
        />

      </div>

      <div className="intro-brand">

        <span className="brand-main">
          C24
        </span>

        <span className="brand-sub">
          HOME APPLICATION WHOLESALE
        </span>

      </div>

    </div>
  );
}

export default IntroScene;