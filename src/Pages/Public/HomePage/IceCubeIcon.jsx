import React from 'react';

export const IceCubeIcon = () => {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <path d="M8 6H28V26H8V6Z" fill="url(#paint0_linear)" />
        <path d="M8 6L18 11L28 6" stroke="#A0D4FF" strokeWidth="0.5" />
        <path d="M18 11V31" stroke="#A0D4FF" strokeWidth="0.5" />
        <path d="M8 6V26L18 31L28 26V6L18 11L8 6Z" stroke="#A0D4FF" strokeWidth="1" />
      </g>
      <defs>
        <filter id="filter0_d" x="3.5" y="3.5" width="29" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.137 0 0 0 0 0.392 0 0 0 0 0.667 0 0 0 0.3 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient id="paint0_linear" x1="18" y1="6" x2="18" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E1F5FE" stopOpacity="0.8" />
          <stop offset="1" stopColor="#BBDEFB" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  );
};