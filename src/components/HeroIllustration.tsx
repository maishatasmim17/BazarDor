import React from 'react';

export function HeroIllustration({ className = 'w-72 h-72 md:w-84 md:h-84' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 400 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          <radialGradient id="shadowGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="basketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="basketRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id="appleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="70%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="eggplantGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>
          <linearGradient id="greenAppleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>

        {/* Soft ground shadow */}
        <ellipse cx="200" cy="275" rx="160" ry="25" fill="#e2e8f0" />
        <ellipse cx="200" cy="270" rx="130" ry="16" fill="#cbd5e1" opacity="0.6" />

        {/* BACK VEGGIES / FRUITS */}
        {/* Purple Eggplant */}
        <ellipse cx="140" cy="140" rx="28" ry="38" fill="url(#eggplantGrad)" transform="rotate(-15 140 140)" />
        <path d="M142 105 C142 98 148 95 152 90 C154 94 150 102 146 106 Z" fill="#15803d" />
        <path d="M136 105 Q140 100 144 105 Q148 112 138 114 Z" fill="#166534" />

        {/* Green Apple */}
        <circle cx="230" cy="120" r="34" fill="url(#greenAppleGrad)" />
        <path d="M230 86 Q235 75 240 70" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
        <path d="M236 78 Q250 72 254 84 Q244 88 236 78 Z" fill="#16a34a" />

        {/* Red Apple */}
        <circle cx="180" cy="135" r="30" fill="url(#appleGrad)" />
        <path d="M180 105 Q185 96 190 92" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
        <path d="M185 98 Q198 94 200 104 Q192 107 185 98 Z" fill="#22c55e" />

        {/* Orange Citrus */}
        <circle cx="265" cy="145" r="26" fill="url(#orangeGrad)" />
        <circle cx="265" cy="145" r="24" fill="#f97316" opacity="0.4" />
        <ellipse cx="263" cy="122" rx="4" ry="2" fill="#15803d" />

        {/* Front Left Red Tomato */}
        <circle cx="160" cy="165" r="26" fill="url(#appleGrad)" />
        <path d="M158 140 L160 146 L164 140 L163 146 L168 142 L163 148 L156 148 Z" fill="#16a34a" />

        {/* Front Right Orange Carrot / Fruit */}
        <ellipse cx="235" cy="165" rx="24" ry="22" fill="url(#orangeGrad)" />

        {/* BASKET BODY */}
        <path
          d="M100 170 L120 260 C122 268 135 275 160 275 L240 275 C265 275 278 268 280 260 L300 170 Z"
          fill="url(#basketGrad)"
        />

        {/* Basket Woven Patterns */}
        <path d="M110 190 Q200 205 290 190" stroke="#78350f" strokeWidth="4" fill="none" opacity="0.7" />
        <path d="M115 215 Q200 230 285 215" stroke="#78350f" strokeWidth="4" fill="none" opacity="0.7" />
        <path d="M120 240 Q200 255 280 240" stroke="#78350f" strokeWidth="4" fill="none" opacity="0.7" />

        {/* Vertical Weave lines */}
        <line x1="140" y1="175" x2="150" y2="270" stroke="#92400e" strokeWidth="3" opacity="0.6" />
        <line x1="170" y1="175" x2="175" y2="273" stroke="#92400e" strokeWidth="3" opacity="0.6" />
        <line x1="200" y1="175" x2="200" y2="274" stroke="#92400e" strokeWidth="3" opacity="0.6" />
        <line x1="230" y1="175" x2="225" y2="273" stroke="#92400e" strokeWidth="3" opacity="0.6" />
        <line x1="260" y1="175" x2="250" y2="270" stroke="#92400e" strokeWidth="3" opacity="0.6" />

        {/* Basket Rim */}
        <rect x="90" y="165" width="220" height="15" rx="7.5" fill="url(#basketRim)" />
      </svg>
    </div>
  );
}
