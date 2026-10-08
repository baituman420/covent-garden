import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const SceneC_Shot = () => {
  const frame = useCurrentFrame();
  const localFrame = frame;

  const opacity = interpolate(localFrame, [0, 8, 50, 60], [0, 1, 1, 0]);

  // Ball dynamics: moves from player's foot towards screen center, growing exponentially
  const ballScale = interpolate(localFrame, [0, 20, 50], [0.6, 1.2, 5.0], {
    extrapolateRight: 'clamp',
  });
  const ballX = interpolate(localFrame, [0, 20, 50], [120, 40, -10]);
  const ballY = interpolate(localFrame, [0, 20, 50], [180, 80, -20]);
  const ballRotate = interpolate(localFrame, [0, 50], [0, 720]);
  const motionBlur = interpolate(localFrame, [15, 35, 50], [0, 12, 24]);

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
      {/* Background with dynamic energy flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 60% 60%, rgba(255, 23, 68, 0.6) 0%, rgba(10,10,10,0.9) 70%)',
        }}
      />

      {/* Speed lines radiating outward */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.8,
        }}
        viewBox="0 0 1920 1080"
      >
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x2 = 960 + Math.cos(angle) * 1200;
          const y2 = 540 + Math.sin(angle) * 1200;
          return (
            <line
              key={i}
              x1="960"
              y1="540"
              x2={x2}
              y2={y2}
              stroke="#ff1744"
              strokeWidth="2"
              strokeDasharray="80 40"
              opacity={0.6}
            />
          );
        })}
      </svg>

      {/* The Match Soccer Ball accelerating toward screen */}
      <div
        style={{
          position: 'absolute',
          transform: `translate(${ballX}px, ${ballY}px) scale(${ballScale}) rotate(${ballRotate}deg)`,
          filter: `blur(${motionBlur}px) drop-shadow(0 0 40px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 80px rgba(255, 23, 68, 0.8))`,
          zIndex: 20,
        }}
      >
        <svg width="220" height="220" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="95" fill="#f7f7f7" stroke="#111" strokeWidth="6" />
          {/* Classic football pentagon patches */}
          <polygon points="100,60 125,78 115,108 85,108 75,78" fill="#111" />
          <polygon points="100,20 115,35 90,45 75,30" fill="#222" opacity="0.8" />
          <polygon points="160,85 180,105 165,125 145,110" fill="#222" opacity="0.8" />
          <polygon points="40,85 20,105 35,125 55,110" fill="#222" opacity="0.8" />
          <polygon points="135,160 120,175 95,165 105,145" fill="#222" opacity="0.8" />
          {/* Rojiblanco energy flare around ball */}
          <circle cx="100" cy="100" r="98" fill="none" stroke="#ff1744" strokeWidth="4" opacity="0.7" />
        </svg>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '12%',
          fontFamily: "'Space Grotesk', sans-serif",
          color: '#ffffff',
          letterSpacing: '0.4em',
          fontSize: '32px',
          fontWeight: 900,
          textShadow: '0 0 20px #ff1744',
        }}
      >
        GOLPEO DE MÁXIMA POTENCIA
      </div>
    </div>
  );
};
