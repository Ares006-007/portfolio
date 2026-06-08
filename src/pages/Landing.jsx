import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DitherBackground from "../components/DitherBackground";
import AsciiLaunchOverlay from "../components/AsciiLaunchOverlay";

// ============================================================
// Landing Page — Dither intro → Quote → Hidden discovery button
// ============================================================
export default function Landing() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("intro"); // intro → quote → active
  const [isLaunching, setIsLaunching] = useState(false);
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
    if (phase !== "active" || isLaunching) return;

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
  }, [phase, isLaunching]);

  // High-performance DOM animation loop for button opacity
  useEffect(() => {
    let animId;
    const loop = () => {
      if (isLaunching) return; // Stop updating if launching
      
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
  }, [isLaunching]);

  // Trigger launch sequence
  function enterPortfolio() {
    if (reducedMotion.current) {
      navigate("/portfolio");
    } else {
      setIsLaunching(true);
    }
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
      {/* If launching, the overlay takes over visually */}
      {isLaunching && <AsciiLaunchOverlay onComplete={() => navigate("/portfolio")} />}
      
      <DitherBackground samplePct={buttonPct} onSample={handleSample} />

      {/* Quote overlay */}
      <div
        className={`landing-content ${phase === "quote" || phase === "active" ? "visible" : ""}`}
        style={{ opacity: isLaunching ? 0 : undefined, transition: "opacity 0.3s ease" }}
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
        className={`landing-discovery-prompt ${phase === "active" && !isLaunching ? "visible" : ""}`}
      >
        <span>Move your cursor. Find the way in.</span>
      </div>

      {/* Hidden button tied to Dither pockets */}
      {phase === "active" && !isLaunching && (
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
      {!isLaunching && (
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
      )}
    </div>
  );
}
