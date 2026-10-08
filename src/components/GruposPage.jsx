import React, { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { gruposContent, site } from '../data/siteContent.js';

export default function GruposPage() {
  const baseUrl = import.meta.env.BASE_URL;

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    personas: '',
    mensaje: '',
    website: '', // Honeypot antispam
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim() || !formData.email.trim()) {
      setStatus('error');
      setFeedback('Por favor, completa los campos obligatorios (Nombre y Correo electrónico).');
      return;
    }

    setStatus('loading');
    setFeedback('');

    try {
      const response = await fetch(`${baseUrl}api/contact.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        setStatus('success');
        setFeedback(
          result.message ||
            '¡Solicitud enviada con éxito! Josu revisará los detalles y te responderá personalmente.'
        );
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          fecha: '',
          personas: '',
          mensaje: '',
          website: '',
        });
      } else {
        setStatus('error');
        setFeedback(
          result.error ||
            'Ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo más tarde o contáctanos por teléfono.'
        );
      }
    } catch (err) {
      setStatus('error');
      setFeedback(
        'No se pudo conectar con el servidor. Por favor, comprueba tu conexión o visítanos en Doctor Areilza 28.'
      );
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header isSubpage={true} />

      <main style={{ width: '100%', paddingTop: '5rem', flex: 1 }}>
        {/* Page Hero */}
        <section className="section-padding bg-dark-canvas" style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("${baseUrl}${gruposContent.image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.22,
              filter: 'brightness(0.6) contrast(1.1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(16, 14, 12, 0.85) 0%, rgba(22, 19, 17, 0.98) 100%)',
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 5, maxWidth: '52rem' }}>
            <div className="breadcrumb" style={{ marginBottom: '1.5rem' }}>
              <a href={baseUrl} className="btn-link" style={{ fontSize: '0.8rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                <span>Volver al Pub</span>
              </a>
            </div>

            <div className="tag-header" style={{ marginBottom: '0.75rem' }}>
              {gruposContent.tag}
            </div>

            <h1 className="title-display" style={{ marginBottom: '1rem', color: 'var(--color-cream)' }}>
              {gruposContent.title}
            </h1>

            <p style={{ fontFamily: 'var(--font-headline)', fontSize: '1.25rem', color: 'var(--color-brass)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
              {gruposContent.subtitle}
            </p>

            <p className="body-copy" style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              {gruposContent.description}
            </p>

            {/* Highlights Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem',
                marginTop: '2rem',
                marginBottom: '3rem',
              }}
            >
              {gruposContent.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'rgba(34, 31, 29, 0.75)',
                    border: '1px solid rgba(247, 188, 96, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-headline)',
                      fontSize: '1.1rem',
                      color: 'var(--color-brass)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {h.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Form Container */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-dark-container)',
                border: '1px solid rgba(247, 188, 96, 0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-headline)',
                    fontSize: '1.75rem',
                    color: 'var(--color-cream)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Solicitud de Información
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  Rellena los datos para que Josu pueda valorar tu petición y responderte con la mejor propuesta para tu cuadrilla o grupo.
                </p>
              </div>

              {/* Status Alert */}
              {status === 'success' && (
                <div
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem 1.25rem',
                    marginBottom: '1.5rem',
                    color: '#86efac',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#4ade80' }}>
                    check_circle
                  </span>
                  <div>
                    <strong>Solicitud enviada correctamente.</strong>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>{feedback}</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem 1.25rem',
                    marginBottom: '1.5rem',
                    color: '#fca5a5',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#f87171' }}>
                    error
                  </span>
                  <div>
                    <strong>No se pudo enviar la solicitud.</strong>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>{feedback}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot field (hidden from real users) */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="website">Website (no rellenar si eres humano)</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1.25rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  {/* Nombre */}
                  <div>
                    <label
                      htmlFor="nombre"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-label)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-cream)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Nombre y Apellidos <span style={{ color: 'var(--color-oxblood-light)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej: Aitor Mendia"
                      className="form-input"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-label)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-cream)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Correo Electrónico <span style={{ color: 'var(--color-oxblood-light)' }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nombre@ejemplo.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1.25rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  {/* Teléfono */}
                  <div>
                    <label
                      htmlFor="telefono"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-label)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-light)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Teléfono de Contacto (opcional)
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="600 000 000"
                      className="form-input"
                    />
                  </div>

                  {/* Fecha aproximada */}
                  <div>
                    <label
                      htmlFor="fecha"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-label)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-light)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Fecha Aproximada
                    </label>
                    <input
                      type="text"
                      id="fecha"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleChange}
                      placeholder="Ej: Sábado 24 de Octubre (tarde)"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Personas */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label
                    htmlFor="personas"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-label)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-light)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Número Aproximado de Personas
                  </label>
                  <input
                    type="text"
                    id="personas"
                    name="personas"
                    value={formData.personas}
                    onChange={handleChange}
                    placeholder="Ej: 12 - 15 personas"
                    className="form-input"
                  />
                </div>

                {/* Mensaje */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    htmlFor="mensaje"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-label)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-light)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Mensaje o Detalles del Encuentro
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntanos el motivo de la celebración, preferencias de bebidas o picoteo, horario estimado..."
                    className="form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Clarification Alert Box */}
                <div
                  style={{
                    backgroundColor: 'rgba(139, 30, 36, 0.25)',
                    border: '1px solid rgba(139, 30, 36, 0.6)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem 1.25rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-brass)' }}>
                    info
                  </span>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-cream-warm)', lineHeight: 1.5 }}>
                    <strong>Aviso importante:</strong> El envío de esta solicitud <strong>no supone la confirmación de una reserva</strong>.
                    Josu recibirá la información y responderá personalmente por correo o teléfono para confirmar disponibilidad y condiciones.
                  </div>
                </div>

                {/* Privacy info */}
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Información básica de protección de datos: Covent Garden Bilbao tratará tus datos exclusivamente para atender tu consulta sobre grupos y reservados. No se cederán a terceros ni se emplearán con fines publicitarios no solicitados.
                </p>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.875rem 1.5rem',
                    fontSize: '0.85rem',
                    cursor: status === 'loading' ? 'wait' : 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1,
                  }}
                >
                  {status === 'loading' ? (
                    <span>ENVIANDO SOLICITUD...</span>
                  ) : (
                    <>
                      <span>ENVIAR SOLICITUD DE INFORMACIÓN</span>
                      <span className="material-symbols-outlined" style={{ marginLeft: '0.5rem', fontSize: '20px' }}>
                        send
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
