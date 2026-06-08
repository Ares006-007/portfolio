import { hackathons } from "../data/content";

export default function Hackathons() {
  return (
    <section className="section" id="hackathons" aria-label="Hackathons">
      <h2 className="section-header">Hackathons</h2>
      <div className="hackathon-list">
        {hackathons.map((hack) => (
          <article key={hack.id} className="hackathon-entry">
            <span className="hackathon-id">[{hack.id}]</span>
            <div>
              <div className="hackathon-header">
                <h3 className="hackathon-name">{hack.name}</h3>
                <span className="hackathon-result">{hack.result}</span>
              </div>
              <p className="hackathon-meta">
                {hack.date} &middot; {hack.location}
              </p>
              <p className="hackathon-desc">{hack.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
