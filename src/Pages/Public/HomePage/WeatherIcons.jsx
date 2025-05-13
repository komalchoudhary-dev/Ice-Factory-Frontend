import React from 'react';

export const WiDaySunny = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" fill="#FFD700" />
    <path d="M12 3V5M12 19V21M21 12H19M5 12H3M18.364 5.636L16.95 7.05M7.05 16.95L5.636 18.364M18.364 18.364L16.95 16.95M7.05 7.05L5.636 5.636" 
      stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const WiCloudy = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 16C3.567 16 2 14.433 2 12.5C2 10.567 3.567 9 5.5 9C5.55 9 5.6 9.001 5.65 9.002C6.153 6.677 8.287 5 10.75 5C13.482 5 15.726 7.057 15.972 9.727C16.1 9.712 16.23 9.705 16.361 9.705C18.919 9.705 21 11.786 21 14.344C21 16.902 18.919 18.982 16.361 18.982H5.5V16Z" 
      fill="#E0E0E0" stroke="white" strokeWidth="0.5"/>
  </svg>
);

export const WiRain = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 14C3.567 14 2 12.433 2 10.5C2 8.567 3.567 7 5.5 7C5.55 7 5.6 7.001 5.65 7.002C6.153 4.677 8.287 3 10.75 3C13.482 3 15.726 5.057 15.972 7.727C16.1 7.712 16.23 7.705 16.361 7.705C18.919 7.705 21 9.786 21 12.344C21 14.902 18.919 16.982 16.361 16.982H5.5V14Z" 
      fill="#B0C4DE" stroke="white" strokeWidth="0.5"/>
    <path d="M7 16v3M12 16v3M17 16v3" stroke="#4682B4" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const WiSnow = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 14C3.567 14 2 12.433 2 10.5C2 8.567 3.567 7 5.5 7C5.55 7 5.6 7.001 5.65 7.002C6.153 4.677 8.287 3 10.75 3C13.482 3 15.726 5.057 15.972 7.727C16.1 7.712 16.23 7.705 16.361 7.705C18.919 7.705 21 9.786 21 12.344C21 14.902 18.919 16.982 16.361 16.982H5.5V14Z" 
      fill="#E0E0E0" stroke="white" strokeWidth="0.5"/>
    <circle cx="7" cy="18" r="1" fill="white" />
    <circle cx="12" cy="18" r="1" fill="white" />
    <circle cx="17" cy="18" r="1" fill="white" />
  </svg>
);

export const WiThunderstorm = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 14C3.567 14 2 12.433 2 10.5C2 8.567 3.567 7 5.5 7C5.55 7 5.6 7.001 5.65 7.002C6.153 4.677 8.287 3 10.75 3C13.482 3 15.726 5.057 15.972 7.727C16.1 7.712 16.23 7.705 16.361 7.705C18.919 7.705 21 9.786 21 12.344C21 14.902 18.919 16.982 16.361 16.982H5.5V14Z" 
      fill="#708090" stroke="white" strokeWidth="0.5"/>
    <path d="M13 11L10 15h4l-3 4" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WiFog = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12h16M6 15h12M8 18h8M10 9h4" stroke="#C0C0C0" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const WiWindy = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 8h8.5c1.38 0 2.5 1.12 2.5 2.5S14.88 13 13.5 13H9" stroke="#A9A9A9" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 12h12.5c1.38 0 2.5 1.12 2.5 2.5S16.88 17 15.5 17H12" stroke="#A9A9A9" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 16h8.5c1.38 0 2.5 1.12 2.5 2.5S16.88 21 15.5 21H12" stroke="#A9A9A9" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const WiHumidity = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3.5C11 5.5 7 10.5 7 14.5C7 17.8137 9.23858 20.5 12 20.5C14.7614 20.5 17 17.8137 17 14.5C17 10.5 13 5.5 12 3.5Z" 
      stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="rgba(255,255,255,0.2)" />
  </svg>
);

export const WiThermometer = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 14.76V3.5C14 2.12 12.88 1 11.5 1S9 2.12 9 3.5v11.26c-1.81 1.05-2.5 3.29-1.56 5.17S10.5 23 12.5 23s3.75-1.29 4.06-3.17c.31-1.88-.38-3.77-2.06-4.83v-0.24z" 
      stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="rgba(255,255,255,0.2)" />
    <path d="M12 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" fill="white" />
  </svg>
);