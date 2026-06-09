import { skills } from "../data/content";

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills and Stack">
      <div className="cli-prompt-line">
        <span className="cli-user">guest</span>
        <span className="cli-char">@</span>
        <span className="cli-host">portfolio</span>
        <span className="cli-char">:</span>
        <span className="cli-path">~</span>
        <span className="cli-char">$</span>
        <span className="cli-command">sys_inventory --all</span>
      </div>

      <div className="cli-output">
        <div className="cli-output-block" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <div style={{ color: 'var(--cli-accent)', fontWeight: 'bold', marginBottom: '0.8rem', borderBottom: '1px dashed var(--cli-border)', paddingBottom: '0.4rem' }}>
                [{category.toUpperCase()}]
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {items.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--cli-ok)' }}>+</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
