import { activeProcesses, completedRuns, educationLog } from "../data/content";

export default function Experience() {
  const renderSection = (title, data, prefix) => (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ color: 'var(--accent)', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px dashed var(--border)', paddingBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
        --- [ {title} ] ---
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {data.map((exp, idx) => {
          const logId = `${prefix}-${(idx + 1).toString().padStart(3, '0')}`;
          return (
            <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1rem', borderLeft: '2px solid var(--accent)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'baseline' }}>
                 <span style={{ color: 'var(--text-dim)' }}>[{logId}]</span> 
                 <span style={{ color: 'var(--cli-warn)', fontWeight: 'bold' }}>[{exp.date}]</span>
                 <span style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>{exp.title}</span>
                 <span style={{ color: 'var(--text-dim)' }}>@</span>
                 <span style={{ color: 'var(--accent)' }}>{exp.organization}</span>
              </div>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.5', paddingLeft: '0.5rem' }}>
                <span style={{ color: 'var(--text-dim)' }}>&gt;</span> {exp.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section id="experience" aria-label="Experience">
      <div className="cli-prompt-line">
        <span className="cli-user">guest</span>
        <span className="cli-char">@</span>
        <span className="cli-host">portfolio</span>
        <span className="cli-char">:</span>
        <span className="cli-path">~</span>
        <span className="cli-char">$</span>
        <span className="cli-command">cat /var/log/sys/history.log | grep -E "processes|runs|education"</span>
      </div>

      <div className="cli-output">
        <div className="cli-output-block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
          {renderSection("ACTIVE PROCESSES", activeProcesses, "ACT")}
          {renderSection("COMPLETED RUNS", completedRuns, "RUN")}
          {renderSection("EDUCATION LOG", educationLog, "EDU")}
        </div>
      </div>
    </section>
  );
}
