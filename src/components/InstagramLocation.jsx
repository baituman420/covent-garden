import React, { useState, useEffect } from 'react';
import { locationContent, instagram, instagramFeed, site } from '../data/siteContent.js';

export default function InstagramLocation() {
  const baseUrl = import.meta.env.BASE_URL;
  const [latestPost, setLatestPost] = useState(instagramFeed.fallbackPost);
  const [postSource, setPostSource] = useState('fallback'); // fallback | meta_api | dev_mock
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchInstagramPost() {
      try {
        const response = await fetch(`${baseUrl}api/instagram.php`);
        if (!response.ok) throw new Error('API offline');
        const data = await response.json();

        if (isMounted && data && data.success && data.post) {
          setLatestPost(data.post);
          setPostSource(data.source || 'meta_api');
        }
      } catch (err) {
        // Fallback silencioso y limpio
        if (isMounted) {
          setLatestPost(instagramFeed.fallbackPost);
          setPostSource('fallback');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchInstagramPost();

    return () => {
      isMounted = false;
    };
  }, [baseUrl]);

  // Resolver URL de imagen si es relativa
  const resolveMediaUrl = (url) => {
    if (!url) return `${baseUrl}images/covent-barra-pintxos.jpg`;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${baseUrl}${url}`;
  };

  return (
    <section id="como-llegar" className="section-padding bg-cream" style={{ borderTop: '1px solid rgba(29, 26, 24, 0.1)' }}>
      <div className="container">
        <div className="location-grid">
          {/* Left: Instagram Block with Dynamic Latest Post */}
          <div className="info-card">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-oxblood)', fontSize: '20px' }}>
                    camera_alt
                  </span>
                  <span className="section-tag" style={{ margin: 0 }}>
                    {locationContent.instagramBlock.tag}
                  </span>
                </div>

                {postSource === 'fallback' && (
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-label)', letterSpacing: '0.08em', color: 'var(--color-text-dark-muted)', textTransform: 'uppercase' }}>
                    Feed Curado · Preintegración Meta
                  </span>
                )}
              </div>

              <h2 className="section-heading text-dark">{locationContent.instagramBlock.title}</h2>
              <p style={{ color: 'var(--color-text-dark-muted)', marginTop: '0.75rem', lineHeight: '1.6' }}>
                {locationContent.instagramBlock.description}
              </p>

              {/* Profile Bar */}
              <div
                style={{
                  marginTop: '1.25rem',
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--color-cream-dark)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <span className="section-tag" style={{ fontSize: '0.65rem', margin: 0 }}>Canal Oficial</span>
                  <p style={{ fontFamily: 'var(--font-headline)', fontSize: '1.15rem', fontWeight: '700', margin: '0.15rem 0 0 0' }}>
                    {instagram.handle}
                  </p>
                </div>
                <a
                  href={instagram.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.7rem' }}
                >
                  {locationContent.instagramBlock.buttonText}
                </a>
              </div>

              {/* Dynamic Latest Post Card */}
              {latestPost && (
                <div
                  style={{
                    marginTop: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(29, 26, 24, 0.12)',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(110px, 130px) 1fr', gap: '0.75rem' }}>
                    <div style={{ position: 'relative', minHeight: '120px' }}>
                      <img
                        src={resolveMediaUrl(latestPost.media_url)}
                        alt="Última publicación de Covent Garden Bilbao"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '6px',
                          left: '6px',
                          backgroundColor: 'rgba(0, 0, 0, 0.65)',
                          color: '#fff',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '0.6rem',
                          fontFamily: 'var(--font-label)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {postSource === 'meta_api' ? 'ÚLTIMO POST' : 'DESTACADO INSTAGRAM'}
                      </div>
                    </div>

                    <div style={{ padding: '0.75rem 0.75rem 0.75rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--color-text-dark)',
                          lineHeight: '1.45',
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {latestPost.caption || 'Novedades, pintxos recién salidos y previa en Covent Garden Bilbao.'}
                      </p>

                      <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <a
                          href={latestPost.permalink || instagram.profile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                          style={{
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.65rem',
                            color: 'var(--color-oxblood)',
                            borderColor: 'var(--color-oxblood)',
                          }}
                        >
                          <span>Ver en Instagram</span>
                          <span className="material-symbols-outlined" style={{ fontSize: '14px', marginLeft: '4px' }}>
                            open_in_new
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
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
