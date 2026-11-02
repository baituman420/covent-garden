import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  raciones: 'Raciones crujientes, tablas ibéricas y aperitivos para compartir',
  burguers: 'Hamburguesas artesanas y smash con patatas y bebida incluida',
  pizzas: 'Pizzas al horno sobre tabla noble de madera con bebida incluida',
  platos: 'Platos combinados abundantes y recetas caseras de la casa',
  'bocatas-sandwiches': 'Sándwiches y bocadillos rústicos con patatas y bebida',
  ensaladas: 'Ensaladas frescas y templadas de la huerta con pan y bebida',
  postres: 'Tartas caseras diarias @lastartasdelcovent y repostería artesana',
};

export default function CartaCompleta() {
  const baseUrl = import.meta.env.BASE_URL;
  const categories = cartaContent.categories;

  // Estado del carrusel de categorías (0 a categories.length - 1)
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1); // 1 = adelante, -1 = atrás
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' o 'grid'
  const [activeDishIndex, setActiveDishIndex] = useState(0);

  // Referencias para animaciones GSAP y DOM
  const sectionRef = useRef(null);
  const carouselStageRef = useRef(null);
  const slideRef = useRef(null);
  const dishesTrackRef = useRef(null);
  const tabsBarRef = useRef(null);
  const postersRef = useRef(null);
  const posterLeftRef = useRef(null);
  const posterRightRef = useRef(null);

  // Referencias para detección de gestos táctiles (Swipe)
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);

  const activeCategory = categories[activeCatIndex] || categories[0];

  // Cambiar de categoría con dirección para GSAP
  const goToCategory = useCallback((index, dir = null) => {
    if (index < 0) {
      index = categories.length - 1;
    } else if (index >= categories.length) {
      index = 0;
    }

    const calculatedDir = dir !== null ? dir : index > activeCatIndex ? 1 : -1;
    setSlideDirection(calculatedDir);
    setActiveCatIndex(index);
    setActiveDishIndex(0);

    // Centrar suavemente la pestaña activa en la barra horizontal
    if (tabsBarRef.current) {
      const activeTabBtn = tabsBarRef.current.children[index];
      if (activeTabBtn) {
        activeTabBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }

    // Resetear el scroll del carrusel de platos al cambiar de categoría
    if (dishesTrackRef.current) {
      dishesTrackRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  }, [activeCatIndex, categories.length]);

  const handlePrevCategory = () => goToCategory(activeCatIndex - 1, -1);
  const handleNextCategory = () => goToCategory(activeCatIndex + 1, 1);

  // Desplazamiento horizontal del carrusel de platos
  const scrollDishes = (direction) => {
    if (!dishesTrackRef.current) return;
    const cardWidth = dishesTrackRef.current.querySelector('.dish-carousel-card')?.offsetWidth || 300;
    const scrollAmount = cardWidth + 16;
    dishesTrackRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  };

  // Monitorear posición del scroll en el carrusel de platos para dots/indicadores
  const handleDishesScroll = () => {
    if (!dishesTrackRef.current) return;
    const { scrollLeft } = dishesTrackRef.current;
    const cardWidth = (dishesTrackRef.current.querySelector('.dish-carousel-card')?.offsetWidth || 300) + 16;
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx !== activeDishIndex && newIdx >= 0 && newIdx < activeCategory.items.length) {
      setActiveDishIndex(newIdx);
    }
  };

  // Gestos táctiles en el escenario de la carta (aislado del carrusel hijo de platos)
  const handleTouchStart = (e) => {
    // Si el toque se inicia dentro del carrusel de platos, fotos de referencia o controles interactivos, NO activar el cambio de categoría
    if (
      e.target.closest('.dish-carousel-wrapper') ||
      e.target.closest('.dish-carousel-track') ||
      e.target.closest('.slide-visual-references-strip') ||
      e.target.closest('.view-mode-toggle') ||
      e.target.closest('button') ||
      e.target.closest('a')
    ) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    touchEndX.current = e.changedTouches[0].clientX;
    const diffX = touchEndX.current - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    // Solo considerar swipe de categoría si el desplazamiento horizontal es significativo y claramente horizontal
    if (Math.abs(diffX) > 70 && Math.abs(diffX) > Math.abs(diffY) * 1.8) {
      if (diffX > 0) {
        handlePrevCategory();
      } else {
        handleNextCategory();
      }
    }
  };

  // Transición animada GSAP al cambiar de categoría
  useEffect(() => {
    if (!slideRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        slideRef.current,
        {
          opacity: 0,
          x: slideDirection * 35,
          scale: 0.985,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
          clearProps: 'transform',
        }
      );

      const cards = slideRef.current.querySelectorAll('.dish-carousel-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.035,
            duration: 0.35,
            ease: 'power1.out',
            clearProps: 'all',
          }
        );
      }
    }, carouselStageRef);

    return () => ctx.revert();
  }, [activeCatIndex, slideDirection, viewMode]);

  // Soporte de navegación por teclado (Flechas izquierda / derecha)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!carouselStageRef.current) return;
      const rect = carouselStageRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        handlePrevCategory();
      } else if (e.key === 'ArrowRight') {
        handleNextCategory();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCatIndex, handleNextCategory, handlePrevCategory]);

  // Efecto GSAP para carteles vintage del dueño
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (posterLeftRef.current && posterRightRef.current && postersRef.current) {
        gsap.fromTo(
          posterLeftRef.current,
          { opacity: 0, y: 40, rotateZ: -4, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            rotateZ: -1.5,
            scale: 1,
            duration: 1,
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
          { opacity: 0, y: 40, rotateZ: 4, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            rotateZ: 1.5,
            scale: 1,
            duration: 1,
            delay: 0.1,
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

  const handlePosterMouseMove = (e) => {
    if (!postersRef.current) return;
    const rect = postersRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (posterLeftRef.current) {
      gsap.to(posterLeftRef.current, {
        rotateY: x * 10 - 1.5,
        rotateX: -y * 8,
        y: -y * 5,
        duration: 0.35,
        ease: 'power1.out',
      });
    }
    if (posterRightRef.current) {
      gsap.to(posterRightRef.current, {
        rotateY: x * 10 + 1.5,
        rotateX: -y * 8,
        y: -y * 5,
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
        duration: 0.6,
        ease: 'power2.out',
      });
    }
    if (posterRightRef.current) {
      gsap.to(posterRightRef.current, {
        rotateY: 0,
        rotateX: 0,
        rotateZ: 1.5,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section id="carta" ref={sectionRef} className="carta-section section-padding">
      <div className="container">
        {/* Cabecera de la Sección Gastronómica */}
        <div className="carta-header">
          <div className="tag-header" style={{ marginBottom: '0.65rem' }}>
            {cartaContent.tag}
          </div>

          <h2 className="title-display" style={{ color: 'var(--color-cream)', marginBottom: '0.65rem' }}>
            {cartaContent.title}
          </h2>

          <p className="carta-subtitle">
            {cartaContent.subtitle}
          </p>

          <p className="body-copy" style={{ maxWidth: '44rem', margin: '0 auto 1.5rem auto', color: 'var(--color-text-muted)' }}>
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

          {/* Banner Especial de Menús de Navidad y Katxopo */}
          <button
            type="button"
            className="carta-navidad-callout-btn"
            onClick={() => window.dispatchEvent(new CustomEvent('open-navidad-modal'))}
          >
            <span className="navidad-callout-spark">🎄 TEMPORADA</span>
            <span className="navidad-callout-text">¿Buscas los Menús Especiales de Navidad & Katxopo Gigante?</span>
            <span className="navidad-callout-action">Consultar Menús y Precios ➔</span>
          </button>
        </div>

        {/* Bloque Destacado de los Carteles del Dueño */}
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

        {/* =========================================================================
            CARRUSEL GASTRONÓMICO PRINCIPAL (REDUCCIÓN VERTICAL & EXPERIENCIA DINÁMICA)
           ========================================================================= */}
        <div className="carta-carousel-section" ref={carouselStageRef}>
          {/* BARRA DE NAVEGACIÓN Y SELECTOR DE CATEGORÍAS */}
          <div className="carousel-nav-control-bar">
            <div className="carousel-control-header">
              <div className="carousel-progress-tag">
                <span className="material-symbols-outlined nav-symbol">restaurant</span>
                <span className="progress-number">
                  CATEGORÍA <strong>{String(activeCatIndex + 1).padStart(2, '0')}</strong> / {String(categories.length).padStart(2, '0')}
                </span>
                <span className="progress-divider">·</span>
                <span className="progress-current-name">{activeCategory.name}</span>
              </div>

              <div className="carousel-arrows-cluster">
                <button
                  type="button"
                  className="carousel-arrow-btn"
                  onClick={handlePrevCategory}
                  title="Categoría anterior (o usa flecha izquierda)"
                  aria-label="Categoría anterior"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                  <span className="arrow-btn-text">Anterior</span>
                </button>

                <button
                  type="button"
                  className="carousel-arrow-btn"
                  onClick={handleNextCategory}
                  title="Categoría siguiente (o usa flecha derecha)"
                  aria-label="Categoría siguiente"
                >
                  <span className="arrow-btn-text">Siguiente</span>
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Píldoras horizontales de salto directo a cada categoría */}
            <div
              className="carousel-category-tabs-track"
              ref={tabsBarRef}
              role="tablist"
              aria-label="Selector de categorías de la carta"
            >
              {categories.map((cat, idx) => {
                const isActive = idx === activeCatIndex;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`carousel-tab-pill ${isActive ? 'is-active' : ''}`}
                    onClick={() => goToCategory(idx)}
                  >
                    <span className="material-symbols-outlined tab-icon">
                      {categoryIcons[cat.id] || 'restaurant'}
                    </span>
                    <span className="tab-name">{cat.name}</span>
                    <span className="tab-count">{cat.items.length}</span>
                    {isActive && <span className="tab-active-glow" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ESCENARIO DEL SLIDE ACTIVO (UNA SOLA CATEGORÍA A LA VEZ) */}
          <div
            className="carousel-slide-stage"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div ref={slideRef} className="carousel-slide-content">
              {/* Encabezado de la Categoría Activa */}
              <div className="slide-category-header">
                <div className="slide-category-title-row">
                  <div className="slide-seal-wrap">
                    <span className="material-symbols-outlined slide-seal-icon">
                      {categoryIcons[activeCategory.id] || 'restaurant'}
                    </span>
                  </div>

                  <div className="slide-title-meta">
                    <div className="slide-badges-wrap">
                      <span className="slide-badge">{activeCategory.badge}</span>
                      <span className="slide-dish-count">{activeCategory.items.length} platos disponibles</span>
                    </div>
                    <h3 className="slide-category-name">{activeCategory.name}</h3>
                    <p className="slide-category-desc">
                      {categorySummaries[activeCategory.id] || activeCategory.shortDesc}
                    </p>
                  </div>
                </div>

                {activeCategory.note && (
                  <div className="slide-category-note">
                    <span className="material-symbols-outlined note-icon">check_circle</span>
                    <span>{activeCategory.note}</span>
                  </div>
                )}
              </div>

              {/* Tira Visual Compacta de Referencias Fotográficas Reales */}
              {activeCategory.visualReferences && activeCategory.visualReferences.length > 0 && (
                <div
                  className="slide-visual-references-strip"
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                >
                  <div className="visual-strip-compact-header">
                    <span className="visual-strip-label">
                      <span className="material-symbols-outlined">photo_camera</span>
                      <span>FOTOGRAFÍAS REALES EN COVENT GARDEN</span>
                    </span>
                    <span className="visual-strip-hint">Elaborado al momento en Indautxu</span>
                  </div>

                  <div className="visual-compact-grid">
                    {activeCategory.visualReferences.map((refItem, refIdx) => (
                      <div key={refIdx} className="visual-compact-card">
                        <div className="visual-compact-img-wrap">
                          <img
                            src={`${baseUrl}${refItem.src}`}
                            alt={refItem.title}
                            loading="lazy"
                            className="visual-compact-img"
                          />
                          <span className="visual-compact-badge">{refItem.badge}</span>
                          <div className="visual-compact-gradient" />
                        </div>
                        <div className="visual-compact-caption">
                          <h4 className="visual-compact-title">{refItem.title}</h4>
                          <p className="visual-compact-desc">{refItem.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ENCABEZADO DE PLATOS CON SELECTOR DE MODO (CARRUSEL / CUADRÍCULA) */}
              <div className="slide-dishes-toolbar">
                <div className="toolbar-left">
                  <span className="dishes-section-label">
                    <span className="dish-bullet" />
                    <span>PLATOS DE LA CATEGORÍA</span>
                  </span>
                  <span className="dishes-swipe-hint">
                    {viewMode === 'carousel' ? '↔ Desliza horizontalmente para ver todos los platos' : 'Mostrando lista completa'}
                  </span>
                </div>

                <div className="toolbar-actions">
                  <div className="view-mode-toggle">
                    <button
                      type="button"
                      className={`mode-btn ${viewMode === 'carousel' ? 'is-active' : ''}`}
                      onClick={() => setViewMode('carousel')}
                      title="Ver en carrusel horizontal compacto"
                    >
                      <span className="material-symbols-outlined">view_carousel</span>
                      <span className="mode-label">Carrusel</span>
                    </button>
                    <button
                      type="button"
                      className={`mode-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      title="Ver todos los platos en cuadrícula"
                    >
                      <span className="material-symbols-outlined">grid_view</span>
                      <span className="mode-label">Cuadrícula</span>
                    </button>
                  </div>

                  {viewMode === 'carousel' && (
                    <div className="dish-carousel-arrows">
                      <button
                        type="button"
                        className="dish-arrow-btn"
                        onClick={() => scrollDishes(-1)}
                        title="Platos anteriores"
                        aria-label="Platos anteriores"
                      >
                        <span className="material-symbols-outlined">arrow_back</span>
                      </button>
                      <button
                        type="button"
                        className="dish-arrow-btn"
                        onClick={() => scrollDishes(1)}
                        title="Platos siguientes"
                        aria-label="Platos siguientes"
                      >
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* CONTENEDOR DE PLATOS: CARRUSEL HORIZONTAL O CUADRÍCULA */}
              {viewMode === 'carousel' ? (
                <div
                  className="dish-carousel-wrapper"
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                >
                  <div
                    ref={dishesTrackRef}
                    className="dish-carousel-track"
                    onScroll={handleDishesScroll}
                  >
                    {activeCategory.items.map((item, idx) => (
                      <article key={idx} className="dish-carousel-card typography-card">
                        <div className="dish-card-top">
                          <span className="dish-index-badge">#{idx + 1}</span>
                          <h4 className="dish-card-title">{item.name}</h4>
                        </div>

                        <p className="dish-card-desc">{item.desc}</p>

                        {item.tags && item.tags.length > 0 && (
                          <div className="dish-card-tags">
                            {item.tags.map((t, tIdx) => (
                              <span key={tIdx} className="carta-tag-pill">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>

                  <div className="dish-carousel-pagination">
                    <span className="pagination-text">
                      Plato <strong>{activeDishIndex + 1}</strong> de <strong>{activeCategory.items.length}</strong>
                    </span>
                    <div className="pagination-dots">
                      {activeCategory.items.map((_, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          className={`pagination-dot ${pIdx === activeDishIndex ? 'is-active' : ''}`}
                          onClick={() => {
                            if (dishesTrackRef.current) {
                              const cardWidth = (dishesTrackRef.current.querySelector('.dish-carousel-card')?.offsetWidth || 300) + 16;
                              dishesTrackRef.current.scrollTo({
                                left: pIdx * cardWidth,
                                behavior: 'smooth',
                              });
                            }
                          }}
                          aria-label={`Ir al plato ${pIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="carta-items-grid">
                  {activeCategory.items.map((item, idx) => (
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
              )}

              {/* PIE DEL SLIDE: SALTO A CATEGORÍA ANTERIOR / SIGUIENTE */}
              <div className="slide-footer-nav">
                <button
                  type="button"
                  className="slide-footer-nav-btn prev-btn"
                  onClick={handlePrevCategory}
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  <span>
                    Anterior: <strong>{categories[(activeCatIndex - 1 + categories.length) % categories.length].name}</strong>
                  </span>
                </button>

                <div className="slide-footer-dots">
                  {categories.map((c, dIdx) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`category-indicator-pill ${dIdx === activeCatIndex ? 'active' : ''}`}
                      onClick={() => goToCategory(dIdx)}
                      title={`Ir a ${c.name}`}
                    >
                      {dIdx + 1}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="slide-footer-nav-btn next-btn"
                  onClick={handleNextCategory}
                >
                  <span>
                    Siguiente: <strong>{categories[(activeCatIndex + 1) % categories.length].name}</strong>
                  </span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
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
