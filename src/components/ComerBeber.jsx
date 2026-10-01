import React from 'react';
import { comerBeberContent } from '../data/siteContent.js';

export default function ComerBeber() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section id="comer-beber" className="section-padding bg-cream" style={{ borderTop: '1px solid rgba(29, 26, 24, 0.1)' }}>
      <div className="container">
        <div className="comer-grid">
          {/* Images Block */}
          <div style={{ position: 'relative' }}>
            <div className="image-card" style={{ height: 'auto', minHeight: '380px' }}>
              <img
                src={`${baseUrl}${comerBeberContent.mainImage.src}`}
                alt={comerBeberContent.mainImage.alt}
                style={{ height: '420px', objectFit: 'cover' }}
              />
              <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--color-cream-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="section-tag" style={{ margin: 0 }}>{comerBeberContent.mainImage.badge}</span>
                <span className="nav-link" style={{ color: 'var(--color-text-dark)' }}>SIEMPRE RECIÉN HECHA</span>
              </div>
            </div>
          </div>

          {/* Menu Info Block */}
          <div>
            <span className="section-tag">{comerBeberContent.tag}</span>
            <h2 className="section-heading text-dark">{comerBeberContent.title}</h2>
            <p style={{ marginTop: '0.75rem', fontSize: '1.1rem', color: 'var(--color-text-dark-muted)' }}>
              {comerBeberContent.description}
            </p>

            {/* Ruled Menu List */}
            <div className="menu-list">
              {comerBeberContent.categories.map((cat, idx) => (
                <div key={idx} className="menu-item">
                  <span className="menu-num">{cat.number}</span>
                  <div>
                    <h3 className="menu-item-title">{cat.title}</h3>
                    <p className="menu-item-desc">{cat.desc}</p>
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
