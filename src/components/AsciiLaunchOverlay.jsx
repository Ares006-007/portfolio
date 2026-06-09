import { useEffect, useState, useRef, useCallback } from "react";

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
     /|  |\\`.trim();

// System check lines to type out
const SYSTEM_LINES = [
  "initializing systems...",
  "checking payload...",
  "fuel levels nominal...",
  "trajectory locked...",
  "all systems go."
];

// Exhaust characters for randomization
const EXHAUST_CHARS = ["*", ")", "(", "~", "`", "'", ",", ".", "^"];

export default function AsciiLaunchOverlay({ onComplete }) {
  // Phases: blackout -> booting -> launching -> redirecting
  const [phase, setPhase] = useState("blackout");

  // Typewriter state
  const [typedLines, setTypedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showReady, setShowReady] = useState(false);

  // Rocket state
  const [exhaustPattern, setExhaustPattern] = useState("");
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  // Helper to generate random exhaust
  const generateExhaust = useCallback(() => {
    let pattern = "";
    // Generate 4 lines of exhaust with decreasing width
    const widths = [9, 7, 5, 3];
    for (let w of widths) {
      let line = "";
      const padding = " ".repeat((9 - w) / 2 + 3); // center it roughly
      for (let i = 0; i < w; i++) {
        // 30% chance for a blank space for organic gaps
        if (Math.random() > 0.7) line += " ";
        else line += EXHAUST_CHARS[Math.floor(Math.random() * EXHAUST_CHARS.length)];
      }
      pattern += padding + line + "\n";
    }
    return pattern;
  }, []);

  // Phase 1: Blackout
  useEffect(() => {
    if (phase === "blackout") {
      const t = setTimeout(() => {
        setPhase("booting");
      }, 600); // 600ms blackout fade
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Phase 2: Booting (Typewriter)
  useEffect(() => {
    if (phase !== "booting") return;

    if (currentLineIndex < SYSTEM_LINES.length) {
      const fullLine = SYSTEM_LINES[currentLineIndex];
      
      if (currentCharIndex < fullLine.length) {
        // Typing out characters
        const t = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, 30 + Math.random() * 40); // Fast, slightly variable typing speed
        return () => clearTimeout(t);
      } else {
        // Line finished typing, wait a moment then append [OK]
        const t = setTimeout(() => {
          setTypedLines((prev) => [...prev, fullLine + "               [OK]"]);
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 200 + Math.random() * 200);
        return () => clearTimeout(t);
      }
    } else if (!showReady) {
      // All lines done, show READY TO LAUNCH
      const t = setTimeout(() => {
        setShowReady(true);
        // Then proceed to launch
        setTimeout(() => {
          setPhase("launching");
        }, 800);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [phase, currentLineIndex, currentCharIndex, showReady]);

  // Phase 3: Launching (Rocket Animation)
  useEffect(() => {
    if (phase !== "launching") return;

    // Start exhaust flicker
    const flameInterval = setInterval(() => {
      setExhaustPattern(generateExhaust());
    }, 80); // flicker speed

    const startTime = performance.now();
    const vh = window.innerHeight;
    const startY = vh * 0.2; 

    const animate = (time) => {
      const elapsed = (time - startTime) / 1000;
      const acceleration = 1800;
      const initialVelocity = 50;
      
      const distanceMoved = (0.5 * acceleration * elapsed * elapsed) + (initialVelocity * elapsed);
      const currentY = startY - distanceMoved;

      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(${currentY}px)`;
      }

      if (currentY < -vh * 1.5) {
        setPhase("redirecting");
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      clearInterval(flameInterval);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [phase, generateExhaust]);

  // Phase 4: Redirecting
  useEffect(() => {
    if (phase === "redirecting") {
      const t = setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <div className={`ascii-launch-overlay ${phase === "blackout" ? "entering" : ""}`}>
      {phase === "booting" && (
        <div className="ascii-terminal-boot">
          {typedLines.map((line, i) => (
            <p key={i}>{">"} {line}</p>
          ))}
          {currentLineIndex < SYSTEM_LINES.length && (
            <p>
              {">"} {SYSTEM_LINES[currentLineIndex].slice(0, currentCharIndex)}
              <span className="terminal-cursor">_</span>
            </p>
          )}
          {showReady && (
            <p className="terminal-ready"><br/>READY TO LAUNCH.</p>
          )}
        </div>
      )}

      {phase === "launching" && (
        <div className="ascii-rocket-container" ref={containerRef}>
          <div className="ascii-rocket-body">{ROCKET_BODY}</div>
          <div className="ascii-flame">{exhaustPattern}</div>
        </div>
      )}
      
      {phase === "redirecting" && (
        <div className="ascii-terminal-readout">
          <p>{">"} redirecting to portfolio...</p>
        </div>
      )}
    </div>
  );
}
