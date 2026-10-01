import React from 'react';
import { galleryContent } from '../data/siteContent.js';

export default function Galeria() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section id="galeria" className="section-padding bg-oxblood">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag section-tag-gold">{galleryContent.tag}</span>
          <h2 className="section-heading">{galleryContent.title}</h2>
          <p style={{ fontFamily: 'var(--font-headline)', fontStyle: 'italic', color: 'var(--color-brass)', marginTop: '0.5rem', fontSize: '1.2rem' }}>
            {galleryContent.subtitle}
          </p>
        </div>

        {/* Fluid Gallery Grid: 4 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="gallery-fluid-grid">
          {galleryContent.items.map((item, idx) => (
            <div key={idx} className="gallery-card">
              <img
                src={`${baseUrl}${item.src}`}
                alt={item.alt}
                className="gallery-card-img"
              />
              <div className="gallery-card-caption">
                <span className="card-caption-title">{item.tag}</span>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.1rem', color: 'var(--color-text-light)', marginTop: '0.25rem', lineHeight: '1.3' }}>
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
