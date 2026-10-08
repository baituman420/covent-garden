import React, { useState, useRef, useEffect } from 'react';
import { athleticContent } from '../data/siteContent.js';

export default function Athletic() {
  const baseUrl = import.meta.env.BASE_URL;
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="athletic" className="athletic-section">
      {/* Background Energy & Atmosphere */}
      <div className="athletic-bg-energy" />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header Tag & Title */}
        <div className="athletic-header-wrap">
          <div className="athletic-eyebrow">
            <span className="athletic-dot" />
            <span>{athleticContent.tag}</span>
          </div>

          <h2 className="athletic-main-title">
            <span className="athletic-title-line">AQUÍ SE VIVE</span>
            <span className="athletic-title-accent">EL ATHLETIC</span>
          </h2>

          <p className="athletic-subtitle">
            {athleticContent.description}
          </p>
        </div>

        {/* Audiovisual Centerpiece Frame (Athletic Play inspired) */}
        <div className="athletic-player-card">
          <div className="athletic-video-wrapper">
            {!prefersReducedMotion ? (
              <video
                ref={videoRef}
                src={`${baseUrl}${athleticContent.videoUrl}`}
                poster={`${baseUrl}${athleticContent.posterImage}`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="athletic-video-element"
              />
            ) : (
              <img
                src={`${baseUrl}${athleticContent.posterImage}`}
                alt="Aquí se vive el Athletic"
                className="athletic-video-element"
              />
            )}

            {/* Cinematic Gradient Overlays */}
            <div className="athletic-scrim-top" />
            <div className="athletic-scrim-bottom" />

            {/* Official Crest Badge - High Visibility */}
            <div className="athletic-crest-floating">
              <img
                src={`${baseUrl}${athleticContent.crestImage}`}
                alt="Escudo Athletic Club Bilbao"
                className="athletic-crest-img"
              />
            </div>

            {/* Integrated Video Play/Pause Controller */}
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={togglePlay}
                className="athletic-play-toggle"
                aria-label={isPlaying ? 'Pausar vídeo' : 'Reproducir vídeo'}
                title={isPlaying ? 'Pausar vídeo' : 'Reproducir vídeo'}
              >
                <span className="material-symbols-outlined athletic-play-icon">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
                <span className="athletic-play-label">
                  {isPlaying ? 'ANIMACIÓN ACTIVA' : 'REPRODUCIR'}
                </span>
              </button>
            )}

            {/* Desktop Overlay Banner (hidden on mobile to prevent blocking composition) */}
            <div className="athletic-overlay-caption">
              <div className="athletic-caption-badge">
                SAN MAMÉS · INDAUTXU
              </div>
              <h3 className="athletic-caption-text">
                EL PARTIDO SE JUEGA EN LA CANCHA. LA EMOCIÓN SE COMPARTE EN LA BARRA.
              </h3>
            </div>
          </div>

          {/* Mobile Caption Banner (displayed directly below the video on mobile) */}
          <div className="athletic-mobile-caption">
            <span className="athletic-caption-badge">
              SAN MAMÉS · INDAUTXU
            </span>
            <p className="athletic-mobile-caption-text">
              El partido se juega en la cancha. La emoción se comparte en la barra.
            </p>
          </div>
        </div>

        {/* 3 Pillars Grid: 75% Athletic / 25% Covent */}
        <div className="athletic-pillars-grid">
          {athleticContent.features.map((feat, idx) => (
            <div key={idx} className="athletic-pillar-card">
              <div className="athletic-pillar-header">
                <span className="athletic-pillar-num">{feat.number}</span>
                <span className="athletic-pillar-highlight">{feat.highlight}</span>
              </div>
              <h4 className="athletic-pillar-title">{feat.title}</h4>
              <p className="athletic-pillar-desc">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Matchday Callout & Calendar */}
        <div className="athletic-matchday-box">
          <div style={{ flex: 1 }}>
            <span className="athletic-matchday-badge">
              {athleticContent.callout.badge}
            </span>
            <h4 className="athletic-matchday-title">
              {athleticContent.callout.title}
            </h4>
            <p className="athletic-matchday-desc">
              {athleticContent.callout.desc}
            </p>
          </div>

          <a
            href={athleticContent.callout.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              padding: '0.85rem 1.75rem',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{athleticContent.callout.cta}</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', marginLeft: '0.5rem' }}>
              open_in_new
            </span>
          </a>
        </div>

        {/* Legal Disclaimer */}
        <p className="athletic-disclaimer">
          {athleticContent.disclaimer}
        </p>
      </div>
    </section>
  );
}
