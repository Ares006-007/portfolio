import { skills } from "../data/content";

export default function Skills() {
  return (
    <section className="section" id="skills" aria-label="Skills and Stack">
      <h2 className="section-header">Skills / Stack</h2>
      <div className="skills-grid">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skill-row">
            <span className="skill-label">{category}</span>
            <div className="skill-items">
              {items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
