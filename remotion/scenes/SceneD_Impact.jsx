import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const SceneD_Impact = () => {
  const frame = useCurrentFrame();
  const localFrame = frame;

  const opacity = interpolate(localFrame, [0, 5, 38, 45], [0, 1, 1, 0]);
  const shockwave = interpolate(localFrame, [0, 30], [0.1, 3.5], {
    extrapolateRight: 'clamp',
  });
  const flash = interpolate(localFrame, [0, 6, 20], [1, 0.8, 0], {
    extrapolateRight: 'clamp',
  });
  const stripeOffset = interpolate(localFrame, [0, 40], [-100, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#0a0a0a',
        overflow: 'hidden',
        opacity,
      }}
    >
      {/* Full screen flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#ffffff',
          opacity: flash,
          zIndex: 30,
          pointerEvents: 'none',
        }}
      />

      {/* Kinetic Red & White Stripes sweeping in */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          transform: `skewX(-15deg) translateX(${stripeOffset}%)`,
          opacity: 0.85,
        }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: i % 2 === 0 ? '#d50000' : '#ffffff',
              boxShadow: '0 0 30px rgba(0,0,0,0.5)',
            }}
          />
        ))}
      </div>

      {/* Radial shockwave circle */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '12px solid #ff1744',
          transform: `translate(-50%, -50%) scale(${shockwave})`,
          opacity: interpolate(localFrame, [0, 30], [1, 0]),
          pointerEvents: 'none',
        }}
      />

      {/* Text impact */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '64px',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '0.25em',
            textShadow: '0 0 40px #000, 0 0 20px #d50000',
            textTransform: 'uppercase',
          }}
        >
          ¡IMPACTO ROJIBLANCO!
        </span>
      </div>
    </div>
  );
};
