import { projects } from "../data/content";

export default function Projects() {
  return (
    <section className="section" id="projects" aria-label="Projects">
      <h2 className="section-header">Projects</h2>
      <div className="project-list">
        {projects.map((proj) => (
          <article key={proj.id} className="project-entry">
            <span className="project-id">[{proj.id}]</span>
            <div>
              <h3 className="project-name">{proj.name}</h3>
              <div className="project-stack">
                {proj.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <p className="project-desc">{proj.description}</p>
              <div className="project-links">
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {proj.live && (
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
