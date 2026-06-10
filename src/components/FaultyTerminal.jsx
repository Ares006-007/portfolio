import React, { useEffect, useRef } from 'react';

export default function FaultyTerminal({
  scale = 3,
  scanlineIntensity = 1,
  glitchAmount = 2.6,
  flickerAmount = 1,
  curvature = 0.2,
  tint = "#ffffff",
  brightness = 1,
  digitSize = 4, 
  noiseAmp = 0,
  chromaticAberration = 0,
  dither = 0,
  mouseReact = false,
  mouseStrength = 0.2
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: 0 });

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || !mouseReact) return;

    let targetX = -1000, targetY = -1000;
    let currentX = -1000, currentY = -1000;
    let isActive = 0;
    let animId;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isActive = 1;
    };

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const loop = () => {
      currentX = lerp(currentX, targetX, 0.15);
      currentY = lerp(currentY, targetY, 0.15);
      
      const dx = currentX - targetX;
      const dy = currentY - targetY;
      const speedSq = dx * dx + dy * dy;

      if (speedSq < 1 && isActive > 0) {
        isActive = Math.max(0, isActive - 0.015);
      }

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${currentX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${currentY}px`);
        // Make the glow significantly brighter. mouseStrength = 0.2 usually, so we scale it up
        containerRef.current.style.setProperty('--mouse-active', isActive * (mouseStrength * 4));
      }
      mouseRef.current = { x: currentX, y: currentY, active: isActive };
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [mouseReact, mouseStrength]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    const chars = "01".split('');
    const fontSize = 10 * scale;
    const columns = width / fontSize;
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * height;
    }

    let frame = 0;
    const draw = () => {
      frame++;
      
      ctx.fillStyle = 'rgba(2, 2, 4, 0.15)';
      ctx.fillRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mActive = mouseRef.current.active;

      if (frame % 3 === 0) {
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          if (Math.random() > 0.65) continue; 
          
          let dropX = i * fontSize;
          let dropY = drops[i] * fontSize;
          
          let color = `rgba(108, 59, 255, ${0.4 * brightness * (glitchAmount / 2.6)})`;
          let charText = chars[Math.floor(Math.random() * chars.length)];

          if (mActive > 0) {
            const dx = dropX - mx;
            const dy = dropY - my;
            const distSq = dx * dx + dy * dy;
            const interactRadius = 250 * 250; // Huge radius for interaction

            if (distSq < interactRadius) {
              const dist = Math.sqrt(distSq);
              const intensity = (1 - dist / Math.sqrt(interactRadius)) * mActive;
              
              // Push characters away slightly
              const pushForce = intensity * 30 * mouseStrength;
              if (dist > 0) {
                dropX += (dx / dist) * pushForce;
                dropY += (dy / dist) * pushForce;
              }

              // Flash bright white/cyan near cursor
              const alpha = Math.min(1, (0.4 + intensity * 2) * brightness);
              color = `rgba(200, 230, 255, ${alpha})`;
              
              if (Math.random() < intensity) {
                 charText = Math.random() > 0.5 ? "X" : "█";
              }
            }
          }

          ctx.fillStyle = color;
          ctx.fillText(charText, dropX, dropY);

          if (drops[i] * fontSize > height && Math.random() > 0.95) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      // Draw local mouse glitch lines
      if (mActive > 0 && Math.random() < 0.2 * mActive) {
        const glitchY = my + (Math.random() - 0.5) * 100;
        ctx.fillStyle = `rgba(139, 92, 246, ${0.4 * mActive})`;
        ctx.fillRect(mx - 100, glitchY, 200, Math.random() * 5 * scale);
      }

      if (glitchAmount > 0 && Math.random() < 0.015 * (glitchAmount / 2.6)) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.03 * brightness})`;
        ctx.fillRect(0, Math.random() * height, width, Math.random() * 8 * scale);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isReducedMotion) {
      draw();
    } else {
      ctx.fillStyle = '#020204';
      ctx.fillRect(0, 0, width, height);
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scale, brightness, glitchAmount, mouseStrength]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#020204'
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          opacity: 0.8,
          filter: 'blur(1px)'
        }} 
      />

      {mouseReact && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle 350px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(139, 92, 246, var(--mouse-active, 0)), transparent 70%)',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }} />
      )}
      
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%)',
        backgroundSize: `100% ${3 * scale}px`,
        opacity: scanlineIntensity * 0.7,
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        boxShadow: `inset 0 0 ${180 * curvature}px rgba(0,0,0,0.98)`,
        pointerEvents: 'none'
      }} />

      <div 
        className="faulty-flicker"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(255,255,255,0.03)',
          opacity: 0,
          pointerEvents: 'none'
        }} 
      />

      <style>{`
        @keyframes crt-flicker-anim {
          0% { opacity: 0; }
          2% { opacity: 0.15; }
          4% { opacity: 0; }
          100% { opacity: 0; }
        }
        .faulty-flicker {
          animation: ${flickerAmount > 0 ? `crt-flicker-anim ${2.5 / flickerAmount}s infinite` : 'none'};
        }
        @media (prefers-reduced-motion: reduce) {
          .faulty-flicker {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
