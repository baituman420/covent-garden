import React from 'react';
import { gruposContent } from '../data/siteContent.js';

export default function GruposBloque() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section id="grupos" className="section-padding bg-dark-card" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background texture & warm atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("${baseUrl}${gruposContent.image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.16,
          filter: 'brightness(0.6) contrast(1.1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(34, 31, 29, 0.7) 0%, rgba(16, 14, 12, 0.95) 100%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Content */}
          <div>
            <div className="tag-header" style={{ marginBottom: '0.75rem' }}>
              {gruposContent.tag}
            </div>

            <h2 className="title-display" style={{ marginBottom: '0.75rem', color: 'var(--color-cream)' }}>
              {gruposContent.title}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '1.25rem',
                color: 'var(--color-brass)',
                marginBottom: '1.25rem',
                fontStyle: 'italic',
              }}
            >
              {gruposContent.subtitle}
            </p>

            <p className="body-copy" style={{ marginBottom: '2rem', lineHeight: 1.7 }}>
              {gruposContent.description}
            </p>

            {/* Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {gruposContent.highlights.map((h, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: 'var(--color-brass)', fontSize: '20px', marginTop: '2px' }}
                  >
                    check
                  </span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-label)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-cream)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                      {h.title}
                    </h3>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA action */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.25rem' }}>
              <a
                href={`${baseUrl}${gruposContent.cta.href}`}
                className="btn-primary"
                style={{ padding: '0.875rem 1.75rem', fontSize: '0.75rem' }}
              >
                <span>{gruposContent.cta.label}</span>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', marginLeft: '0.5rem' }}>
                  arrow_forward
                </span>
              </a>

              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', maxWidth: '18rem', lineHeight: 1.4 }}>
                {gruposContent.clarification}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid rgba(247, 188, 96, 0.3)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <img
                src={`${baseUrl}${gruposContent.secondaryImage}`}
                alt="Memorabilia y ambiente en Covent Garden"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'brightness(0.9) contrast(1.05)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(16, 14, 12, 0.9) 0%, rgba(16, 14, 12, 0.2) 50%, transparent 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'rgba(139, 30, 36, 0.9)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--color-cream)',
                    marginBottom: '0.5rem',
                  }}
                >
                  ESPACIOS ADAPTABLES
                </div>
                <p style={{ fontFamily: 'var(--font-headline)', fontSize: '1.15rem', color: 'var(--color-cream)', margin: 0 }}>
                  Mesas corridas y ambiente cálido para disfrutar entre amigos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
