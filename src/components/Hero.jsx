import { identity } from "../data/content";

const ASCII_NAME = `
  ____  _   _    _    ___ _  __
 / ___|| | | |  / \\  |_ _| |/ /
 \\___ \\| |_| | / _ \\  | || ' / 
  ___) |  _  |/ ___ \\ | || . \\ 
 |____/|_| |_/_/   \\_\\___|_|\\_\\
`;

export default function Hero() {
  return (
    <section id="hero" aria-label="Terminal Boot">
      <div className="cli-prompt-line">
        <span className="cli-user">guest</span>
        <span className="cli-char">@</span>
        <span className="cli-host">portfolio</span>
        <span className="cli-char">:</span>
        <span className="cli-path">~</span>
        <span className="cli-char">$</span>
        <span className="cli-command">whoami --full</span>
      </div>

      <div className="cli-output">
        <div className="cli-ascii-art">{ASCII_NAME}</div>
        
        <div className="cli-output-block">
          <p><strong>NAME:</strong> {identity.name}</p>
          <p><strong>ROLE:</strong> {identity.role}</p>
          <p><strong>STATUS:</strong> ONLINE</p>
          <br />
          <p>{identity.intro}</p>
          <br />
          <p><em>Type `help` or scroll to explore the system.</em></p>
        </div>
      </div>
    </section>
  );
}
