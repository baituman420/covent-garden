import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cartaContent, cartelesContent, site } from '../data/siteContent.js';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Iconografía tabernera para cada categoría
const categoryIcons = {
  raciones: 'tapas',
  burguers: 'lunch_dining',
  pizzas: 'local_pizza',
  platos: 'restaurant',
  'bocatas-sandwiches': 'bakery_dining',
  ensaladas: 'spa',
  postres: 'cake',
};

// Resúmenes rápidos de oferta por categoría
const categorySummaries = {
  raciones: '10 raciones crujientes y tablas ibéricas para compartir',
  burguers: '10 hamburguesas artesanas y smash con patatas y bebida',
  pizzas: '10 pizzas al horno servidas sobre tabla noble de madera',
  platos: '10 platos combinados abundantes con receta de la casa',
  'bocatas-sandwiches': '12 sándwiches y bocadillos rústicos con bebida y patatas',
  ensaladas: '7 ensaladas templadas y frescas con pan y bebida',
  postres: 'Tartas caseras diarias @lastartasdelcovent y cafés especiales',
};

export default function CartaCompleta() {
  const baseUrl = import.meta.env.BASE_URL;
  
  // Estado de secciones desplegadas (por defecto abrimos 'burguers' como escaparate de bienvenida)
  const [openSections, setOpenSections] = useState({
    burguers: true,
  });
  const [activeFocusedCat, setActiveFocusedCat] = useState('burguers');

  const sectionRef = useRef(null);
  const chapterRefs = useRef({});
  const postersRef = useRef(null);
  const posterLeftRef = useRef(null);
  const posterRightRef = useRef(null);

  const categories = cartaContent.categories;

  // Toggle individual de una sección
  const toggleSection = (catId) => {
    setOpenSections((prev) => {
      const isCurrentlyOpen = !!prev[catId];
      const nextState = { ...prev, [catId]: !isCurrentlyOpen };
      return nextState;
    });
    setActiveFocusedCat(catId);
  };

  // Selección directa desde la botonera superior o pie de sección
  const selectAndScrollToCategory = (catId) => {
    setOpenSections((prev) => ({
      ...prev,
      [catId]: true,
    }));
    setActiveFocusedCat(catId);

    // Desplazamiento suave con compensación por cabecera fija
    setTimeout(() => {
      const targetEl = chapterRefs.current[catId];
      if (targetEl) {
        const headerOffset = 95;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 60);
  };

  // Desplegar todas las secciones a la vez
  const handleExpandAll = () => {
    const allOpen = {};
    categories.forEach((cat) => {
      allOpen[cat.id] = true;
    });
    setOpenSections(allOpen);
  };

  // Plegar todas las secciones
  const handleCollapseAll = () => {
    setOpenSections({});
  };

  // Efecto GSAP para carteles y referencias
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrada de carteles vintage del dueño
      if (posterLeftRef.current && posterRightRef.current && postersRef.current) {
        gsap.fromTo(
          posterLeftRef.current,
          { opacity: 0, y: 50, rotateZ: -5, rotateY: -8, scale: 0.94 },
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
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          posterRightRef.current,
          { opacity: 0, y: 50, rotateZ: 5, rotateY: 8, scale: 0.94 },
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
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Interacción 3D suave al mover el ratón sobre los carteles
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

  // Contar cuántas secciones están abiertas actualmente
  const totalOpenCount = Object.values(openSections).filter(Boolean).length;

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

          <p className="body-copy" style={{ maxWidth: '44rem', margin: '0 auto 1.75rem auto', color: 'var(--color-text-muted)' }}>
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

        {/* CINTA RÁPIDA / SELECTOR FIJO DE SECCIONES (Permite seleccionar cualquier sección una vez desplegado) */}
        <div className="carta-quick-ribbon-container">
          <div className="carta-quick-ribbon">
            <div className="ribbon-label-box">
              <span className="material-symbols-outlined ribbon-icon">menu_book</span>
              <span className="ribbon-text">SECCIONES:</span>
            </div>

            <div className="ribbon-pills-scroll" role="tablist" aria-label="Navegación rápida de secciones">
              {categories.map((cat) => {
                const isOpen = !!openSections[cat.id];
                const isFocused = activeFocusedCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isFocused}
                    className={`ribbon-tab-btn ${isOpen ? 'is-open' : ''} ${isFocused ? 'is-focused' : ''}`}
                    onClick={() => selectAndScrollToCategory(cat.id)}
                    title={`Ver sección ${cat.name}`}
                  >
                    <span className="material-symbols-outlined tab-icon">
                      {categoryIcons[cat.id] || 'restaurant'}
                    </span>
                    <span className="tab-label">{cat.name}</span>
                    {isOpen && <span className="open-dot" title="Sección desplegada" />}
                  </button>
                );
              })}
            </div>

            {/* Acciones globales de despliegue */}
            <div className="ribbon-actions">
              {totalOpenCount < categories.length ? (
                <button
                  type="button"
                  onClick={handleExpandAll}
                  className="ribbon-action-btn"
                  title="Abrir todas las secciones"
                >
                  <span className="material-symbols-outlined">unfold_more</span>
                  <span className="action-label">Desplegar Todo</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCollapseAll}
                  className="ribbon-action-btn"
                  title="Plegar todas las secciones"
                >
                  <span className="material-symbols-outlined">unfold_less</span>
                  <span className="action-label">Plegar Todo</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* LISTADO DE SECCIONES DESPLEGABLES CON EFECTO ORIGINAL */}
        <div className="carta-accordion-stack">
          {categories.map((category, catIndex) => {
            const isOpen = !!openSections[category.id];
            const prevCategory = catIndex > 0 ? categories[catIndex - 1] : null;
            const nextCategory = catIndex < categories.length - 1 ? categories[catIndex + 1] : null;

            return (
              <div
                key={category.id}
                ref={(el) => (chapterRefs.current[category.id] = el)}
                className={`carta-deployable-chapter ${isOpen ? 'is-expanded' : 'is-collapsed'}`}
              >
                {/* Cabecera / Plegador Interactivo de la Sección */}
                <button
                  type="button"
                  onClick={() => toggleSection(category.id)}
                  className="chapter-header-bar"
                  aria-expanded={isOpen}
                  aria-controls={`chapter-content-${category.id}`}
                >
                  <div className="chapter-header-left">
                    <div className="chapter-seal-wrap">
                      <span className="material-symbols-outlined chapter-seal-icon">
                        {categoryIcons[category.id] || 'restaurant'}
                      </span>
                    </div>

                    <div className="chapter-meta">
                      <div className="chapter-badge-line">
                        <span className="chapter-badge">{category.badge}</span>
                        <span className="chapter-dishes-count">
                          {category.items.length} platos
                        </span>
                      </div>
                      <h3 className="chapter-title">{category.name}</h3>
                      <p className="chapter-summary">
                        {categorySummaries[category.id] || category.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Botón de estado de despliegue */}
                  <div className="chapter-header-right">
                    <div className={`chapter-toggle-pill ${isOpen ? 'active-pill' : ''}`}>
                      <span className="toggle-text">
                        {isOpen ? 'Plegar Carta' : 'Desplegar Sección'}
                      </span>
                      <span className={`material-symbols-outlined toggle-chevron ${isOpen ? 'chevron-up' : ''}`}>
                        expand_more
                      </span>
                    </div>
                  </div>
                </button>

                {/* Contenedor con Despliegue Suave y Efecto Folio Tabernero */}
                <div
                  id={`chapter-content-${category.id}`}
                  className={`chapter-unfold-wrapper ${isOpen ? 'is-open' : ''}`}
                >
                  <div className="chapter-unfold-inner">
                    {/* Línea dorada de brillo al desplegar */}
                    <div className="unfold-shimmer-sweep" />

                    {/* Descripción y notas */}
                    <div className="chapter-intro-block">
                      {category.shortDesc && (
                        <p className="chapter-expanded-desc">{category.shortDesc}</p>
                      )}
                      {category.note && (
                        <div className="category-note">
                          <span className="material-symbols-outlined">info</span>
                          <span>{category.note}</span>
                        </div>
                      )}
                    </div>

                    {/* Referencias Visuales de la Sección (Galería Deal-In) */}
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

                    {/* Navegación rápida al final de la sección desplegada para cambiar de categoría sin fricción */}
                    <div className="chapter-bottom-nav">
                      <div className="chapter-bottom-nav-inner">
                        {prevCategory ? (
                          <button
                            type="button"
                            onClick={() => selectAndScrollToCategory(prevCategory.id)}
                            className="chapter-nav-btn prev-btn"
                          >
                            <span className="material-symbols-outlined">arrow_back</span>
                            <span>Anterior: <strong>{prevCategory.name}</strong></span>
                          </button>
                        ) : (
                          <div />
                        )}

                        <div className="chapter-bottom-selector">
                          <span className="selector-title">Cambiar de sección:</span>
                          <div className="selector-pills">
                            {categories.map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                className={`selector-mini-pill ${c.id === category.id ? 'current' : ''}`}
                                onClick={() => selectAndScrollToCategory(c.id)}
                              >
                                {c.name.split(' ')[0]}
                              </button>
                            ))}
                          </div>
                        </div>

                        {nextCategory ? (
                          <button
                            type="button"
                            onClick={() => selectAndScrollToCategory(nextCategory.id)}
                            className="chapter-nav-btn next-btn"
                          >
                            <span>Siguiente: <strong>{nextCategory.name}</strong></span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => selectAndScrollToCategory(categories[0].id)}
                            className="chapter-nav-btn restart-btn"
                          >
                            <span>Volver a: <strong>{categories[0].name}</strong></span>
                            <span className="material-symbols-outlined">arrow_upward</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
