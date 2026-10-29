import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function HeroBanner() {
  const { navigate, showToast } = useApp();

  // Gentle interaction state
  const [isWaving, setIsWaving] = useState(false);

  const handleCharacterClick = () => {
    setIsWaving(true);
    showToast("Vijay Elumalai: 'Welcome to A1-MART Central Retail ERP.'");
    setTimeout(() => setIsWaving(false), 2400);
  };

  return (
    <div className="shoplay-hero-banner" role="region" aria-label="A1-MART Welcome & Assistant Overview">
      {/* ============================================================
          LEFT SIDE — 3D CARTOON SMALL BOY AVATAR
          ============================================================ */}
      <div
        className="hero-avatar-left-column"
        onClick={handleCharacterClick}
        title="Vijay Elumalai - IT & Software Manager"
      >
        {/* Soft 3D ambient radial glow */}
        <div className="avatar-ambient-glow" />

        {/* 3D Cartoon Small Boy Avatar */}
        <div className="avatar-portrait-stage">
          <img
            src="/cartoon_boy_transparent.png?v=4"
            alt="Vijay Elumalai - 3D Cartoon Small Boy"
            className="avatar-pose-img is-visible cartoon-boy-hero-img"
          />
        </div>

        {/* Live Assistant Status Pill */}
        <div className="avatar-status-pill">
          <span className="status-indicator-dot" />
          <span className="status-label">ERP ASSISTANT</span>
        </div>
      </div>

      {/* ============================================================
          RIGHT SIDE — GREETING, DESIGNATION & ACTIONS
          ============================================================ */}
      <div className="hero-content-right-column">
        {/* Prominent Heading & Title with Bold & Italic */}
        <div className="hero-greeting-heading-group">
          <h2 className="hero-banner-heading">
            <strong>Hi, I am Vijay Elumalai</strong>
          </h2>
          <span className="hero-banner-designation">
            <em>IT &amp; Software Manager</em> @ <strong>A1-MART</strong>
          </span>
        </div>

        {/* Clean Descriptive Subtitle with Bold/Italic Highlights */}
        <p className="hero-banner-clean-desc">
          Welcome to <strong>A1-MART Central Store Operations</strong>. Real-time <strong>POS billing terminals</strong>, live <strong>inventory sync</strong>, and multi-branch systems are running at <em>100% efficiency</em>.
        </p>

        {/* Action Button */}
        <div className="hero-cta-wrapper">
          <button
            type="button"
            className="hero-cta-btn"
            onClick={() => navigate('master-products')}
            title="Manage Store Products"
          >
            <span><strong>Manage Store Products</strong></span>
            <div className="hero-arrow-circle">
              <ArrowRight size={13} strokeWidth={2.5} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
