import React from 'react';
import { barraContent } from '../data/siteContent.js';
import { useDynamicMedia, resolveSingleImage } from '../data/mediaBridge.js';

export default function Barra() {
  const baseUrl = import.meta.env.BASE_URL;
  const media = useDynamicMedia();
  const mainImgSrc = resolveSingleImage(media, 'pub_barra_noche', barraContent.mainImage.src);
  const featureImgSrc = resolveSingleImage(media, 'barra_tiradores', barraContent.featureImage.src);
  const ginImgSrc = resolveSingleImage(media, 'barra_gin_corner', barraContent.cornerGinImage.src);

  return (
    <section id="barra" className="barra-section section-padding bg-dark">
      <div className="container">
        {/* Cabecera */}
        <div className="barra-header-wrap">
          <div>
            <span className="section-tag section-tag-gold">{barraContent.tag}</span>
            <h2 className="section-heading">{barraContent.title}</h2>
            <p className="body-copy" style={{ maxWidth: '44rem', marginTop: '0.5rem', color: 'var(--color-text-muted)' }}>
              {barraContent.description}
            </p>
          </div>

          <div className="category-tags">
            {barraContent.categories.map((cat, idx) => (
              <span key={idx} className="tag-badge">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Visual Grid Equilibrado */}
        <div className="barra-grid-balanced">
          {/* Columna Izquierda: Gran toma atmosférica de la barra de caoba */}
          <div className="barra-main-card">
            <div className="barra-main-img-wrap">
              <img
                src={`${baseUrl}${mainImgSrc}`}
                alt={barraContent.mainImage.alt}
                className="barra-main-img"
                loading="lazy"
              />
              <div className="barra-main-scrim" />
              <div className="barra-main-caption">
                <span className="barra-caption-badge">
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>location_on</span>
                  <span>EL TEMPLO DE INDAUTXU · DOCTOR AREILZA 28</span>
                </span>
                <h3 className="barra-caption-title">{barraContent.mainImage.title}</h3>
                <p className="barra-caption-desc">{barraContent.mainImage.desc}</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Stack completo de dos tarjetas de oficio cervecero y botillería */}
          <div className="barra-sidebar-stack">
            {/* Tarjeta 1: Grifos de Bronce */}
            <div className="barra-accent-card">
              <div className="barra-accent-thumb">
                <img
                  src={`${baseUrl}${featureImgSrc}`}
                  alt={barraContent.featureImage.alt}
                  className="barra-thumb-img"
                  loading="lazy"
                />
                <span className="barra-accent-badge">{barraContent.featureImage.badge}</span>
              </div>
              <div className="barra-accent-body">
                <h3 className="barra-accent-title">{barraContent.featureImage.title}</h3>
                <p className="barra-accent-desc">{barraContent.featureImage.desc}</p>
              </div>
            </div>

            {/* Tarjeta 2: Corner Gin & Botillería */}
            <div className="barra-accent-card">
              <div className="barra-accent-thumb">
                <img
                  src={`${baseUrl}${ginImgSrc}`}
                  alt={barraContent.cornerGinImage.alt}
                  className="barra-thumb-img"
                  loading="lazy"
                />
                <span className="barra-accent-badge badge-gin">{barraContent.cornerGinImage.badge}</span>
              </div>
              <div className="barra-accent-body">
                <h3 className="barra-accent-title">{barraContent.cornerGinImage.title}</h3>
                <p className="barra-accent-desc">{barraContent.cornerGinImage.desc}</p>
              </div>
            </div>

            {/* Tira Inferior de Sellos Taberneros */}
            <div className="barra-badges-grid">
              {barraContent.highlights.map((h, hIdx) => (
                <div key={hIdx} className="barra-mini-pill">
                  <div className="mini-pill-icon">
                    <span className="material-symbols-outlined">{h.icon}</span>
                  </div>
                  <div className="mini-pill-info">
                    <span className="mini-pill-title">{h.title}</span>
                    <span className="mini-pill-sub">{h.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
