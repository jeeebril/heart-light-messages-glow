
import React, { useState, useEffect, useRef } from 'react';
import { SupportMessage } from './SupportMessage';

const supportMessages = [
  "You are stronger than you know",
  "Every small step counts",
  "Your potential is limitless", 
  "You've got this, keep going",
  "Believe in yourself always",
  "Progress, not perfection",
  "You are enough, exactly as you are",
  "Your hard work will pay off",
  "Stay focused on your dreams",
  "You're making a difference",
  "Keep your head up, warrior",
  "Your courage inspires others",
  "You're closer than you think",
  "Trust the process, trust yourself",
  "You're writing your own story"
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
      
      positions.push({
        id: i,
        x: Math.max(5, Math.min(95, baseX + offsetX)),
        y: Math.max(5, Math.min(95, baseY + offsetY))
      });
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
      className="relative w-full h-screen overflow-hidden cursor-none"
      style={{
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
        />
      ))}

      {/* Heart-shaped light with proper boundaries */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-100"
        style={{
          left: lightPosition.x - 60,
          top: lightPosition.y - 60,
          filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.9))',
        }}
      >
        <div
          className="w-32 h-32 cursor-pointer pointer-events-auto relative"
          onClick={handleHeartClick}
          style={{
            background: `radial-gradient(ellipse 40% 35% at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 70%),
                        radial-gradient(ellipse 40% 35% at 70% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 70%),
                        radial-gradient(ellipse 60% 80% at 50% 60%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 80%)`,
            clipPath: 'path("M64,100 C64,85 49,70 34,70 C19,70 4,85 4,100 C4,115 64,160 64,160 C64,160 124,115 124,100 C124,85 109,70 94,70 C79,70 64,85 64,100 Z")',
            transform: 'scale(0.9)',
          }}
        >
          {/* Heart outline for better definition */}
          <div
            className="absolute inset-0 border-2 border-white/40"
            style={{
              clipPath: 'path("M64,100 C64,85 49,70 34,70 C19,70 4,85 4,100 C4,115 64,160 64,160 C64,160 124,115 124,100 C124,85 109,70 94,70 C79,70 64,85 64,100 Z")',
            }}
          />
        </div>
      </div>

      {/* Enhanced light beam effect with heart shape */}
      <div
        className="fixed pointer-events-none z-40"
        style={{
          left: lightPosition.x - 100,
          top: lightPosition.y - 100,
          width: 200,
          height: 200,
          background: `radial-gradient(ellipse 35% 30% at 35% 35%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 70%),
                      radial-gradient(ellipse 35% 30% at 65% 35%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 70%),
                      radial-gradient(ellipse 50% 60% at 50% 55%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 50%, transparent 80%)`,
          clipPath: 'path("M100,130 C100,115 85,100 70,100 C55,100 40,115 40,130 C40,145 100,190 100,190 C100,190 160,145 160,130 C160,145 145,100 130,100 C115,100 100,115 100,130 Z")',
        }}
      />
    </div>
  );
};
