import React, { useState, useEffect, useRef } from 'react';
import { legalSections, legalInfo } from '../data/legalContent.js';

export default function LegalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('avisoLegal'); // 'avisoLegal' | 'politicaPrivacidad' | 'politicaCookies'
  const closeButtonRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  // Escuchar evento personalizado global para abrir el modal desde cualquier lugar (Footer, Formulario, etc.)
  useEffect(() => {
    const handleOpen = (e) => {
      previouslyFocusedElement.current = document.activeElement;
      if (e.detail?.doc && legalSections[e.detail.doc]) {
        setActiveTab(e.detail.doc);
      }
      setIsOpen(true);
    };

    window.addEventListener('open-legal-modal', handleOpen);
    return () => window.removeEventListener('open-legal-modal', handleOpen);
  }, []);

  // Manejo de teclado (Escape) y atrapado básico de foco
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Enfocar el botón de cierre al abrir
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen]);

  // Bloquear scroll de la página al abrir el modal
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
    // Devolver el foco al elemento anterior
    if (previouslyFocusedElement.current && typeof previouslyFocusedElement.current.focus === 'function') {
      previouslyFocusedElement.current.focus();
    }
  };

  if (!isOpen) return null;

  const currentSection = legalSections[activeTab] || legalSections.avisoLegal;

  return (
    <div
      className="legal-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      aria-describedby="legal-modal-desc"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(16, 14, 12, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        className="legal-modal-dialog"
        style={{
          backgroundColor: 'var(--color-bg-dark-lowest)',
          border: '1px solid rgba(247, 188, 96, 0.35)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
          width: '100%',
          maxWidth: '52rem',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Cabecera del modal */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(247, 188, 96, 0.2)',
            backgroundColor: 'rgba(34, 31, 29, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-brass)',
                display: 'block',
                marginBottom: '0.25rem',
              }}
            >
              {currentSection.badge} · Covent Garden Bilbao
            </span>
            <h2
              id="legal-modal-title"
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '1.45rem',
                color: 'var(--color-cream)',
                margin: 0,
              }}
            >
              {currentSection.title}
            </h2>
            <p id="legal-modal-desc" className="sr-only">
              Información legal, protección de datos y condiciones del establecimiento hostelero Covent Garden Bilbao
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Cerrar ventana de información legal"
            style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(247, 188, 96, 0.3)',
              backgroundColor: 'rgba(22, 19, 17, 0.8)',
              color: 'var(--color-cream)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-oxblood)';
              e.currentTarget.style.borderColor = 'var(--color-brass)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(22, 19, 17, 0.8)';
              e.currentTarget.style.borderColor = 'rgba(247, 188, 96, 0.3)';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
          </button>
        </div>

        {/* Pestañas de navegación legal */}
        <div
          role="tablist"
          aria-label="Documentos legales"
          style={{
            display: 'flex',
            backgroundColor: 'rgba(22, 19, 17, 0.95)',
            borderBottom: '1px solid rgba(247, 188, 96, 0.2)',
            padding: '0.5rem 1rem 0 1rem',
            gap: '0.5rem',
            overflowX: 'auto',
          }}
        >
          <button
            type="button"
            role="tab"
            id="tab-aviso-legal"
            aria-selected={activeTab === 'avisoLegal'}
            aria-controls="panel-legal"
            onClick={() => setActiveTab('avisoLegal')}
            style={{
              padding: '0.65rem 1rem',
              fontFamily: 'var(--font-label)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: activeTab === 'avisoLegal' ? 'var(--color-brass)' : 'var(--color-text-muted)',
              borderBottom: activeTab === 'avisoLegal' ? '2px solid var(--color-brass)' : '2px solid transparent',
              backgroundColor: activeTab === 'avisoLegal' ? 'rgba(247, 188, 96, 0.08)' : 'transparent',
              borderTopLeftRadius: 'var(--radius-sm)',
              borderTopRightRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Aviso Legal
          </button>

          <button
            type="button"
            role="tab"
            id="tab-privacidad"
            aria-selected={activeTab === 'politicaPrivacidad'}
            aria-controls="panel-legal"
            onClick={() => setActiveTab('politicaPrivacidad')}
            style={{
              padding: '0.65rem 1rem',
              fontFamily: 'var(--font-label)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: activeTab === 'politicaPrivacidad' ? 'var(--color-brass)' : 'var(--color-text-muted)',
              borderBottom: activeTab === 'politicaPrivacidad' ? '2px solid var(--color-brass)' : '2px solid transparent',
              backgroundColor: activeTab === 'politicaPrivacidad' ? 'rgba(247, 188, 96, 0.08)' : 'transparent',
              borderTopLeftRadius: 'var(--radius-sm)',
              borderTopRightRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Política de Privacidad
          </button>

          <button
            type="button"
            role="tab"
            id="tab-cookies"
            aria-selected={activeTab === 'politicaCookies'}
            aria-controls="panel-legal"
            onClick={() => setActiveTab('politicaCookies')}
            style={{
              padding: '0.65rem 1rem',
              fontFamily: 'var(--font-label)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: activeTab === 'politicaCookies' ? 'var(--color-brass)' : 'var(--color-text-muted)',
              borderBottom: activeTab === 'politicaCookies' ? '2px solid var(--color-brass)' : '2px solid transparent',
              backgroundColor: activeTab === 'politicaCookies' ? 'rgba(247, 188, 96, 0.08)' : 'transparent',
              borderTopLeftRadius: 'var(--radius-sm)',
              borderTopRightRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Información de Cookies
          </button>
        </div>

        {/* Contenido scrolleable de la sección legal */}
        <div
          id="panel-legal"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab === 'avisoLegal' ? 'aviso-legal' : activeTab === 'politicaPrivacidad' ? 'privacidad' : 'cookies'}`}
          tabIndex="0"
          style={{
            padding: '1.5rem',
            overflowY: 'auto',
            flex: 1,
            color: 'var(--color-text-light)',
            fontSize: '0.9rem',
            lineHeight: 1.7,
          }}
        >
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Titular de la actividad: <strong style={{ color: 'var(--color-cream)' }}>{legalInfo.titular}</strong> (NIF {legalInfo.nif})
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-brass)' }}>
              Actualización: {currentSection.lastUpdate}
            </span>
          </div>

          {currentSection.content.map((sec, idx) => (
            <div key={idx} style={{ marginBottom: '1.5rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1.15rem',
                  color: 'var(--color-brass)',
                  marginBottom: '0.65rem',
                }}
              >
                {sec.heading}
              </h3>
              {sec.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  style={{
                    marginBottom: '0.5rem',
                    color: p.startsWith('•') ? 'var(--color-cream-warm)' : 'var(--color-text-muted)',
                    paddingLeft: p.startsWith('•') ? '0.75rem' : 0,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div
            style={{
              marginTop: '2rem',
              padding: '1rem',
              backgroundColor: 'rgba(34, 31, 29, 0.5)',
              border: '1px solid rgba(247, 188, 96, 0.2)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
            }}
          >
            <strong>Contacto para consultas legales o ejercicio de derechos:</strong> Bilbocover, S.L. · {legalInfo.domicilioSocial} · Teléfono: <a href="tel:944667549" style={{ color: 'var(--color-brass)' }}>944 667 549</a> · Correo oficial: <a href={`mailto:${legalInfo.emailContacto}`} style={{ color: 'var(--color-brass)', textDecoration: 'underline' }}>{legalInfo.emailContacto}</a>.
          </div>
        </div>

        {/* Pie del modal */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid rgba(247, 188, 96, 0.2)',
            backgroundColor: 'rgba(34, 31, 29, 0.65)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            type="button"
            onClick={handleClose}
            className="btn-secondary"
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.8rem',
            }}
          >
            Entendido / Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
