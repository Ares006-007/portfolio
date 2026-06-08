import { about } from "../data/content";

export default function About() {
  return (
    <section className="section" id="about" aria-label="About">
      <h2 className="section-header">About</h2>
      <div className="about-text">
        {about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
