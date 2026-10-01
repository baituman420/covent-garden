import React from 'react';
import { elPubContent } from '../data/siteContent.js';

export default function ElPub() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section id="el-pub" className="section-padding bg-cream-warm">
      <div className="container">
        {/* Header */}
        <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid rgba(29, 26, 24, 0.15)' }}>
          <span className="section-tag">{elPubContent.tag}</span>
          <h2 className="section-heading text-dark">{elPubContent.title}</h2>
          <p style={{ marginTop: '0.75rem', color: 'var(--color-text-dark-muted)', maxWidth: '36rem' }}>
            {elPubContent.description}
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="pub-grid">
          {/* Main Photo */}
          <div className="image-card">
            <img
              src={`${baseUrl}${elPubContent.mainImage.src}`}
              alt={elPubContent.mainImage.alt}
            />
            <div className="card-caption">
              <span className="card-caption-title">{elPubContent.mainImage.captionTitle}</span>
              <p className="card-caption-desc">{elPubContent.mainImage.captionDesc}</p>
            </div>
          </div>

          {/* Secondary Photo & Special Feature */}
          <div>
            <div className="memorabilia-card">
              <img
                src={`${baseUrl}${elPubContent.secondaryImage.src}`}
                alt={elPubContent.secondaryImage.alt}
              />
              <div className="memorabilia-content">
                <span className="section-tag">{elPubContent.secondaryImage.tag}</span>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.35rem', marginTop: '0.25rem' }}>
                  {elPubContent.secondaryImage.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dark-muted)', marginTop: '0.5rem' }}>
                  {elPubContent.secondaryImage.desc}
                </p>
              </div>
            </div>

            {/* Special Feature: El Tren del Techo */}
            <div className="special-feature">
              <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--color-oxblood)', flexShrink: 0 }}>
                train
              </span>
              <div>
                <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.1rem', fontWeight: '700' }}>
                  {elPubContent.specialFeature.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dark-muted)', marginTop: '0.25rem' }}>
                  {elPubContent.specialFeature.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
