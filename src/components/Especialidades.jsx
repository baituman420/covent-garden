import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { especialidadesContent } from '../data/siteContent.js';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Especialidades() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.especialidad-card');

      // Desktop parallax & subtle layout shift on scroll
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Subtle staggered entrance and floating scroll dynamics
        cards.forEach((card, index) => {
          const speed = index % 2 === 0 ? 30 : -25;
          gsap.fromTo(
            card,
            { y: speed * 1.5, opacity: 0.85 },
            {
              y: -speed,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom-=50',
                end: 'bottom top+=50',
                scrub: 1,
              },
            }
          );
        });
      });

      mm.add('(max-width: 1023px)', () => {
        // Mobile simple fade-up reveal on scroll
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.3, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom-=60',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="especialidades" ref={sectionRef} className="especialidades-section">
      <div className="container">
        {/* Section Header */}
        <div className="especialidades-header">
          <div className="tag-header" style={{ marginBottom: '0.75rem' }}>
            {especialidadesContent.tag}
          </div>

          <h2 className="title-display" style={{ marginBottom: '0.5rem', color: 'var(--color-cream)' }}>
            {especialidadesContent.title}
          </h2>

          <p className="especialidades-subtitle">
            {especialidadesContent.subtitle}
          </p>

          <p className="body-copy" style={{ maxWidth: '42rem', margin: '0 auto' }}>
            {especialidadesContent.description}
          </p>
        </div>

        {/* Editorial Grid / Vertical Mobile Flow */}
        <div ref={gridRef} className="especialidades-grid">
          {especialidadesContent.items.map((item, index) => {
            const isFeatured = index === 0 || index === 3;
            return (
              <article
                key={item.id}
                className={`especialidad-card ${isFeatured ? 'card-featured' : ''}`}
              >
                {/* Image Container with Editorial Frame */}
                <div className="especialidad-img-wrap">
                  <img
                    src={`${baseUrl}${item.image}`}
                    alt={item.title}
                    loading="lazy"
                    className="especialidad-img"
                  />
                  <div className="especialidad-img-scrim" />
                  <div className="especialidad-badge-overlay">
                    <span className="especialidad-badge">{item.badge}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="especialidad-info">
                  <div className="especialidad-meta">
                    <span className="especialidad-tag">{item.tag}</span>
                  </div>
                  <h3 className="especialidad-title">{item.title}</h3>
                  <p className="especialidad-sub">{item.subtitle}</p>
                  <p className="especialidad-desc">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Local Disclaimer */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
            {especialidadesContent.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
