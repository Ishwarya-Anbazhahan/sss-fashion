
import React from "react";
import "../styles/Hero.css";
import { GoldDust } from "./Effects";

function Hero() {
  return (
    <section className="hero-section">
      <GoldDust />

      {/* LEFT CONTENT */}
      <div className="hero-content">

        <div className="location">
          <span></span>
          TRICHY & COIMBATORE
          <span className="star">✦</span>
        </div>

        <h1>
          தங்கம், வெள்ளி,
          <br />
          <span>வைரம்.</span>
        </h1>

        <p className="hero-description">
          Gold, sterling silver, and diamond jewellery
          <br />
          for Tamil Nadu weddings and the days after them.
          <br />
          <span>Grand opening 05 Oct 2026.</span>
        </p>

        <div className="hero-buttons">
          <a href="#jewellery" className="primary-btn">
            See the jewellery ↗
          </a>

          <a href="#showroom" className="secondary-btn">
            Find a showroom ↗
          </a>
        </div>

        <div className="hallmark">
          <span></span>
          ASK THE SHOWROOM FOR HALLMARK
        </div>

      </div>

      {/* RIGHT SIDE BRIDAL MODEL */}
      <div className="hero-visual">

        {/* GOLDEN ARCH */}
        <div className="golden-arch"></div>
        <div className="hero-ring"></div>

        {/* BRIDAL PHOTO */}
        <img
          src="/images/bride.png"
          alt="South Indian bridal jewellery"
          className="bride-image"
        />

        {/* GOLDEN DECORATION */}
        <div className="hero-star star-one">✦</div>
        <div className="hero-star star-two">✦</div>

        {/* SSS FASHION LOGO */}
        <div className="brand-logo">
          <div>SSS</div>
          <small>FASHION</small>
          <span>♕</span>
        </div>

        {/* TEMPLE HARAM */}
        <div className="temple-label">
          கோவில் ஹாரம் | TEMPLE HARAM
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="hero-bottom">
        <span>SCROLL TO DISCOVER</span>
        <i></i>
        <strong>GRAND OPENING 05 OCT 2026</strong>
      </div>

    </section>
  );
}

export default Hero;
