
import React, { useState, useEffect, useRef } from 'react';
import { SupportMessage } from './SupportMessage';

const supportMessages = [
  "You are stronger than you know",
  "Every small step counts",
  "You've got this",
  "Believe in yourself",
  "Progress, not perfection",
  "You are enough",
  "Keep going",
  "Stay focused",
  "You're making a difference",
  "Keep your head up",
  "You inspire others",
  "Trust yourself",
  "I'm proud of you"
];

export const HeartLight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragMode, setIsDragMode] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate better distributed positions across the entire screen
  const [messagePositions] = useState(() => {
    const positions = [];
    const margins = { top: 8, bottom: 8, left: 8, right: 8 };
    
    // Create more spread out positions
    const areas = [
      // Top area
      { x: 15, y: 12 }, { x: 85, y: 8 }, { x: 45, y: 15 },
      // Middle-top area  
      { x: 25, y: 35 }, { x: 75, y: 30 }, { x: 12, y: 45 },
      // Middle area
      { x: 88, y: 55 }, { x: 35, y: 65 }, { x: 65, y: 40 },
      // Bottom area
      { x: 20, y: 85 }, { x: 80, y: 90 }, { x: 50, y: 78 },
      // Special pink message in corner
      { x: 85, y: 15, isPink: true }
    ];

    supportMessages.forEach((message, i) => {
      if (message === "I'm proud of you") {
        positions.push({
          id: i,
          x: 85,
          y: 15,
          isPink: true
        });
      } else if (areas[i]) {
        positions.push({
          id: i,
          x: areas[i].x,
          y: areas[i].y,
          isPink: false
        });
      }
    });
    
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
          isPink={messagePositions[index]?.isPink}
        />
      ))}

      {/* Realistic glassy heart-shaped light */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-100"
        style={{
          left: lightPosition.x - 80,
          top: lightPosition.y - 80,
          filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.8))',
        }}
      >
        <div
          className="w-40 h-40 cursor-pointer pointer-events-auto relative"
          onClick={handleHeartClick}
          style={{
            background: `
              radial-gradient(ellipse 35% 30% at 35% 35%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 50%, transparent 80%),
              radial-gradient(ellipse 35% 30% at 65% 35%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 50%, transparent 80%),
              radial-gradient(ellipse 60% 70% at 50% 60%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 60%, transparent 90%)
            `,
            clipPath: 'path("M80,120 C80,100 65,80 50,80 C35,80 20,100 20,120 C20,140 80,200 80,200 C80,200 140,140 140,120 C140,100 125,80 110,80 C95,80 80,100 80,120 Z")',
            transform: 'scale(0.8)',
            backdropFilter: 'blur(2px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          }}
        >
          {/* Inner glow for more depth */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 25% 20% at 40% 40%, rgba(255, 255, 255, 0.6) 0%, transparent 70%),
                radial-gradient(ellipse 25% 20% at 60% 40%, rgba(255, 255, 255, 0.6) 0%, transparent 70%)
              `,
              clipPath: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Enhanced heart-shaped light beam effect */}
      <div
        className="fixed pointer-events-none z-40"
        style={{
          left: lightPosition.x - 150,
          top: lightPosition.y - 150,
          width: 300,
          height: 300,
          background: `
            radial-gradient(ellipse 30% 25% at 35% 35%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 60%, transparent 80%),
            radial-gradient(ellipse 30% 25% at 65% 35%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 60%, transparent 80%),
            radial-gradient(ellipse 50% 60% at 50% 55%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 70%, transparent 90%)
          `,
          clipPath: 'path("M150,180 C150,150 125,120 100,120 C75,120 50,150 50,180 C50,210 150,280 150,280 C150,280 250,210 250,180 C250,150 225,120 200,120 C175,120 150,150 150,180 Z")',
        }}
      />
    </div>
  );
};
