import React from 'react';

interface SolanaLogoProps {
  className?: string;
  size?: number;
}

const SolanaLogo: React.FC<SolanaLogoProps> = ({ className = "", size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top bar */}
      <path 
        d="M15 25 L85 25 L70 40 L0 40 Z" 
        fill="currentColor"
      />
      {/* Middle bar */}
      <path 
        d="M0 50 L70 50 L85 65 L15 65 Z" 
        fill="currentColor"
      />
      {/* Bottom bar */}
      <path 
        d="M15 75 L85 75 L70 90 L0 90 Z" 
        fill="currentColor"
      />
    </svg>
  );
};

export default SolanaLogo;