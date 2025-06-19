
import React, { useState, useEffect, useRef } from 'react';
import { SupportMessage } from './SupportMessage';

const supportMessages = [
  "You are stronger than you know",
  "Every small step counts",
  "Your potential is limitless", 
  "You've got this",
  "Believe in yourself",
  "Progress, not perfection",
  "You are enough",
  "Keep going",
  "Stay focused",
  "You're making a difference",
  "Keep your head up",
  "You inspire others",
  "You're almost there",
  "Trust yourself",
  "I'm proud of you"
];

export const HeartLight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragMode, setIsDragMode] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate well-distributed positions across the entire screen
  const [messagePositions] = useState(() => {
    const positions = [];
    const gridCols = 4;
    const gridRows = 4;
    
    for (let i = 0; i < supportMessages.length; i++) {
      const col = i % gridCols;
      const row = Math.floor(i / gridCols);
      
      // Add randomization within grid cells to avoid perfect alignment
      const baseX = (col / (gridCols - 1)) * 80 + 10; // 10% to 90%
      const baseY = (row / (gridRows - 1)) * 80 + 10; // 10% to 90%
      
      // Add random offset within the cell
      const offsetX = (Math.random() - 0.5) * 15;
      const offsetY = (Math.random() - 0.5) * 15;
      
      // Special positioning for "I'm proud of you" message (hidden in corner)
      if (supportMessages[i] === "I'm proud of you") {
        positions.push({
          id: i,
          x: 85,
          y: 15,
          isPink: true
        });
      } else {
        positions.push({
          id: i,
          x: Math.max(5, Math.min(95, baseX + offsetX)),
          y: Math.max(5, Math.min(95, baseY + offsetY)),
          isPink: false
        });
      }
    }
    
    return positions;
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragMode) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (isDragMode) {
        setDragPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [isDragMode]);

  const lightPosition = isDragMode ? dragPosition : mousePosition;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragMode(!isDragMode);
    if (!isDragMode) {
      setDragPosition({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{
        cursor: isDragMode ? 'grabbing' : 'none',
        backgroundImage: `url('/lovable-uploads/fb477549-7c7e-4991-b73f-0b064bc3bdda.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/90 z-10" />
      
      {/* Support Messages */}
      {supportMessages.map((message, index) => (
        <SupportMessage
          key={index}
          message={message}
          position={messagePositions[index]}
          lightPosition={lightPosition}
          isPink={messagePositions[index].isPink}
        />
      ))}

      {/* Enhanced heart-shaped light */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-100"
        style={{
          left: lightPosition.x - 60,
          top: lightPosition.y - 60,
          filter: 'drop-shadow(0 0 60px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.7))',
        }}
      >
        <div
          className="w-32 h-32 cursor-pointer pointer-events-auto relative"
          onClick={handleHeartClick}
          style={{
            background: `radial-gradient(ellipse 45% 40% at 35% 35%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.3) 60%, transparent 80%),
                        radial-gradient(ellipse 45% 40% at 65% 35%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.3) 60%, transparent 80%),
                        radial-gradient(ellipse 70% 90% at 50% 65%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0.2) 70%, transparent 90%)`,
            clipPath: 'path("M64,100 C64,85 49,70 34,70 C19,70 4,85 4,100 C4,115 64,160 64,160 C64,160 124,115 124,100 C124,85 109,70 94,70 C79,70 64,85 64,100 Z")',
            transform: 'scale(0.9)',
          }}
        />
      </div>

      {/* Enhanced light beam effect with heart shape */}
      <div
        className="fixed pointer-events-none z-40"
        style={{
          left: lightPosition.x - 120,
          top: lightPosition.y - 120,
          width: 240,
          height: 240,
          background: `radial-gradient(ellipse 40% 35% at 35% 35%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%),
                      radial-gradient(ellipse 40% 35% at 65% 35%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%),
                      radial-gradient(ellipse 60% 80% at 50% 60%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 80%)`,
          clipPath: 'path("M120,140 C120,120 100,100 80,100 C60,100 40,120 40,140 C40,160 120,220 120,220 C120,220 200,160 200,140 C200,120 180,100 160,100 C140,100 120,120 120,140 Z")',
        }}
      />
    </div>
  );
};
