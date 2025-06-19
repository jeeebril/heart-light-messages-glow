
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

      {/* Enhanced heart-shaped light beam effect */}
      <div
        className="fixed pointer-events-none z-40"
        style={{
          left: lightPosition.x - 120,
          top: lightPosition.y - 120,
          width: 240,
          height: 240,
          background: `
            radial-gradient(ellipse 25% 20% at 35% 35%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 60%, transparent 80%),
            radial-gradient(ellipse 25% 20% at 65% 35%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 60%, transparent 80%),
            radial-gradient(ellipse 45% 55% at 50% 55%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 70%, transparent 90%)
          `,
          clipPath: 'path("M120,144 C120,120 105,96 80,96 C55,96 40,120 40,144 C40,168 120,224 120,224 C120,224 200,168 200,144 C200,120 185,96 160,96 C135,96 120,120 120,144 Z")',
        }}
      />

      {/* Main heart light - enhanced and smaller */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-100"
        style={{
          left: lightPosition.x - 60,
          top: lightPosition.y - 60,
          filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.6))',
        }}
      >
        <div
          className="w-28 h-28 cursor-pointer pointer-events-auto relative"
          onClick={handleHeartClick}
          style={{
            background: `
              radial-gradient(ellipse 30% 25% at 35% 35%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0.2) 70%, transparent 85%),
              radial-gradient(ellipse 30% 25% at 65% 35%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0.2) 70%, transparent 85%),
              radial-gradient(ellipse 55% 65% at 50% 60%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 90%)
            `,
            clipPath: 'path("M56,72 C56,60 49,48 38,48 C27,48 20,60 20,72 C20,84 56,120 56,120 C56,120 92,84 92,72 C92,60 85,48 74,48 C63,48 56,60 56,72 Z")',
            backdropFilter: 'blur(1px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.4),
              inset 0 -1px 0 rgba(255, 255, 255, 0.1),
              0 0 20px rgba(255, 255, 255, 0.3)
            `,
          }}
        >
          {/* Enhanced inner highlights for more realistic glass effect */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 20% 15% at 40% 40%, rgba(255, 255, 255, 0.7) 0%, transparent 60%),
                radial-gradient(ellipse 20% 15% at 60% 40%, rgba(255, 255, 255, 0.7) 0%, transparent 60%),
                linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)
              `,
              clipPath: 'inherit',
            }}
          />
          
          {/* Sharp edge highlights */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(45deg, rgba(255, 255, 255, 0.6) 0%, transparent 30%),
                linear-gradient(-45deg, rgba(255, 255, 255, 0.4) 0%, transparent 25%)
              `,
              clipPath: 'inherit',
            }}
          />
        </div>
      </div>
    </div>
  );
};
