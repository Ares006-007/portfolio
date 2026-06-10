import { roadmap } from "../data/content";

export default function Roadmap() {
  return (
    <section id="roadmap" className="section">
      <h2 className="section-header">roadmap.sys</h2>
      
      <div className="about-text" style={{ marginBottom: 'var(--space-2xl)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-dim)' }}>
          System status: ACTIVELY EVOLVING. <br/>
          Tracking build pipeline and upcoming terminal modules.
        </p>
      </div>

      <div className="roadmap-grid">
        {roadmap.map((item) => (
          <div key={item.id} className={`roadmap-entry status-${item.status}`}>
            <div className="roadmap-id">[{item.id}]</div>
            <div className="roadmap-content">
              <div className="roadmap-header">
                <h3 className="roadmap-feature">{item.feature}</h3>
                <span className={`roadmap-badge badge-${item.status}`}>{item.status}</span>
              </div>
              <p className="roadmap-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
