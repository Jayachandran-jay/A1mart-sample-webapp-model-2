import React from 'react';

/**
 * A1MartCircleLoader — Gentle, smooth circular loading animation with calibrated spin speed.
 */
export default function A1MartCircleLoader({ size = 80, strokeWidth = 4, className = '' }) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`a1mart-circle-loader-wrap ${className}`}
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      role="progressbar"
      aria-label="Loading..."
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ animation: 'smoothSpin 2.4s linear infinite' }}
      >
        <defs>
          <linearGradient id="circleLoaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7950F2" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#FF6600" />
          </linearGradient>
        </defs>

        {/* Muted background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(121, 80, 242, 0.12)"
          strokeWidth={strokeWidth}
        />

        {/* Animated fluid arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#circleLoaderGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.65} ${circumference * 0.35}`}
        />
      </svg>
    </div>
  );
}

