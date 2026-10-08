import React from 'react';
import { interpolate, useCurrentFrame, staticFile } from 'remotion';

export const SceneB_PlayerIntro = () => {
  const frame = useCurrentFrame();
  const localFrame = frame;
  const opacity = interpolate(localFrame, [0, 10, 45, 55], [0, 1, 1, 0]);
  const scale = interpolate(localFrame, [0, 55], [0.95, 1.05]);
  const playerX = interpolate(localFrame, [0, 25], [-80, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#050505',
        overflow: 'hidden',
        opacity,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* San Mames stadium silhouette in background */}
      <img
        src={staticFile('images/athletic/san-mames-night.jpg')}
        alt="San Mames"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.25,
          filter: 'brightness(0.6) contrast(1.4) saturate(1.2)',
          transform: `scale(${scale})`,
        }}
      />

      {/* Dramatic red gradient scrim */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(5,5,5,0.9) 0%, rgba(139,0,0,0.5) 50%, rgba(5,5,5,0.9) 100%)',
        }}
      />

      {/* Athletic Player in Kit */}
      <div
        style={{
          position: 'relative',
          height: '85%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateX(${playerX}px) scale(${scale})`,
          filter: 'drop-shadow(0 0 35px rgba(255, 23, 68, 0.6))',
        }}
      >
        <img
          src={staticFile('images/athletic/athletic-player-crop.webp')}
          alt="Athletic Player"
          style={{
            maxHeight: '100%',
            objectFit: 'contain',
            borderRadius: '8px',
          }}
        />
      </div>

      {/* Tactical HUD caption */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          fontFamily: "'Space Grotesk', sans-serif",
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontSize: '22px',
          fontWeight: 700,
        }}
      >
        <span style={{ color: '#ff1744' }}>●</span> SAN MAMÉS MATCHDAY PREP
      </div>
    </div>
  );
};
