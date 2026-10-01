import React from 'react';
import { site, navigation } from '../data/siteContent.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', paddingBottom: '2rem' }}>
          
          {/* Col 1: About */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-brass)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
              {site.name.toUpperCase()}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              Auténtica taberna victoriana en el corazón de Indautxu. Cervezas de importación, pintxos y deporte en directo.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-brass)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>location_on</span>
              <span>{site.fullAddress}</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-label)', color: 'var(--color-brass)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Navegación
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : '_self'}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
                    onMouseOver={(e) => (e.target.style.color = 'var(--color-brass)')}
                    onMouseOut={(e) => (e.target.style.color = 'var(--color-text-muted)')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Community & Maps */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-label)', color: 'var(--color-brass)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Contacto & Ubicación
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
              {site.metroStation}
            </p>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
            >
              Instagram {site.instagramHandle}
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} {site.name}. Todos los derechos reservados.</div>
          <div>{site.address} · {site.neighborhood}, {site.city}</div>
        </div>
      </div>
    </footer>
  );
}
