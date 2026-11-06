import React, { useState } from 'react';
import { site, navigation } from '../data/siteContent.js';

export default function Header({ isSubpage = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  const resolveLink = (item) => {
    if (item.external) return item.href;
    if (item.page) return `${baseUrl}${item.href}`;
    if (item.href.startsWith('#')) {
      return isSubpage ? `${baseUrl}${item.href}` : item.href;
    }
    return `${baseUrl}${item.href}`;
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        
        {/* Brand Logo & Name */}
        <a href={baseUrl} className="brand-link" aria-label="Covent Garden Bilbao - Volver al inicio">
          <img
            src={`${baseUrl}${site.logo}`}
            alt=""
            aria-hidden="true"
            className="brand-logo"
          />
          <span className="brand-name">
            <span className="brand-name-main">COVENT GARDEN</span>
            <span className="brand-name-sub"> BILBAO</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item, idx) => (
            <a
              key={idx}
              href={item.isNavidad ? '#menus-navidad' : resolveLink(item)}
              onClick={item.isNavidad ? (e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-navidad-modal'));
              } : undefined}
              target={item.external ? '_blank' : '_self'}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={`nav-link ${item.isNavidad ? 'nav-link-navidad' : ''}`}
            >
              {item.isNavidad && <span className="nav-navidad-icon">🎄</span>}
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="header-actions">
          <a href={isSubpage ? `${baseUrl}#como-llegar` : '#como-llegar'} className="btn-primary header-cta-btn">
            CÓMO LLEGAR
          </a>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú principal'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }} aria-hidden="true">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Navegación móvil">
          {navigation.map((item, idx) => (
            <a
              key={idx}
              href={item.isNavidad ? '#menus-navidad' : resolveLink(item)}
              target={item.external ? '_blank' : '_self'}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={`mobile-nav-link ${item.isNavidad ? 'mobile-nav-navidad-highlight' : ''}`}
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (item.isNavidad) {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('open-navidad-modal'));
                }
              }}
            >
              {item.isNavidad ? (
                <>
                  <span>🎄 Menús Navidad & Katxopo</span>
                  <span className="mobile-nav-price-tag">Desde 22€ ➔</span>
                </>
              ) : (
                item.label
              )}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
