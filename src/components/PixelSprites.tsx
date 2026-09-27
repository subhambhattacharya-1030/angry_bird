import React from 'react';

// Crisp 16-Bit Pixel Art SVGs for all Birds & Game Elements
// STRICTLY NO BLUE, NO PURPLE. Warm reds, yellows, oranges, greens, woods, and stones.

export const PixelRedBird: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Body Base (Cardinal Red) */}
    <rect x="8" y="4" width="16" height="2" fill="#991b1b" />
    <rect x="6" y="6" width="20" height="2" fill="#b91c1c" />
    <rect x="4" y="8" width="24" height="16" fill="#e63946" />
    <rect x="6" y="24" width="20" height="2" fill="#b91c1c" />
    <rect x="8" y="26" width="16" height="2" fill="#991b1b" />

    {/* Top Crest Feathers */}
    <rect x="14" y="1" width="4" height="3" fill="#e63946" />
    <rect x="18" y="2" width="3" height="3" fill="#b91c1c" />
    <rect x="13" y="2" width="2" height="2" fill="#7f1d1d" />

    {/* Belly (Cream) */}
    <rect x="8" y="18" width="16" height="6" fill="#fef08a" opacity="0.9" />
    <rect x="10" y="24" width="12" height="2" fill="#fde047" opacity="0.8" />

    {/* Angry Eyebrows (Black, Slanted) */}
    <rect x="7" y="10" width="8" height="3" fill="#000000" />
    <rect x="15" y="11" width="3" height="3" fill="#000000" />
    <rect x="18" y="10" width="8" height="3" fill="#000000" />

    {/* Big White Eyes */}
    <rect x="8" y="13" width="6" height="5" fill="#ffffff" />
    <rect x="18" y="13" width="6" height="5" fill="#ffffff" />
    {/* Pupils (Black, Intensely staring forward) */}
    <rect x="12" y="14" width="2" height="3" fill="#000000" />
    <rect x="18" y="14" width="2" height="3" fill="#000000" />

    {/* Beak (Golden Orange) */}
    <polygon points="13,16 19,16 16,21" fill="#f59e0b" />
    <polygon points="14,16 18,16 16,18" fill="#fbbf24" />
    <rect x="15" y="17" width="2" height="1" fill="#b45309" />
    
    {/* Tail Feathers */}
    <rect x="1" y="12" width="3" height="2" fill="#000000" />
    <rect x="2" y="15" width="2" height="2" fill="#000000" />
  </svg>
);

export const PixelChuckBird: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Triangular Body (Chuck - Golden Yellow) */}
    <polygon points="16,3 27,27 5,27" fill="#ffd166" />
    <polygon points="16,6 25,26 7,26" fill="#facc15" />
    <polygon points="16,9 23,25 9,25" fill="#fde047" />

    {/* Black Head Feathers */}
    <rect x="15" y="1" width="3" height="4" fill="#000000" />
    <rect x="17" y="2" width="4" height="2" fill="#000000" />

    {/* Cream Underbelly */}
    <rect x="10" y="23" width="12" height="3" fill="#fffbeb" />

    {/* Red/Brown Angry Brows */}
    <rect x="8" y="13" width="7" height="3" fill="#991b1b" />
    <rect x="17" y="13" width="7" height="3" fill="#991b1b" />

    {/* Eyes */}
    <rect x="9" y="16" width="6" height="4" fill="#ffffff" />
    <rect x="17" y="16" width="6" height="4" fill="#ffffff" />
    <rect x="12" y="17" width="2" height="2" fill="#000000" />
    <rect x="18" y="17" width="2" height="2" fill="#000000" />

    {/* Sharp Long Beak */}
    <polygon points="14,18 24,19 14,23" fill="#f97316" />
    <polygon points="14,19 22,20 14,21" fill="#fbbf24" />

    {/* Speed Lines / Tail */}
    <rect x="2" y="19" width="4" height="2" fill="#000000" />
    <rect x="1" y="22" width="4" height="2" fill="#000000" />
  </svg>
);

export const PixelBombBird: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Body Base (Charcoal Black) */}
    <rect x="6" y="6" width="20" height="20" rx="4" fill="#1f2937" />
    <rect x="8" y="8" width="16" height="16" fill="#111827" />

    {/* Fuse with Fiery Tip (Warm Orange / Yellow) */}
    <rect x="15" y="2" width="2" height="4" fill="#78350f" />
    <rect x="14" y="0" width="4" height="3" fill="#f59e0b" />
    <rect x="15" y="1" width="2" height="2" fill="#ef4444" />

    {/* Gray Belly */}
    <rect x="10" y="20" width="12" height="5" fill="#374151" />

    {/* Fierce Red Eyes / Eyebrows */}
    <rect x="7" y="10" width="7" height="3" fill="#ea580c" />
    <rect x="18" y="10" width="7" height="3" fill="#ea580c" />
    {/* Forehead White Dot (Bomb signature) */}
    <rect x="15" y="9" width="2" height="2" fill="#ffffff" />

    <rect x="8" y="13" width="6" height="4" fill="#ffffff" />
    <rect x="18" y="13" width="6" height="4" fill="#ffffff" />
    <rect x="11" y="14" width="2" height="2" fill="#dc2626" />
    <rect x="19" y="14" width="2" height="2" fill="#dc2626" />

    {/* Beak */}
    <polygon points="13,17 19,17 16,21" fill="#f59e0b" />
  </svg>
);

export const PixelMatildaBird: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* White Egg-Shaped Body */}
    <rect x="7" y="6" width="18" height="22" rx="6" fill="#f8fafc" />
    <rect x="9" y="8" width="14" height="18" fill="#ffffff" />

    {/* Rosy Cheeks (Coral Pink, Warm, not purple!) */}
    <rect x="6" y="19" width="4" height="3" fill="#fb7185" />
    <rect x="22" y="19" width="4" height="3" fill="#fb7185" />

    {/* Top Feathers (Black) */}
    <rect x="14" y="2" width="4" height="4" fill="#0f172a" />
    <rect x="13" y="3" width="2" height="3" fill="#334155" />

    {/* Gentle yet determined eyes */}
    <rect x="8" y="13" width="6" height="4" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
    <rect x="18" y="13" width="6" height="4" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
    <rect x="11" y="14" width="2" height="2" fill="#000000" />
    <rect x="19" y="14" width="2" height="2" fill="#000000" />

    {/* Soft Yellow Beak */}
    <polygon points="13,17 19,17 16,22" fill="#f59e0b" />
  </svg>
);

export const PixelPig: React.FC<{ size?: number; helmet?: boolean; king?: boolean; className?: string }> = ({ 
  size = 48, 
  helmet = false, 
  king = false, 
  className = '' 
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Green Body */}
    <rect x="6" y="7" width="20" height="20" rx="6" fill="#15803d" />
    <rect x="7" y="8" width="18" height="18" fill="#22c55e" />
    <rect x="9" y="10" width="14" height="14" fill="#4ade80" />

    {/* Ears */}
    <rect x="6" y="5" width="4" height="4" fill="#15803d" />
    <rect x="7" y="6" width="2" height="2" fill="#16a34a" />
    <rect x="22" y="5" width="4" height="4" fill="#15803d" />
    <rect x="23" y="6" width="2" height="2" fill="#16a34a" />

    {/* Helmet if specified */}
    {helmet && (
      <g>
        <rect x="5" y="4" width="22" height="7" fill="#78716c" />
        <rect x="7" y="3" width="18" height="4" fill="#a8a29e" />
        <rect x="11" y="2" width="10" height="2" fill="#d6d3d1" />
        <rect x="7" y="10" width="3" height="4" fill="#57534e" />
        <rect x="22" y="10" width="3" height="4" fill="#57534e" />
      </g>
    )}

    {/* King Crown if specified */}
    {king && (
      <g>
        <polygon points="9,6 9,2 12,4 16,1 20,4 23,2 23,6" fill="#f59e0b" />
        <rect x="9" y="5" width="14" height="2" fill="#d97706" />
        <circle cx="16" cy="3" r="1" fill="#ef4444" />
      </g>
    )}

    {/* Big Goofy Piggy Eyes (Looking slightly derpy) */}
    <rect x="8" y="12" width="6" height="6" fill="#ffffff" />
    <rect x="18" y="12" width="6" height="6" fill="#ffffff" />
    <rect x="11" y="14" width="2" height="2" fill="#000000" />
    <rect x="19" y="13" width="2" height="2" fill="#000000" />

    {/* Pig Snout (Emerald green oval with 2 nostrils) */}
    <rect x="11" y="17" width="10" height="7" rx="3" fill="#16a34a" />
    <rect x="13" y="19" width="2" height="3" fill="#14532d" />
    <rect x="17" y="19" width="2" height="3" fill="#14532d" />

    {/* Derpy Smile */}
    <rect x="13" y="25" width="6" height="1" fill="#14532d" />
  </svg>
);

export const PixelSlingshot: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Wooden Base Trunk */}
    <rect x="14" y="17" width="4" height="14" fill="#78350f" />
    <rect x="15" y="17" width="2" height="13" fill="#b45309" />
    
    {/* Left Fork */}
    <rect x="9" y="7" width="4" height="11" fill="#78350f" />
    <rect x="10" y="8" width="2" height="10" fill="#b45309" />
    <rect x="7" y="4" width="5" height="4" fill="#92400e" />

    {/* Right Fork */}
    <rect x="19" y="7" width="4" height="11" fill="#78350f" />
    <rect x="20" y="8" width="2" height="10" fill="#b45309" />
    <rect x="20" y="4" width="5" height="4" fill="#92400e" />

    {/* Fork Junction */}
    <rect x="13" y="16" width="6" height="3" fill="#78350f" />

    {/* Heavy Leather Elastic Band */}
    <line x1="8" y1="6" x2="16" y2="13" stroke="#ea580c" strokeWidth="2" strokeDasharray="1,1" />
    <line x1="24" y1="6" x2="16" y2="13" stroke="#ea580c" strokeWidth="2" strokeDasharray="1,1" />
    <rect x="14" y="12" width="4" height="3" fill="#b91c1c" />
  </svg>
);

export const PixelGoldenEgg: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={{ imageRendering: 'pixelated' }}>
    <ellipse cx="12" cy="13" rx="7" ry="9" fill="#f59e0b" />
    <ellipse cx="11" cy="12" rx="5" ry="7" fill="#fbbf24" />
    <ellipse cx="10" cy="10" rx="2" ry="3" fill="#fef08a" />
  </svg>
);

export const PixelTNTBox: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="2" width="20" height="20" fill="#dc2626" stroke="#000000" strokeWidth="2" />
    <rect x="4" y="4" width="16" height="16" fill="#ea580c" />
    <rect x="3" y="9" width="18" height="6" fill="#fef08a" />
    <text x="12" y="14" textAnchor="middle" fontSize="5" fontWeight="bold" fontFamily="monospace" fill="#000000">TNT</text>
  </svg>
);
