import React, { useState, useEffect } from 'react';
import { navidadContent, site } from '../data/siteContent.js';

export default function NavidadModal() {
  const baseUrl = import.meta.env.BASE_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('katxopo'); // 'katxopo' | 'navidad' | 'poster'
  const [isEligible, setIsEligible] = useState(true);

  useEffect(() => {
    // Verificar si estamos dentro del período navideño (activo hasta enero)
    const now = new Date();
    const expiry = new Date(navidadContent.activeUntilDate);
    const eligible = now <= expiry;
    setIsEligible(eligible);

    if (eligible) {
      // Comprobar si ya fue cerrado en esta sesión para no ser intrusivo
      const dismissed = sessionStorage.getItem('covent_navidad_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Escuchar eventos globales para abrir el modal desde cualquier botón o enlace de la web
  useEffect(() => {
    const handleCustomOpen = (e) => {
      setIsOpen(true);
      if (e.detail?.tab) {
        setActiveTab(e.detail.tab);
      }
    };
    window.addEventListener('open-navidad-modal', handleCustomOpen);
    return () => window.removeEventListener('open-navidad-modal', handleCustomOpen);
  }, []);

  // Manejo de tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevenir scroll de fondo en body cuando el modal está abierto en móvil
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('covent_navidad_dismissed', 'true');
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  if (!isEligible) return null;

  return (
    <>
      {/* Botón flotante persistente: solo visible cuando el modal NO está abierto */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          className="navidad-floating-trigger"
          aria-label="Ver Menús Especiales de Navidad y Katxopo"
          title="Ver Menús Especiales de Navidad y Katxopo"
        >
          <div className="navidad-trigger-content">
            <span className="navidad-pulse-dot" />
            <span className="navidad-trigger-text">
              <span className="trigger-text-full">Menús Navidad & Katxopo</span>
              <span className="trigger-text-compact">Menús Navidad</span>
            </span>
          </div>
          <div className="navidad-trigger-badge">
            <span className="navidad-trigger-price">Desde 22€</span>
            <span className="navidad-trigger-chevron">➔</span>
          </div>
        </button>
      )}

      {/* Ventana Emergente Modal */}
      {isOpen && (
        <div
          className="navidad-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="navidad-modal-title"
        >
          <div className="navidad-modal-dialog">
            {/* Header Fijo del Modal */}
            <div className="navidad-modal-header">
              <div className="navidad-modal-header-main">
                <div className="navidad-modal-badge">
                  <span className="badge-text">{navidadContent.badge}</span>
                  <span className="navidad-date-tag">Hasta final de enero</span>
                </div>
                <h3 id="navidad-modal-title" className="navidad-modal-title">
                  {navidadContent.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="navidad-modal-close"
                aria-label="Cerrar ventana emergente"
              >
                <span className="close-glyph">✕</span>
              </button>
            </div>

            {/* Pestañas de Selección de Menús */}
            <div className="navidad-tabs-wrapper">
              <div className="navidad-tabs-bar">
                <button
                  type="button"
                  className={`navidad-tab-btn ${activeTab === 'katxopo' ? 'active' : ''}`}
                  onClick={() => setActiveTab('katxopo')}
                >
                  <span className="tab-pill-icon">🥩</span>
                  <span className="tab-label-full">Menú Katxopo (22€ / 24€)</span>
                  <span className="tab-label-mobile">Katxopo (22€/24€)</span>
                </button>
                <button
                  type="button"
                  className={`navidad-tab-btn ${activeTab === 'navidad' ? 'active' : ''}`}
                  onClick={() => setActiveTab('navidad')}
                >
                  <span className="tab-pill-icon">🍷</span>
                  <span className="tab-label-full">Menú Navidad (36€)</span>
                  <span className="tab-label-mobile">Navidad (36€)</span>
                </button>
                <button
                  type="button"
                  className={`navidad-tab-btn ${activeTab === 'poster' ? 'active' : ''}`}
                  onClick={() => setActiveTab('poster')}
                >
                  <span className="tab-pill-icon">📜</span>
                  <span className="tab-label-full">Cartel Original</span>
                  <span className="tab-label-mobile">Cartel</span>
                </button>
              </div>
            </div>

            {/* Cuerpo Scrollable del Modal */}
            <div className="navidad-modal-body">
              <p className="navidad-modal-sub">
                {navidadContent.subtitle}
              </p>

              <div className="navidad-tab-content">
                {activeTab === 'katxopo' && (
                  <div className="navidad-card-detail">
                    <div className="navidad-card-top">
                      <div>
                        <span className="navidad-item-badge">MÍNIMO 2 PERSONAS</span>
                        <h4 className="navidad-card-name">Menú Katxopo Gigante</h4>
                      </div>
                      <div className="navidad-price-tag">
                        <div className="navidad-price-item">
                          <span className="price-num">22 €</span>
                          <span className="price-desc">Jamón / pers.</span>
                        </div>
                        <div className="navidad-price-sep">|</div>
                        <div className="navidad-price-item">
                          <span className="price-num">24 €</span>
                          <span className="price-desc">Cecina León / pers.</span>
                        </div>
                      </div>
                    </div>

                    <div className="navidad-menu-list">
                      <div className="navidad-menu-row">
                        <span className="material-symbols-outlined check-icon">check_circle</span>
                        <span><strong>Entrante 1:</strong> Ración de croquetas caseras de jamón (6 unidades al centro).</span>
                      </div>
                      <div className="navidad-menu-row">
                        <span className="material-symbols-outlined check-icon">check_circle</span>
                        <span><strong>Entrante 2:</strong> Ensalada de bonito del norte con cebolla caramelizada y salsa de piquillos asados.</span>
                      </div>
                      <div className="navidad-menu-row">
                        <span className="material-symbols-outlined check-icon">check_circle</span>
                        <span><strong>Plato Principal:</strong> Katxopo gigante relleno con jamón o cecina de León y queso cremoso fundente, acompañado de patatas fritas y pimientos verdes.</span>
                      </div>
                      <div className="navidad-menu-row">
                        <span className="material-symbols-outlined check-icon">check_circle</span>
                        <span><strong>Postre:</strong> A elegir entre postre casero de la casa o cortado / café con leche.</span>
                      </div>
                    </div>

                    <div className="navidad-extra-banner">
                      <span className="extra-highlight">OPCIÓN EXTRA:</span> Por solo <strong>5 € más</strong>, disfruta de jarra de cerveza o kalimotxo de 1 litro.
                    </div>
                  </div>
                )}

                {activeTab === 'navidad' && (
                  <div className="navidad-card-detail">
                    <div className="navidad-card-top">
                      <div>
                        <span className="navidad-item-badge">MENÚ COMPLETO</span>
                        <h4 className="navidad-card-name">Menú Especial Navidad</h4>
                      </div>
                      <div className="navidad-price-single">
                        <span className="price-big">36 €</span>
                        <span className="price-sub">por persona</span>
                      </div>
                    </div>

                    <div className="navidad-section-group">
                      <h5 className="group-title">Entrantes al Centro:</h5>
                      <div className="navidad-menu-list">
                        <div className="navidad-menu-row">
                          <span className="material-symbols-outlined check-icon">restaurant</span>
                          <span>Plato de jamón, lomo y chorizo ibérico de bellota.</span>
                        </div>
                        <div className="navidad-menu-row">
                          <span className="material-symbols-outlined check-icon">restaurant</span>
                          <span>Gambones a la plancha (3 unidades por persona).</span>
                        </div>
                        <div className="navidad-menu-row">
                          <span className="material-symbols-outlined check-icon">restaurant</span>
                          <span>Ensalada templada de ventresca de bonito.</span>
                        </div>
                      </div>
                    </div>

                    <div className="navidad-section-group" style={{ marginTop: '1rem' }}>
                      <h5 className="group-title">Plato Individual a Elegir:</h5>
                      <div className="navidad-menu-list">
                        <div className="navidad-menu-row">
                          <span className="material-symbols-outlined check-icon">dinner_dining</span>
                          <span><strong>TXULETA de ganado mayor</strong> con pimientos y patatas deluxe (300 g aprox.).</span>
                        </div>
                        <div className="navidad-menu-row">
                          <span className="material-symbols-outlined check-icon">dinner_dining</span>
                          <span><strong>Taco de BAKALAO a la plancha</strong> con cebolla caramelizada sobre cama panadera.</span>
                        </div>
                      </div>
                    </div>

                    <div className="navidad-section-group" style={{ marginTop: '1rem' }}>
                      <h5 className="group-title">Postre & Bodega Incluida:</h5>
                      <div className="navidad-menu-list">
                        <div className="navidad-menu-row">
                          <span className="material-symbols-outlined check-icon">cake</span>
                          <span>Postres caseros a elegir de nuestra cocina.</span>
                        </div>
                        <div className="navidad-menu-row">
                          <span className="material-symbols-outlined check-icon">local_bar</span>
                          <span>Vino crianza, vino blanco Rueda, refrescos o cañas de cerveza.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'poster' && (
                  <div className="navidad-poster-preview">
                    <img
                      src={`${baseUrl}${navidadContent.posterImage}`}
                      alt="Cartel oficial de menús de Navidad y Katxopo en Covent Garden"
                      className="navidad-poster-img"
                    />
                    <p className="navidad-poster-caption">
                      Cartel oficial expuesto en Covent Garden · Doctor Areilza 28, Bilbao
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Fijo / Sticky en la Base */}
            <div className="navidad-modal-footer">
              <div className="navidad-footer-info">
                <span className="material-symbols-outlined footer-phone-icon">
                  phone_in_talk
                </span>
                <div className="footer-info-text">
                  <span className="info-label">RESERVAS DIRECTAS (JOSU):</span>
                  <a href={`tel:${navidadContent.reservasPhone.replace(/\s+/g, '')}`} className="info-val-link">
                    {navidadContent.reservasPhone}
                  </a>
                </div>
              </div>

              <div className="navidad-footer-actions">
                <a
                  href={`tel:${navidadContent.reservasPhone.replace(/\s+/g, '')}`}
                  className="btn-primary navidad-call-btn"
                >
                  <span className="material-symbols-outlined">call</span>
                  <span className="call-btn-full">Llamar Ahora ({navidadContent.reservasPhone})</span>
                  <span className="call-btn-mobile">Llamar ({navidadContent.reservasPhone})</span>
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-secondary navidad-close-btn"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
