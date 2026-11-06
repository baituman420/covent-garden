import React, { useState, useEffect, useRef, useCallback } from 'react';
import { barraPintxosContent } from '../data/siteContent.js';
import { useDynamicMedia, resolveSingleImage } from '../data/mediaBridge.js';

export default function BarraPintxos() {
  const baseUrl = import.meta.env.BASE_URL;
  const media = useDynamicMedia();

  // Resolver imagen de fondo de la barra de forma dinámica
  const bgImgSrc = resolveSingleImage(
    media,
    barraPintxosContent.backgroundImage.key,
    barraPintxosContent.backgroundImage.src
  );

  const items = barraPintxosContent.items;
  const total = items.length;

  // Estado del carrusel: índice activo y progreso continuo de desplazamiento
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Referencias para animación e interacción física
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafIdRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startProgressRef = useRef(0);
  const dragDirectionRef = useRef(null); // 'horizontal' | 'vertical' | null
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);

  // Detectar preferencia de movimiento reducido
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Función de lerp y actualización visual de cada tarjeta en 3D
  const updateCardsTransform = useCallback(() => {
    if (!trackRef.current || prefersReducedMotion) return;

    const cards = trackRef.current.children;
    const currentProgress = progressRef.current;
    const isMobile = window.innerWidth < 768;

    // Constantes de espaciado y curvatura cilíndrica
    const spacing = isMobile ? 220 : 280;
    const maxRotate = isMobile ? 18 : 22;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const offset = i - currentProgress;
      const absOffset = Math.abs(offset);

      // Posicionamiento horizontal en el arco
      const x = offset * spacing;

      // Profundidad tridimensional (Z negativo para las laterales)
      const z = -Math.min(absOffset * 85 + Math.pow(absOffset, 2) * 15, 300);

      // Rotación angular sobre el eje vertical
      const rotateY = Math.max(-maxRotate, Math.min(maxRotate, offset * -maxRotate));

      // Escala gradual
      const scale = Math.max(0.72, 1 - Math.min(absOffset * 0.12, 0.28));

      // Atenuación de opacidad y desenfoque suave de profundidad de campo
      const opacity = Math.max(0.4, 1 - Math.min(absOffset * 0.22, 0.6));
      const blur = Math.min(absOffset * 1.5, 4);

      // Z-Index para solapamiento correcto
      const zIndex = Math.round(100 - absOffset * 10);

      card.style.transform = `translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.opacity = `${opacity}`;
      card.style.filter = blur > 0.4 ? `blur(${blur}px)` : 'none';
      card.style.zIndex = `${zIndex}`;

      // Indicador de tarjeta activa
      if (Math.round(currentProgress) === i) {
        card.setAttribute('data-active', 'true');
        card.setAttribute('aria-hidden', 'false');
      } else {
        card.setAttribute('data-active', 'false');
        card.setAttribute('aria-hidden', 'true');
      }
    }
  }, [prefersReducedMotion]);

  // Bucle de animación continuo (Lerp)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;

      // Suavizado inercial hacia el objetivo
      const diff = targetProgressRef.current - progressRef.current;

      if (Math.abs(diff) > 0.0005) {
        progressRef.current += diff * 0.12;
        updateCardsTransform();

        const newActive = Math.max(0, Math.min(total - 1, Math.round(progressRef.current)));
        setActiveIndex(newActive);
      } else if (progressRef.current !== targetProgressRef.current) {
        progressRef.current = targetProgressRef.current;
        updateCardsTransform();
        setActiveIndex(Math.round(progressRef.current));
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [total, prefersReducedMotion, updateCardsTransform]);

  // Navegar a un índice específico
  const goTo = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      targetProgressRef.current = clamped;
      setActiveIndex(clamped);
      if (prefersReducedMotion) {
        progressRef.current = clamped;
      }
    },
    [total, prefersReducedMotion]
  );

  const prev = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);

  // GESTIÓN DE ARRASTRE CON RATÓN (ESCRITORIO)
  const handleMouseDown = (e) => {
    if (e.button !== 0 || prefersReducedMotion) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startProgressRef.current = progressRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    const onMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const now = performance.now();
      const dt = Math.max(1, now - lastTimeRef.current);
      const dx = moveEvent.clientX - lastXRef.current;
      velocityRef.current = dx / dt;
      lastXRef.current = moveEvent.clientX;
      lastTimeRef.current = now;

      const totalDelta = moveEvent.clientX - startXRef.current;
      const progressDelta = -totalDelta / 280;
      targetProgressRef.current = Math.max(-0.25, Math.min(total - 0.75, startProgressRef.current + progressDelta));
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      // Inercia al soltar
      const momentum = -velocityRef.current * 0.18;
      const snapped = Math.round(targetProgressRef.current + momentum);
      goTo(snapped);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // GESTIÓN TÁCTIL (MÓVIL) - PRESERVA SCROLL VERTICAL
  const handleTouchStart = (e) => {
    if (prefersReducedMotion || e.touches.length !== 1) return;
    const touch = e.touches[0];
    isDraggingRef.current = true;
    startXRef.current = touch.clientX;
    startYRef.current = touch.clientY;
    startProgressRef.current = progressRef.current;
    dragDirectionRef.current = null;
    lastXRef.current = touch.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startXRef.current;
    const dy = touch.clientY - startYRef.current;

    // Detectar intención en los primeros 8 píxeles de movimiento
    if (dragDirectionRef.current === null) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        // Intención vertical: dejar que el navegador haga scroll de la página de forma natural
        dragDirectionRef.current = 'vertical';
        isDraggingRef.current = false;
        return;
      }
      if (Math.abs(dx) > 8) {
        // Intención horizontal: controlar el carrusel de pintxos
        dragDirectionRef.current = 'horizontal';
      }
    }

    if (dragDirectionRef.current === 'horizontal') {
      // Bloquear scroll horizontal del navegador únicamente cuando se arrastra el carrusel
      if (e.cancelable) e.preventDefault();

      const now = performance.now();
      const dt = Math.max(1, now - lastTimeRef.current);
      const instantDx = touch.clientX - lastXRef.current;
      velocityRef.current = instantDx / dt;
      lastXRef.current = touch.clientX;
      lastTimeRef.current = now;

      const progressDelta = -dx / 220;
      targetProgressRef.current = Math.max(-0.25, Math.min(total - 0.75, startProgressRef.current + progressDelta));
    }
  };

  const handleTouchEnd = () => {
    if (dragDirectionRef.current === 'horizontal') {
      const momentum = -velocityRef.current * 0.16;
      const snapped = Math.round(targetProgressRef.current + momentum);
      goTo(snapped);
    }
    isDraggingRef.current = false;
    dragDirectionRef.current = null;
  };

  // NAVEGACIÓN POR TECLADO
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  // Soporte de rueda de ratón (rueda horizontal o shift + vertical)
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > 10) {
      e.preventDefault();
      const delta = e.deltaX > 0 ? 1 : -1;
      goTo(activeIndex + delta);
    }
  };

  // Inicializar posiciones tras renderizado
  useEffect(() => {
    updateCardsTransform();
  }, [updateCardsTransform]);

  return (
    <section
      id="la-barra"
      className="barra-pintxos-section"
      aria-label="La barra de Covent y nuestros pintxos"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        position: 'relative',
        backgroundColor: '#120e0b',
        color: '#f0ede6',
        overflow: 'hidden',
        padding: '5rem 0 6rem 0',
      }}
    >
      {/* 1. Fondo de barra reconocible con contraste equilibrado */}
      <div
        className="barra-bg-wrap"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <img
          src={`${baseUrl}${bgImgSrc}`}
          alt={barraPintxosContent.backgroundImage.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            filter: 'brightness(0.68) saturate(1.15)',
            transform: 'scale(1.04)',
            transition: 'filter 0.5s ease',
          }}
        />

        {/* Scrim cinematográfico victoriano que deja visible la barra y asegura legibilidad */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(14, 11, 9, 0.72) 0%, rgba(20, 16, 13, 0.55) 35%, rgba(20, 16, 13, 0.58) 65%, rgba(14, 11, 9, 0.88) 100%)',
          }}
        />

        {/* Resplandor cálido central para realzar los pintxos */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 55%, rgba(247, 188, 96, 0.08) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Cabecera de la sección */}
        <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 2.5rem auto' }}>
          <span
            className="section-tag section-tag-gold"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              letterSpacing: '0.14em',
              marginBottom: '0.75rem',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
              storefront
            </span>
            <span>{barraPintxosContent.tag}</span>
          </span>

          <h2
            className="section-heading"
            style={{
              fontFamily: 'var(--font-headline)',
              fontSize: 'clamp(2rem, 4vw, 2.85rem)',
              color: '#ffffff',
              margin: '0 0 0.5rem 0',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
            }}
          >
            {barraPintxosContent.title}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-headline)',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: 'var(--color-brass)',
              margin: '0 0 0.75rem 0',
              fontWeight: 400,
            }}
          >
            {barraPintxosContent.subtitle}
          </p>

          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: '1.55',
              color: 'rgba(240, 237, 230, 0.82)',
              margin: '0 auto',
            }}
          >
            {barraPintxosContent.description}
          </p>
        </div>

        {/* 2. Escenario del Carrusel 3D */}
        <div
          ref={containerRef}
          className="barra-carousel-viewport"
          style={{
            position: 'relative',
            width: '100%',
            height: '460px',
            perspective: '1200px',
            perspectiveOrigin: '50% 50%',
            touchAction: 'pan-y', // Permite scroll vertical libre en móviles
            userSelect: 'none',
            cursor: prefersReducedMotion ? 'default' : 'grab',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          {/* Pista 3D */}
          <div
            ref={trackRef}
            className="barra-carousel-track"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
            }}
          >
            {items.map((item, idx) => {
              const imgSrc = resolveSingleImage(media, item.key, item.src);
              const isActive = idx === activeIndex;

              return (
                <div
                  key={item.id}
                  className="pintxo-3d-card"
                  onClick={() => goTo(idx)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 'min(300px, 78vw)',
                    height: '400px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(22, 18, 15, 0.92)',
                    boxShadow: isActive
                      ? '0 24px 48px rgba(0, 0, 0, 0.75), 0 0 0 2px var(--color-brass)'
                      : '0 16px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(247, 188, 96, 0.25)',
                    cursor: isActive ? 'default' : 'pointer',
                    willChange: 'transform, opacity',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: prefersReducedMotion ? 'none' : 'box-shadow 0.3s ease',
                  }}
                >
                  {/* Imagen de la tapa/pintxo */}
                  <div style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden' }}>
                    <img
                      src={`${baseUrl}${imgSrc}`}
                      alt={item.alt}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease',
                      }}
                    />

                    {/* Badge victoriano sobre la foto */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: 'rgba(14, 11, 9, 0.85)',
                        border: '1px solid rgba(247, 188, 96, 0.4)',
                        color: 'var(--color-brass)',
                        borderRadius: '6px',
                        padding: '3px 8px',
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-label)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {item.badge}
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '12px',
                        color: 'rgba(255, 255, 255, 0.75)',
                        fontFamily: 'var(--font-headline)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                      }}
                    >
                      {item.number}
                    </div>
                  </div>

                  {/* Ficha descriptiva limpia y neutra */}
                  <div
                    style={{
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flex: 1,
                      backgroundColor: 'rgba(24, 20, 16, 0.96)',
                      borderTop: '1px solid rgba(247, 188, 96, 0.15)',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontFamily: 'var(--font-headline)',
                          fontSize: '1.15rem',
                          color: '#ffffff',
                          fontWeight: 700,
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        style={{
                          margin: '0.35rem 0 0 0',
                          fontSize: '0.82rem',
                          lineHeight: '1.4',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '0.5rem',
                        fontSize: '0.7rem',
                        color: 'var(--color-brass)',
                      }}
                    >
                      <span>Covent Garden Bilbao</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
                        east
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Controles accesibles: Flechas y Selector de puntos */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '380px',
            margin: '2rem auto 0 auto',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(18, 14, 11, 0.75)',
            borderRadius: '999px',
            border: '1px solid rgba(247, 188, 96, 0.25)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Botón Anterior */}
          <button
            type="button"
            onClick={prev}
            disabled={activeIndex === 0}
            aria-label="Pintxo anterior"
            className="barra-nav-btn"
            style={{
              background: 'none',
              border: 'none',
              color: activeIndex === 0 ? 'rgba(255, 255, 255, 0.25)' : 'var(--color-brass)',
              cursor: activeIndex === 0 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.35rem',
              borderRadius: '50%',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
              chevron_left
            </span>
          </button>

          {/* Indicadores numéricos y de puntos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {items.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goTo(dotIdx)}
                aria-label={`Ir al pintxo ${dotIdx + 1}`}
                style={{
                  width: dotIdx === activeIndex ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: dotIdx === activeIndex ? 'var(--color-brass)' : 'rgba(255, 255, 255, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-headline)',
                color: 'var(--color-brass)',
                marginLeft: '0.5rem',
                fontWeight: 600,
              }}
            >
              0{activeIndex + 1} / 0{total}
            </span>
          </div>

          {/* Botón Siguiente */}
          <button
            type="button"
            onClick={next}
            disabled={activeIndex === total - 1}
            aria-label="Pintxo siguiente"
            className="barra-nav-btn"
            style={{
              background: 'none',
              border: 'none',
              color: activeIndex === total - 1 ? 'rgba(255, 255, 255, 0.25)' : 'var(--color-brass)',
              cursor: activeIndex === total - 1 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.35rem',
              borderRadius: '50%',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
              chevron_right
            </span>
          </button>
        </div>

        {/* Indicador de ayuda gestual sutil */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.72rem',
            color: 'rgba(240, 237, 230, 0.5)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            margin: '1rem 0 0 0',
          }}
        >
          Desliza para explorar la selección de barra
        </p>
      </div>
    </section>
  );
}
