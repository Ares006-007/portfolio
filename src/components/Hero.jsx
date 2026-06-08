import DitherBackground from "./DitherBackground";
import { identity } from "../data/content";

export default function Hero() {
  return (
    <section className="hero-wrapper" id="hero" aria-label="Hero">
      <DitherBackground />

      <div className="hero-content">
        <div className="hero-backdrop">
          <h1 className="hero-name">{identity.name}</h1>
          <p className="hero-role">{identity.role}</p>
          <p className="hero-intro">{identity.intro}</p>

          <div className="hero-ctas">
            <a href="#projects" className="btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn-secondary">
              Contact
            </a>
          </div>

          <div className="hero-prompt">
            <span>{identity.terminalPrompt} </span>
            <span className="hero-cursor" aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span>scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
