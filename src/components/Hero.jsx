import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { heroContent } from '../data/siteContent.js';

export default function Hero() {
  const baseUrl = import.meta.env.BASE_URL;
  const heroRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
      });

      // 0 - 0.5s: Interior background visible
      tl.set('.hero-bg-fill', { opacity: 0.85 });

      // 0.5 - 1.1s: Facade revealed progressively via clip-path & mask
      tl.fromTo(
        '.hero-facade-wrap',
        {
          opacity: 0,
          clipPath: 'polygon(15% 0%, 85% 0%, 85% 100%, 15% 100%)',
          scale: 0.98,
        },
        {
          opacity: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          duration: 0.6,
        },
        0.5
      );

      // 1.0 - 1.4s: Subtle light accent on the real facade sign
      tl.fromTo(
        '.hero-sign-glow',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 0.65,
          scale: 1.05,
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
        },
        1.0
      );

      // 1.2 - 1.8s: Content textual reveal from its own composition
      tl.fromTo(
        '.hero-content-reveal',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        1.2
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      {/* Soft Ambient Bar Background Fill (covent-barra.jpg) */}
      <div
        className="hero-bg-fill"
        style={{
          backgroundImage: `url("${baseUrl}images/covent-barra.jpg")`,
        }}
      />

      {/* Main Facade Wrap with Real Sign & Red Exterior (fachada-hero.png) */}
      <div className="hero-facade-wrap">
        <img
          src={`${baseUrl}${heroContent.backgroundImage}`}
          alt="Fachada real de Covent Garden Bilbao"
          className="hero-facade-img"
        />

        {/* Subtle Sign Glow Highlight */}
        <div className="hero-sign-glow" />
      </div>

      {/* Atmospheric Overlays for Desktop Scrim */}
      <div className="hero-overlay-vertical" />
      <div className="hero-overlay-horizontal" />

      {/* Mobile Backdrop Scrim (ensures contrast below the architectural stage) */}
      <div className="hero-mobile-scrim" />

      {/* Content Container */}
      <div className="container hero-content">
        <div className="hero-content-reveal hero-text-card">
          {/* Location Eyebrow */}
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

          {/* Action CTAs */}
          <div className="hero-ctas">
            <a
              href={heroContent.primaryCta.href}
              className="btn-primary hero-btn-cta"
            >
              <span>{heroContent.primaryCta.label}</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', marginLeft: '0.5rem' }}>
                arrow_downward
              </span>
            </a>

            <a
              href={heroContent.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary hero-btn-cta"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                photo_camera
              </span>
              <span>{heroContent.secondaryCta.label}</span>
            </a>

            <a
              href={heroContent.tertiaryCta.href}
              className="btn-link hero-btn-link"
            >
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
