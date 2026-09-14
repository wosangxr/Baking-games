import React from 'react';

interface SilverWhiskProps {
  className?: string;
  size?: number;
}

export const SilverWhisk: React.FC<SilverWhiskProps> = ({
  className = 'w-10 h-10',
  size,
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none filter drop-shadow-sm ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        {/* Silver Metallic Gradients */}
        <linearGradient id="silverHandle" x1="28" y1="36" x2="36" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="35%" stopColor="#CBD5E1" />
          <stop offset="65%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>

        <linearGradient id="silverWire" x1="16" y1="4" x2="48" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E2E8F0" />
          <stop offset="70%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>

        <linearGradient id="silverCap" x1="26" y1="34" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>

      {/* Whisk Balloon Wires (Silver) */}
      {/* Center Wire */}
      <path
        d="M32 36 V 7"
        stroke="url(#silverWire)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Outer Balloon Loop */}
      <path
        d="M32 36 C 14 30 14 10 32 5 C 50 10 50 30 32 36 Z"
        stroke="url(#silverWire)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Middle Balloon Loop */}
      <path
        d="M32 36 C 20 30 20 12 32 8 C 44 12 44 30 32 36 Z"
        stroke="url(#silverWire)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Balloon Loop */}
      <path
        d="M32 36 C 24 30 24 16 32 12 C 40 16 40 30 32 36 Z"
        stroke="url(#silverWire)"
        strokeWidth="2.0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Collar / Ferrule joining wires to handle */}
      <rect
        x="27"
        y="34"
        width="10"
        height="5"
        rx="2"
        fill="url(#silverCap)"
        stroke="#64748B"
        strokeWidth="0.8"
      />

      {/* Handle Grip */}
      <rect
        x="28.5"
        y="39"
        width="7"
        height="18"
        rx="3.5"
        fill="url(#silverHandle)"
        stroke="#475569"
        strokeWidth="0.8"
      />

      {/* Hanging Ring at Bottom */}
      <ellipse
        cx="32"
        cy="59"
        rx="3.5"
        ry="2.5"
        stroke="url(#silverWire)"
        strokeWidth="1.6"
      />
    </svg>
  );
};
