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
        <a href={baseUrl} className="brand-link">
          <img
            src={`${baseUrl}${site.logo}`}
            alt={site.name}
            className="brand-logo"
          />
          <span className="brand-name">{site.name.toUpperCase()}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navigation.map((item, idx) => (
            <a
              key={idx}
              href={resolveLink(item)}
              target={item.external ? '_blank' : '_self'}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#como-llegar" className="btn-primary">
            CÓMO LLEGAR
          </a>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú principal"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="mobile-nav">
          {navigation.map((item, idx) => (
            <a
              key={idx}
              href={resolveLink(item)}
              target={item.external ? '_blank' : '_self'}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
