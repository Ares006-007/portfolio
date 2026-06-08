import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DitherBackground from "../components/DitherBackground";

// ============================================================
// Landing Page — Dither intro → Quote → Hidden discovery button
// ============================================================
export default function Landing() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("intro"); // intro → quote → active
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const reducedMotion = useRef(false);

  // Single random anchor position (percentage-based) chosen once per refresh
  const [buttonPct] = useState(() => ({
    // Keep it somewhat lower/side so it doesn't overlap text
    x: 0.65 + Math.random() * 0.25, // 65% to 90%
    y: 0.60 + Math.random() * 0.25, // 60% to 85%
  }));

  const opacityRef = useRef(0);
  const targetOpacityRef = useRef(0);
  const persistTimeoutRef = useRef(null);

  // Phase transitions
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;

    const introDelay = reducedMotion.current ? 500 : 2000;
    const quoteDelay = reducedMotion.current ? 300 : 1500;

    const t1 = setTimeout(() => setPhase("quote"), introDelay);
    const t2 = setTimeout(() => setPhase("active"), introDelay + quoteDelay);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Handle density sampling from the WebGL background
  const handleSample = useCallback((redVal) => {
    if (phase !== "active") return;

    // Based on shader palette: c0 (empty void) is red ~5, c1 is ~20
    // If it's <= 25, it's considered an empty pocket
    const isEmpty = redVal <= 25;

    if (isEmpty) {
      targetOpacityRef.current = 1.0;
      
      // Keep it visible for a short window even if the pocket slightly shifts
      if (persistTimeoutRef.current) clearTimeout(persistTimeoutRef.current);
      persistTimeoutRef.current = setTimeout(() => {
        targetOpacityRef.current = 0.0;
      }, 600); 
    }
  }, [phase]);

  // High-performance DOM animation loop for button opacity
  useEffect(() => {
    let animId;
    const loop = () => {
      // Smooth interpolation
      opacityRef.current += (targetOpacityRef.current - opacityRef.current) * 0.1;
      
      if (buttonRef.current) {
        const op = opacityRef.current;
        buttonRef.current.style.opacity = op;
        buttonRef.current.style.transform = `translate(-50%, -50%) scale(${0.8 + op * 0.2})`;
        buttonRef.current.style.pointerEvents = op > 0.15 ? "auto" : "none";
      }
      animId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Enter portfolio
  function enterPortfolio() {
    navigate("/portfolio");
  }

  // Keyboard accessibility
  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      enterPortfolio();
    }
  }

  return (
    <div className="landing-wrapper" ref={containerRef}>
      <DitherBackground samplePct={buttonPct} onSample={handleSample} />

      {/* Quote overlay */}
      <div
        className={`landing-content ${phase === "quote" || phase === "active" ? "visible" : ""}`}
      >
        <div className="landing-quote-block">
          <p className="landing-arabic" dir="rtl" lang="ar">
            مَن طَلَبَ العُلا سَهِرَ الليالي
          </p>
          <p className="landing-translation">
            He who seeks greatness must endure the sleepless nights.
          </p>
        </div>
      </div>

      {/* Discovery prompt */}
      <div
        className={`landing-discovery-prompt ${phase === "active" ? "visible" : ""}`}
      >
        <span>Move your cursor. Find the way in.</span>
      </div>

      {/* Hidden button tied to Dither pockets */}
      {phase === "active" && (
        <button
          ref={buttonRef}
          className="landing-hidden-btn"
          onClick={enterPortfolio}
          onKeyDown={handleKeyDown}
          onFocus={() => (targetOpacityRef.current = 1.0)}
          onBlur={() => (targetOpacityRef.current = 0.0)}
          tabIndex={0}
          aria-label="Enter portfolio"
          style={{
            left: `${buttonPct.x * 100}vw`,
            top: `${buttonPct.y * 100}vh`,
            opacity: 0, // JS animation loop handles this
            pointerEvents: "none",
          }}
        >
          <span className="landing-btn-glow" />
          <span className="landing-btn-text">enter</span>
        </button>
      )}

      {/* Skip for accessibility — always available via keyboard */}
      <a
        href="/portfolio"
        className="landing-skip"
        onClick={(e) => {
          e.preventDefault();
          enterPortfolio();
        }}
      >
        Skip to portfolio
      </a>
    </div>
  );
}
