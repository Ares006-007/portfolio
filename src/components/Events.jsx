import { events } from "../data/content";

export default function Events() {
  return (
    <section className="section" id="events" aria-label="Events Organized">
      <h2 className="section-header">Events Organized</h2>
      <div className="events-list">
        {events.map((evt) => (
          <article key={evt.id} className="event-entry">
            <span className="event-id">[{evt.id}]</span>
            <div>
              <h3 className="event-name">{evt.name}</h3>
              <div className="event-meta">
                <span>
                  <span className="label">role:</span> {evt.role}
                </span>
                <span>
                  <span className="label">attendees:</span> {evt.attendees}
                </span>
                <span>
                  <span className="label">date:</span> {evt.date}
                </span>
              </div>
              <p className="event-desc">{evt.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
