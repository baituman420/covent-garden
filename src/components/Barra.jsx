import React from 'react';
import { barraContent } from '../data/siteContent.js';

export default function Barra() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="section-padding bg-dark">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div>
            <span className="section-tag section-tag-gold">{barraContent.tag}</span>
            <h2 className="section-heading">{barraContent.title}</h2>
          </div>

          <div className="category-tags">
            {barraContent.categories.map((cat, idx) => (
              <span key={idx} className="tag-badge">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Visual Grid */}
        <div className="barra-grid">
          {/* Big Bar Shot */}
          <div className="image-card" style={{ minHeight: '380px' }}>
            <img
              src={`${baseUrl}${barraContent.mainImage.src}`}
              alt={barraContent.mainImage.alt}
              style={{ height: '100%', minHeight: '380px', objectFit: 'cover' }}
            />
            <div className="card-caption">
              <span className="card-caption-title" style={{ color: 'var(--color-brass)' }}>
                El Templo de Indautxu
              </span>
              <p className="card-caption-desc">{barraContent.mainImage.title}</p>
            </div>
          </div>

          {/* Brass Tap Accent Detail */}
          <div style={{ padding: '1.25rem', backgroundColor: 'var(--color-bg-dark-container)', border: '1px solid rgba(247, 188, 96, 0.2)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
            <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '240px' }}>
              <img
                src={`${baseUrl}${barraContent.featureImage.src}`}
                alt={barraContent.featureImage.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', top: '8px', right: '8px', padding: '0.25rem 0.5rem', backgroundColor: 'var(--color-oxblood)', color: 'var(--color-text-light)', fontFamily: 'var(--font-label)', fontSize: '0.65rem', borderRadius: 'var(--radius-sm)' }}>
                {barraContent.featureImage.badge}
              </span>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-brass)', fontSize: '1.2rem' }}>
                {barraContent.featureImage.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                {barraContent.featureImage.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
