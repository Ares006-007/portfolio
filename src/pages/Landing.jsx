import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DitherBackground from "../components/DitherBackground";

// ============================================================
// Landing Page — Dither intro → Quote → Hidden discovery button
// ============================================================
export default function Landing() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("intro"); // intro → quote → active
  const [buttonOpacity, setButtonOpacity] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);
  const [fallbackActive, setFallbackActive] = useState(false);
  const buttonRef = useRef(null);
  const buttonPosRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const reducedMotion = useRef(false);
  const isMobile = useRef(false);

  // Detect reduced motion and mobile
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;

    isMobile.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Phase transitions
    const introDelay = reducedMotion.current ? 500 : 2000;
    const quoteDelay = reducedMotion.current ? 300 : 1500;

    const t1 = setTimeout(() => setPhase("quote"), introDelay);
    const t2 = setTimeout(() => setPhase("active"), introDelay + quoteDelay);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Place hidden button at a discoverable position
  useEffect(() => {
    function placeButton() {
      // Place in the lower-right quadrant — discoverable but not obvious
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      buttonPosRef.current = {
        x: vw * 0.7 + Math.random() * (vw * 0.15),
        y: vh * 0.65 + Math.random() * (vh * 0.15),
      };
    }
    placeButton();
    window.addEventListener("resize", placeButton);
    return () => window.removeEventListener("resize", placeButton);
  }, []);

  // Fallback: after 12 seconds, make button easier to find
  useEffect(() => {
    if (phase !== "active") return;

    const fallbackTimer = setTimeout(() => {
      setFallbackActive(true);
    }, 12000);

    // On mobile, show hint faster and make button more visible
    let mobileTimer;
    if (isMobile.current) {
      mobileTimer = setTimeout(() => {
        setFallbackActive(true);
        setHintVisible(true);
      }, 5000);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, [phase]);

  // Mouse proximity detection for button reveal
  const handleMouseMove = useCallback(
    (e) => {
      if (phase !== "active") return;

      const bx = buttonPosRef.current.x;
      const by = buttonPosRef.current.y;
      const dist = Math.sqrt((e.clientX - bx) ** 2 + (e.clientY - by) ** 2);

      // Reveal radius: 200px for glow, 120px for solid visibility
      const maxRadius = 220;
      if (dist < maxRadius) {
        const opacity = Math.max(0, 1 - dist / maxRadius);
        setButtonOpacity(Math.min(1, opacity * 1.5));
        if (opacity > 0.3) setHintVisible(true);
      } else {
        setButtonOpacity((prev) => Math.max(0, prev - 0.02));
      }
    },
    [phase]
  );

  // Touch proximity for mobile
  const handleTouchMove = useCallback(
    (e) => {
      if (phase !== "active" || !e.touches.length) return;
      const touch = e.touches[0];
      const bx = buttonPosRef.current.x;
      const by = buttonPosRef.current.y;
      const dist = Math.sqrt(
        (touch.clientX - bx) ** 2 + (touch.clientY - by) ** 2
      );

      const maxRadius = 160;
      if (dist < maxRadius) {
        const opacity = Math.max(0, 1 - dist / maxRadius);
        setButtonOpacity(Math.min(1, opacity * 2));
        setHintVisible(true);
      }
    },
    [phase]
  );

  // Enter portfolio
  function enterPortfolio() {
    navigate("/portfolio");
  }

  // Keyboard accessibility: allow Tab + Enter
  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      enterPortfolio();
    }
  }

  const baseButtonOpacity = fallbackActive
    ? Math.max(buttonOpacity, 0.35)
    : buttonOpacity;

  return (
    <div
      className="landing-wrapper"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <DitherBackground />

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

      {/* Hidden button */}
      {phase === "active" && (
        <button
          ref={buttonRef}
          className="landing-hidden-btn"
          onClick={enterPortfolio}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label="Enter portfolio"
          style={{
            left: `${buttonPosRef.current.x}px`,
            top: `${buttonPosRef.current.y}px`,
            opacity: baseButtonOpacity,
            transform: `translate(-50%, -50%) scale(${0.8 + baseButtonOpacity * 0.2})`,
            pointerEvents: baseButtonOpacity > 0.15 ? "auto" : "none",
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
