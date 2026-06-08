import { useEffect, useState, useRef } from "react";

// The static rocket body
const ROCKET_BODY = `
       /\\
      /  \\
     |    |
     | /\\ |
     |/  \\|
    /|    |\\
   / |    | \\
  /__|    |__\\
      |  |
      |  |
     /|  |\\`.trim(); // Using trim to strip the first newline

// 3 frames of flickering exhaust
const FLAMES = [
  `
  ) ( ) ( )
 * ) ( * ) (
   ( * ) ( *
    ) * ( )
  `.trim(),
  `
  ( * ) * (
 ) ( ) ( ) (
   * ( ) *
    ( ) *
  `.trim(),
  `
  * ( ) * )
 ( * ) ( * )
   ) * ( *
    * ( )
  `.trim(),
];

export default function AsciiLaunchOverlay({ onComplete }) {
  const [flameIndex, setFlameIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // 1. Flame flickering interval
    const flameInterval = setInterval(() => {
      setFlameIndex((prev) => (prev + 1) % FLAMES.length);
    }, 100);

    // 2. Rocket upward animation loop
    const startTime = performance.now();
    const vh = window.innerHeight;
    
    // Start slightly below screen, target far above screen
    const startY = vh * 0.2; 

    const animate = (time) => {
      const elapsed = (time - startTime) / 1000; // in seconds
      
      // Acceleration formula: distance = 0.5 * a * t^2 + v0 * t
      // We want it to exit the screen in about 2 seconds.
      const acceleration = 1800; // pixels per second squared
      const initialVelocity = 50; // slow initial lift
      
      const distanceMoved = (0.5 * acceleration * elapsed * elapsed) + (initialVelocity * elapsed);
      const currentY = startY - distanceMoved;

      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(${currentY}px)`;
      }

      // If rocket has moved completely off screen top (e.g. -vh)
      if (currentY < -vh * 1.5) {
        // Rocket is gone, stop animation
        setShowText(true);
        // Wait a moment then redirect
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1200);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      clearInterval(flameInterval);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [onComplete]);

  return (
    <div className="ascii-launch-overlay">
      {!showText && (
        <div className="ascii-rocket-container" ref={containerRef}>
          <div className="ascii-rocket-body">{ROCKET_BODY}</div>
          <div className="ascii-flame">{FLAMES[flameIndex]}</div>
        </div>
      )}
      
      {showText && (
        <div className="ascii-terminal-readout">
          <p>{">"} systems online.</p>
          <p>{">"} loading portfolio...</p>
        </div>
      )}
    </div>
  );
}
