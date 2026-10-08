import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const SceneA_Energy = () => {
  const frame = useCurrentFrame();

  const pulse = interpolate(frame, [0, 20, 45], [0.8, 1.2, 1], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [0, 10, 40, 45], [0, 1, 1, 0.8]);
  const linesOffset = interpolate(frame, [0, 45], [-100, 100]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#0a0a0a',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      {/* Radial red sports energy ambient */}
      <div
        style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          background: 'radial-gradient(circle at 50% 50%, rgba(200, 16, 46, 0.45) 0%, rgba(139, 0, 0, 0.2) 40%, #080808 80%)',
          transform: `scale(${pulse})`,
        }}
      />

      {/* Kinetic Athletic Energy Lines */}
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        viewBox="0 0 1920 1080"
      >
        <defs>
          <linearGradient id="redEnergy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff1744" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#d50000" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="whiteEnergy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff4081" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dynamic diagonal slash lines */}
        {[-300, -100, 100, 300, 500, 700].map((offset, i) => (
          <line
            key={i}
            x1={offset + linesOffset * 2}
            y1="0"
            x2={offset + linesOffset * 2 + 800}
            y2="1080"
            stroke={i % 2 === 0 ? "url(#redEnergy)" : "url(#whiteEnergy)"}
            strokeWidth={i % 3 === 0 ? "6" : "3"}
            strokeDasharray={i % 2 === 0 ? "200 40" : "150 50"}
            opacity={0.7}
          />
        ))}
      </svg>

      {/* Atmospheric text hint */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          fontSize: '28px',
          fontWeight: 800,
          color: '#ffffff',
          textShadow: '0 0 20px rgba(255, 23, 68, 0.8)',
        }}
      >
        <span style={{ color: '#ff2a2a' }}>ATHLETIC</span> CLUB · BILBAO
      </div>
    </div>
  );
};
