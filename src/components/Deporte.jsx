import React from 'react';
import { deporteContent } from '../data/siteContent.js';

export default function Deporte() {
  return (
    <section id="deporte" className="section-padding bg-dark-slate">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-oxblood)', animation: 'pulse 2s infinite' }} />
            <span className="section-tag section-tag-gold" style={{ margin: 0 }}>
              {deporteContent.tag}
            </span>
          </div>
          <h2 className="section-heading">{deporteContent.title}</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '36rem' }}>
            {deporteContent.description}
          </p>
        </div>

        {/* Fixture Board */}
        <div className="slate-board">
          {/* Featured Match */}
          <div className="featured-match">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: 'var(--color-oxblood)', display: 'flex', alignItems: 'center', justifyCenter: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--color-text-light)' }}>
                  sports_soccer
                </span>
              </div>
              <div>
                <span className="hero-eyebrow" style={{ margin: 0, padding: '0.15rem 0.5rem' }}>
                  {deporteContent.featuredMatch.badge}
                </span>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.5rem', color: 'var(--color-text-light)', marginTop: '0.25rem' }}>
                  {deporteContent.featuredMatch.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  {deporteContent.featuredMatch.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Events Rows */}
          <div>
            {deporteContent.events.map((event, idx) => (
              <div key={idx} className="event-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-label)', color: 'var(--color-brass)', fontWeight: '700' }}>
                    {event.number}
                  </span>
                  <div>
                    <span className="section-tag section-tag-gold" style={{ fontSize: '0.65rem' }}>
                      {event.category}
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.1rem' }}>
                      {event.title}
                    </h4>
                  </div>
                </div>
                <div>
                  <span className="tag-badge">{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
