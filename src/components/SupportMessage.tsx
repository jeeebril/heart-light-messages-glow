
import React from 'react';

interface SupportMessageProps {
  message: string;
  position: { x: number; y: number };
  lightPosition: { x: number; y: number };
}

export const SupportMessage: React.FC<SupportMessageProps> = ({
  message,
  position,
  lightPosition,
}) => {
  // Calculate distance from light to message
  const messageX = (position.x / 100) * window.innerWidth;
  const messageY = (position.y / 100) * window.innerHeight;
  const distance = Math.sqrt(
    Math.pow(lightPosition.x - messageX, 2) + Math.pow(lightPosition.y - messageY, 2)
  );

  // Show message when light is within 120px
  const isVisible = distance < 120;
  const opacity = isVisible ? Math.max(0, 1 - distance / 120) : 0;

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
      <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg">
        <p className="text-white text-sm font-medium whitespace-nowrap text-center">
          {message}
        </p>
      </div>
    </div>
  );
};
