import React from 'react';
import { gruposContent, navidadContent } from '../data/siteContent.js';
import { useDynamicMedia, resolveSingleImage } from '../data/mediaBridge.js';

export default function GruposBloque() {
  const baseUrl = import.meta.env.BASE_URL;
  const media = useDynamicMedia();
  const bgImgSrc = resolveSingleImage(media, 'grupos_mesa_robla', gruposContent.image);
  const secImgSrc = resolveSingleImage(media, 'grupos_mesa_tizer', gruposContent.secondaryImage);
  const navPosterSrc = resolveSingleImage(media, 'cartel_navidad', navidadContent.posterImage);

  return (
    <section id="grupos" className="section-padding bg-dark-card" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background texture & warm atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("${baseUrl}${bgImgSrc}")`,
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

            <p className="body-copy" style={{ marginBottom: '1.75rem', lineHeight: 1.7 }}>
              {gruposContent.description}
            </p>

            {/* Banner Especial de Menús de Grupo y Temporada */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => window.dispatchEvent(new CustomEvent('open-navidad-modal'))}
              onKeyDown={(e) => e.key === 'Enter' && window.dispatchEvent(new CustomEvent('open-navidad-modal'))}
              className="grupos-navidad-banner-trigger"
              style={{
                backgroundColor: 'rgba(213, 0, 0, 0.16)',
                border: '1px solid rgba(247, 188, 96, 0.45)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                marginBottom: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <span style={{ fontSize: '2rem' }}>🎄</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-label)', fontSize: '0.7rem', color: '#ff757f', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    MENÚS DE TEMPORADA & KATXOPO
                  </span>
                  <span style={{ fontFamily: 'var(--font-label)', fontSize: '0.7rem', color: 'var(--color-brass)', fontWeight: 700, textDecoration: 'underline' }}>
                    Ver Menús (Desde 22€) ➔
                  </span>
                </div>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--color-cream)', lineHeight: 1.4 }}>
                  Disponibles menús especiales de grupo y catering para empresas y cuadrillas. Pulsa para consultar los menús completos y precios oficiales.
                </p>
              </div>
            </div>

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

              <a
                href={`tel:${gruposContent.reservasPhone || '944667549'}`}
                className="btn-secondary"
                style={{ padding: '0.875rem 1.5rem', fontSize: '0.75rem' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px', marginRight: '0.35rem' }}>call</span>
                <span>Llamar al Pub (944 667 549)</span>
              </a>

              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', maxWidth: '100%', lineHeight: 1.4, width: '100%' }}>
                {gruposContent.clarification}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                src={`${baseUrl}${secImgSrc}`}
                alt="Mesa reservada en Covent Garden"
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
                  ESPACIOS RESERVADOS
                </div>
                <p style={{ fontFamily: 'var(--font-headline)', fontSize: '1.15rem', color: 'var(--color-cream)', margin: 0 }}>
                  Bancadas corridas, rincones íntimos y ambiente clásico para cuadrillas.
                </p>
              </div>
            </div>

            {/* Cartel de Navidad & Katxopo miniatura interactiva */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => window.dispatchEvent(new CustomEvent('open-navidad-modal', { detail: { tab: 'poster' } }))}
              onKeyDown={(e) => e.key === 'Enter' && window.dispatchEvent(new CustomEvent('open-navidad-modal', { detail: { tab: 'poster' } }))}
              className="grupos-cartel-miniatura-trigger"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.85rem 1rem',
                backgroundColor: 'rgba(26, 23, 21, 0.85)',
                border: '1px solid rgba(247, 188, 96, 0.35)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <img
                src={`${baseUrl}${navPosterSrc}`}
                alt="Cartel Menús Navidad y Katxopo"
                style={{ width: '56px', height: '76px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(247, 188, 96, 0.4)' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-brass)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    CARTELERA OFICIAL
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#ff757f', fontWeight: 700 }}>
                    Ver Cartel ➔
                  </span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '0.95rem', color: 'var(--color-cream)', margin: '0.2rem 0' }}>
                  Menús Especiales Navidad & Katxopo
                </h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Plazas abiertas para cenas de empresa y cuadrillas. Pulsa para ampliar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
