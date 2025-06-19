
import React from 'react';

interface SupportMessageProps {
  message: string;
  position: { x: number; y: number; isPink?: boolean };
  lightPosition: { x: number; y: number };
  isPink?: boolean;
}

export const SupportMessage: React.FC<SupportMessageProps> = ({
  message,
  position,
  lightPosition,
  isPink = false,
}) => {
  // Calculate distance from light to message
  const messageX = (position.x / 100) * window.innerWidth;
  const messageY = (position.y / 100) * window.innerHeight;
  const distance = Math.sqrt(
    Math.pow(lightPosition.x - messageX, 2) + Math.pow(lightPosition.y - messageY, 2)
  );

  // Show message when light is within 140px for better visibility
  const isVisible = distance < 140;
  const opacity = isVisible ? Math.max(0, 1 - distance / 140) : 0;

  return (
    <div
      className="absolute z-30 transition-opacity duration-300 pointer-events-none select-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity: opacity,
      }}
    >
      <div className={`px-5 py-3 backdrop-blur-md rounded-xl border shadow-xl ${
        isPink 
          ? 'bg-pink-500/20 border-pink-300/40' 
          : 'bg-white/12 border-white/25'
      }`}>
        <p className={`text-sm font-semibold whitespace-nowrap text-center tracking-wide ${
          isPink 
            ? 'text-pink-300' 
            : 'text-white'
        }`}>
          {message}
        </p>
      </div>
    </div>
  );
};
