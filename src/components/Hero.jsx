import React from 'react';
import { heroContent } from '../data/siteContent.js';

export default function Hero() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="hero-section">
      {/* Soft Ambient Bar Background Fill (covent-barra.jpg) with Transparency */}
      <div
        className="hero-bg-fill"
        style={{
          backgroundImage: `url("${baseUrl}images/covent-barra.jpg")`,
        }}
      />

      {/* Main Full Facade Image (fachada-hero.png) */}
      <div className="hero-facade-wrap">
        <img
          src={`${baseUrl}${heroContent.backgroundImage}`}
          alt="Fachada Covent Garden"
          className="hero-facade-img"
        />
      </div>

      {/* Atmospheric Dual Scrim Overlays */}
      <div className="hero-overlay-vertical" />
      <div className="hero-overlay-horizontal" />

      {/* Content */}
      <div className="container hero-content">
        <div
          style={{
            maxWidth: '48rem',
            textShadow: '0px 2px 14px rgba(0, 0, 0, 0.9), 0px 0px 25px rgba(247, 188, 96, 0.25)',
          }}
        >
          {/* Location Eyebrow Tag */}
          <div className="hero-eyebrow">
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-brass)' }}>
              location_on
            </span>
            <span>{heroContent.eyebrow}</span>
          </div>

          {/* Master Title */}
          <div style={{ marginTop: '0.25rem' }}>
            <h1 className="hero-title">
              {heroContent.title}
              <span className="hero-subtitle">{heroContent.subtitle}</span>
            </h1>
          </div>

          {/* Heritage Descriptor */}
          <p className="hero-desc">{heroContent.description}</p>

          {/* Pub / Pintxos / Live Sport Pill Grid */}
          <div className="hero-pills">
            {heroContent.pills.map((pill, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="dot-separator" />}
                <span>{pill}</span>
              </React.Fragment>
            ))}
          </div>

          {/* Action Callouts */}
          <div className="hero-ctas">
            <a href={heroContent.primaryCta.href} className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem' }}>
              {heroContent.primaryCta.label}
              <span className="material-symbols-outlined" style={{ fontSize: '18px', marginLeft: '0.5rem' }}>
                arrow_downward
              </span>
            </a>

            <a
              href={heroContent.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                photo_camera
              </span>
              <span>{heroContent.secondaryCta.label}</span>
            </a>

            <a href={heroContent.tertiaryCta.href} className="btn-link">
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-brass)' }}>
                explore
              </span>
              <span>{heroContent.tertiaryCta.label}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
