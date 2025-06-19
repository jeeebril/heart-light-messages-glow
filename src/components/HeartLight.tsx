
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
  "You're writing your own story",
  "Every challenge makes you stronger",
  "Your mindset is your superpower",
  "You're destined for greatness",
  "Keep shining your light",
  "You're exactly where you need to be",
  "Your efforts are not in vain",
  "You have everything you need inside",
  "This too shall pass, you'll overcome",
  "Your resilience is remarkable",
  "You're braver than you believe"
];

export const HeartLight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragMode, setIsDragMode] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random positions for messages
  const [messagePositions] = useState(() => 
    supportMessages.map((_, index) => ({
      id: index,
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      y: Math.random() * 80 + 10, // 10% to 90% of screen height
    }))
  );

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
      <div className="absolute inset-0 bg-black/85 z-10" />
      
      {/* Support Messages */}
      {supportMessages.map((message, index) => (
        <SupportMessage
          key={index}
          message={message}
          position={messagePositions[index]}
          lightPosition={lightPosition}
        />
      ))}

      {/* Heart-shaped light */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-100"
        style={{
          left: lightPosition.x - 40,
          top: lightPosition.y - 40,
          filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))',
        }}
      >
        <div
          className="w-20 h-20 cursor-pointer pointer-events-auto relative"
          onClick={handleHeartClick}
          style={{
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 40%, rgba(255, 255, 255, 0.2) 70%, transparent 100%)`,
            clipPath: 'path("M40,60 C40,45 25,30 10,30 C-5,30 -20,45 -20,60 C-20,75 40,120 40,120 C40,120 100,75 100,60 C100,45 85,30 70,30 C55,30 40,45 40,60 Z")',
            transform: 'scale(0.8)',
          }}
        >
          {/* Heart outline for better visibility */}
          <div
            className="absolute inset-0 border-2 border-white/60"
            style={{
              clipPath: 'path("M40,60 C40,45 25,30 10,30 C-5,30 -20,45 -20,60 C-20,75 40,120 40,120 C40,120 100,75 100,60 C100,45 85,30 70,30 C55,30 40,45 40,60 Z")',
            }}
          />
        </div>
      </div>

      {/* Light beam effect */}
      <div
        className="fixed pointer-events-none z-40"
        style={{
          left: lightPosition.x - 150,
          top: lightPosition.y - 150,
          width: 300,
          height: 300,
          background: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 30%, transparent 60%)`,
          borderRadius: '50%',
        }}
      />
    </div>
  );
};
