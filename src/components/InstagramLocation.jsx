import React from 'react';
import { locationContent, instagram, site } from '../data/siteContent.js';

export default function InstagramLocation() {
  return (
    <section id="como-llegar" className="section-padding bg-cream" style={{ borderTop: '1px solid rgba(29, 26, 24, 0.1)' }}>
      <div className="container">
        <div className="location-grid">
          {/* Left: Instagram Block */}
          <div className="info-card">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-oxblood)', fontSize: '20px' }}>
                  camera_alt
                </span>
                <span className="section-tag" style={{ margin: 0 }}>
                  {locationContent.instagramBlock.tag}
                </span>
              </div>

              <h2 className="section-heading text-dark">{locationContent.instagramBlock.title}</h2>
              <p style={{ color: 'var(--color-text-dark-muted)', marginTop: '0.75rem', lineHeight: '1.6' }}>
                {locationContent.instagramBlock.description}
              </p>

              {/* Profile Card */}
              <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: 'var(--color-cream-dark)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="section-tag" style={{ fontSize: '0.65rem' }}>Perfil Oficial</span>
                  <p style={{ fontFamily: 'var(--font-headline)', fontSize: '1.25rem', fontWeight: '700' }}>
                    {instagram.handle}
                  </p>
                </div>
                <a
                  href={instagram.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  {locationContent.instagramBlock.buttonText}
                </a>
              </div>

              {/* Featured Instagram Post Block */}
              {instagram.featuredPost && (
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(223, 214, 202, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(29, 26, 24, 0.15)', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--color-oxblood)', fontSize: '22px' }}>
                      mark_as_unread
                    </span>
                    <div>
                      <span className="section-tag" style={{ fontSize: '0.65rem', margin: 0 }}>Publicación Destacada</span>
                      <p style={{ fontFamily: 'var(--font-headline)', fontSize: '0.95rem', fontWeight: '600' }}>
                        Ver post en Instagram
                      </p>
                    </div>
                  </div>
                  <a
                    href={instagram.featuredPost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ padding: '0.5rem 0.85rem', fontSize: '0.7rem' }}
                  >
                    Ver Post ↗
                  </a>
                </div>
              )}
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(29, 26, 24, 0.15)', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-dark-muted)' }}>
              <span>{instagram.hashtag}</span>
              <span style={{ fontWeight: '700', color: 'var(--color-oxblood)' }}>Bilbao · Indautxu</span>
            </div>
          </div>

          {/* Right: Location & Address Block */}
          <div className="info-card">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-brass-dark)', fontSize: '20px' }}>
                  storefront
                </span>
                <span className="section-tag section-tag-gold" style={{ margin: 0, color: 'var(--color-brass-dark)' }}>
                  {locationContent.locationBlock.tag}
                </span>
              </div>

              <h2 className="section-heading text-dark">{locationContent.locationBlock.title}</h2>

              <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-oxblood)', fontSize: '20px', marginTop: '2px' }}>
                    pin_drop
                  </span>
                  <div>
                    <strong style={{ color: 'var(--color-text-dark)' }}>{locationContent.locationBlock.address}</strong>
                    <br />
                    <span>{locationContent.locationBlock.cityInfo}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-brass-dark)', fontSize: '20px' }}>
                    directions_subway
                  </span>
                  <span>{site.metroStation}</span>
                </div>
              </div>
            </div>

            {/* Map Action */}
            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(29, 26, 24, 0.15)' }}>
              <a
                href={site.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: '100%', textDecoration: 'none', padding: '0.85rem' }}
              >
                {locationContent.locationBlock.buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
