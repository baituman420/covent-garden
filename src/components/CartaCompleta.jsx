import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cartaContent, cartelesContent, site } from '../data/siteContent.js';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CartaCompleta() {
  const baseUrl = import.meta.env.BASE_URL;
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const sectionRef = useRef(null);
  const postersRef = useRef(null);
  const posterLeftRef = useRef(null);
  const posterRightRef = useRef(null);

  const categories = [
    { id: 'all', name: 'Toda la Carta' },
    ...cartaContent.categories.map((c) => ({ id: c.id, name: c.name })),
  ];

  const displayedCategories =
    activeCategoryId === 'all'
      ? cartaContent.categories
      : cartaContent.categories.filter((c) => c.id === activeCategoryId);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation for the two standalone posters (no enclosing box)
      if (posterLeftRef.current && posterRightRef.current) {
        gsap.fromTo(
          posterLeftRef.current,
          {
            opacity: 0,
            y: 60,
            rotateZ: -6,
            rotateY: -10,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            rotateZ: -1.5,
            rotateY: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: postersRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          posterRightRef.current,
          {
            opacity: 0,
            y: 60,
            rotateZ: 6,
            rotateY: 10,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            rotateZ: 1.5,
            rotateY: 0,
            scale: 1,
            duration: 1.1,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: postersRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Animate visual reference cards per category when they enter viewport
      const visualStrips = sectionRef.current.querySelectorAll('.category-visual-strip');
      visualStrips.forEach((strip) => {
        const cards = strip.querySelectorAll('.visual-ref-card');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            {
              opacity: 0,
              y: 35,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: strip,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [displayedCategories]);

  // Interactive 3D tilt on mousemove across the posters stage
  const handlePosterMouseMove = (e) => {
    if (!postersRef.current) return;
    const rect = postersRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (posterLeftRef.current) {
      gsap.to(posterLeftRef.current, {
        rotateY: x * 10 - 1.5,
        rotateX: -y * 8,
        y: -y * 6,
        duration: 0.35,
        ease: 'power1.out',
      });
    }
    if (posterRightRef.current) {
      gsap.to(posterRightRef.current, {
        rotateY: x * 10 + 1.5,
        rotateX: -y * 8,
        y: -y * 6,
        duration: 0.35,
        ease: 'power1.out',
      });
    }
  };

  const handlePosterMouseLeave = () => {
    if (posterLeftRef.current) {
      gsap.to(posterLeftRef.current, {
        rotateY: 0,
        rotateX: 0,
        rotateZ: -1.5,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    }
    if (posterRightRef.current) {
      gsap.to(posterRightRef.current, {
        rotateY: 0,
        rotateX: 0,
        rotateZ: 1.5,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section id="carta" ref={sectionRef} className="carta-section section-padding">
      <div className="container">
        {/* Cabecera de la Sección Gastronómica */}
        <div className="carta-header">
          <div className="tag-header" style={{ marginBottom: '0.75rem' }}>
            {cartaContent.tag}
          </div>

          <h2 className="title-display" style={{ color: 'var(--color-cream)', marginBottom: '0.75rem' }}>
            {cartaContent.title}
          </h2>

          <p className="carta-subtitle">
            {cartaContent.subtitle}
          </p>

          <p className="body-copy" style={{ maxWidth: '44rem', margin: '0 auto 2rem auto', color: 'var(--color-text-muted)' }}>
            {cartaContent.description}
          </p>

          {/* Banner de Garantía Menú Completo */}
          <div className="carta-menu-notice">
            <div className="notice-icon-box">
              <span className="material-symbols-outlined">restaurant_menu</span>
            </div>
            <div className="notice-content">
              <span className="notice-title">FÓRMULA MENÚ COMPLETO</span>
              <p className="notice-desc">
                {cartaContent.menuIncludesNotice}
              </p>
            </div>
          </div>
        </div>

        {/* Bloque Destacado de los Carteles del Dueño: SIN CUADRO, PUROS CARTELES CON EFECTO GSAP */}
        <div className="carteles-standalone-section">
          <div className="carteles-standalone-header">
            <span className="section-tag section-tag-gold">TRADICIÓN EN LA BARRA DE INDAUTXU</span>
            <h3 className="carteles-title">Rabas de Bilbao & Marianitos Preparados</h3>
            <p className="carteles-desc">
              El ritual bilbaíno de siempre: <strong>Marianito preparado</strong> con fórmula de solera de la casa, naranja fresca y aceituna noble; acompañado de nuestras <strong>rabas crujientes doradas al momento</strong> con limón recién cortado y salsa artesanal.
            </p>
          </div>

          <div
            ref={postersRef}
            className="carteles-showcase-stage"
            onMouseMove={handlePosterMouseMove}
            onMouseLeave={handlePosterMouseLeave}
          >
            {/* Cartel 1: Rabas & Marianitos */}
            <div ref={posterLeftRef} className="cartel-item-card cartel-left">
              <div className="cartel-stud" />
              <div className="cartel-frame">
                <img
                  src={`${baseUrl}${cartelesContent.rabasMarianitos.src}`}
                  alt={cartelesContent.rabasMarianitos.alt}
                  className="cartel-img"
                  loading="lazy"
                />
                <div className="cartel-reflection" />
              </div>
              <div className="cartel-meta">
                <span className="cartel-badge">Cartel de la Taberna</span>
                <span className="cartel-legend">Rabas Crujientes & Marianitos de la Casa</span>
              </div>
            </div>

            {/* Cartel 2: Marianitos Preparados */}
            <div ref={posterRightRef} className="cartel-item-card cartel-right">
              <div className="cartel-stud" />
              <div className="cartel-frame">
                <img
                  src={`${baseUrl}${cartelesContent.marianitosPreparados.src}`}
                  alt={cartelesContent.marianitosPreparados.alt}
                  className="cartel-img"
                  loading="lazy"
                />
                <div className="cartel-reflection" />
              </div>
              <div className="cartel-meta">
                <span className="cartel-badge">Edición Vintage</span>
                <span className="cartel-legend">Vermut Preparado al Instante</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Filtros / Pestañas de la Carta */}
        <div className="carta-tabs-container">
          <div className="carta-tabs-scroll" role="tablist" aria-label="Categorías de la carta">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategoryId === cat.id}
                className={`carta-tab-btn ${activeCategoryId === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategoryId(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido de la Carta por Categorías */}
        <div className="carta-categories-flow">
          {displayedCategories.map((category) => (
            <div key={category.id} className="carta-category-block">
              {/* Encabezado de la Categoría */}
              <div className="category-header">
                <div className="category-title-wrap">
                  <span className="category-badge">{category.badge}</span>
                  <h3 className="category-title">{category.name}</h3>
                </div>
                {category.shortDesc && (
                  <p className="category-desc">{category.shortDesc}</p>
                )}
                {category.note && (
                  <div className="category-note">
                    <span className="material-symbols-outlined">info</span>
                    <span>{category.note}</span>
                  </div>
                )}
              </div>

              {/* Referencias Visuales de la Categoría (Galería destacada sin mezclar con los platos) */}
              {category.visualReferences && category.visualReferences.length > 0 && (
                <div className="category-visual-strip">
                  <div className="visual-strip-header">
                    <span className="visual-strip-label">
                      <span className="material-symbols-outlined">photo_camera</span>
                      <span>REFERENCIAS VISUALES · {category.name.toUpperCase()}</span>
                    </span>
                    <span className="visual-strip-hint">Fotografías reales tomadas en Covent Garden</span>
                  </div>

                  <div className="visual-strip-grid">
                    {category.visualReferences.map((refItem, refIdx) => (
                      <div key={refIdx} className="visual-ref-card">
                        <div className="visual-ref-img-wrap">
                          <img
                            src={`${baseUrl}${refItem.src}`}
                            alt={refItem.title}
                            loading="lazy"
                            className="visual-ref-img"
                          />
                          <span className="visual-ref-badge">{refItem.badge}</span>
                          <div className="visual-ref-overlay" />
                        </div>
                        <div className="visual-ref-caption">
                          <h4 className="visual-ref-title">{refItem.title}</h4>
                          <p className="visual-ref-desc">{refItem.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rejilla de Platos de la Categoría (Estrictamente SIN PRECIOS y SIN IMÁGENES DENTRO DEL PLATO) */}
              <div className="carta-items-grid">
                {category.items.map((item, idx) => (
                  <article key={idx} className="carta-item-card typography-card">
                    <div className="carta-item-content">
                      <div className="carta-item-header">
                        <h4 className="carta-item-title">
                          <span className="dish-bullet" />
                          <span>{item.name}</span>
                        </h4>
                      </div>

                      <p className="carta-item-desc">{item.desc}</p>

                      {item.tags && item.tags.length > 0 && (
                        <div className="carta-item-tags">
                          {item.tags.map((t, tIdx) => (
                            <span key={tIdx} className="carta-tag-pill">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer y Llamada de la Carta */}
        <div className="carta-footer-box">
          <div className="footer-box-content">
            <span className="footer-tag">REPOSTERÍA ARTESANAL & ALÉRGENOS</span>
            <h4 className="footer-title">Tartas Caseras y Opciones para Todos</h4>
            <p className="footer-desc">
              Todas nuestras tartas se hornean en Covent Garden bajo la firma <strong>@lastartasdelcovent</strong>. Si tienes alguna intolerancia alimentaria, consúltanos: adaptamos panes y platos con opciones sin gluten y sugerencias a tu medida.
            </p>
          </div>
          <div className="footer-box-action">
            <a
              href={site.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '0.875rem 1.75rem', fontSize: '0.8rem' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px', marginRight: '0.4rem' }}>
                location_on
              </span>
              <span>Visítanos en Doctor Areilza 28</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
