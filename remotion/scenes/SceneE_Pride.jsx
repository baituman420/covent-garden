import React from 'react';
import { interpolate, useCurrentFrame, staticFile } from 'remotion';

export const SceneE_Pride = ({ title, subtitle, venue }) => {
  const frame = useCurrentFrame();
  const localFrame = frame;

  const opacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const crestScale = interpolate(localFrame, [0, 25], [0.75, 1], {
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(localFrame, [10, 30], [40, 0], {
    extrapolateRight: 'clamp',
  });
  const textOpacity = interpolate(localFrame, [10, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#0c0a09',
        overflow: 'hidden',
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background San Mames night stadium */}
      <img
        src={staticFile('images/athletic/san-mames-night.jpg')}
        alt="San Mames"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.35,
          filter: 'brightness(0.5) contrast(1.3) saturate(1.2)',
        }}
      />

      {/* Atmospheric dark gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(139, 30, 36, 0.6) 0%, rgba(12, 10, 9, 0.95) 75%)',
        }}
      />

      {/* Official Athletic Club Crest */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          marginBottom: '28px',
          transform: `scale(${crestScale})`,
          filter: 'drop-shadow(0 0 35px rgba(255, 23, 68, 0.8)) drop-shadow(0 0 70px rgba(247, 188, 96, 0.4))',
        }}
      >
        <img
          src={staticFile('images/athletic-escudo.png')}
          alt="Athletic Club Crest"
          style={{
            width: '180px',
            height: '180px',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Typography: "AQUÍ SE VIVE EL ATHLETIC" */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          transform: `translateY(${textY}px)`,
          opacity: textOpacity,
        }}
      >
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '56px',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '0.08em',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 0 30px rgba(213, 0, 0, 0.8)',
          }}
        >
          {title}
        </h1>

        {/* Covent Garden Bilbao Connection */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 24px',
            backgroundColor: 'rgba(28, 25, 23, 0.85)',
            border: '1px solid rgba(247, 188, 96, 0.4)',
            borderRadius: '4px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '24px',
              fontStyle: 'italic',
              color: '#f7bc60',
              fontWeight: 600,
            }}
          >
            {subtitle}
          </span>
          <span style={{ color: 'rgba(247, 188, 96, 0.5)' }}>·</span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#e9e1dd',
              fontWeight: 600,
            }}
          >
            {venue}
          </span>
        </div>
      </div>
    </div>
  );
};
