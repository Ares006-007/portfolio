import { skills } from "../data/content";

export default function Skills() {
  // Mock usage percentages for different skills to create progress bars
  const mockUsage = {
    "JavaScript": 92, "React.js": 88, "Node.js": 75, "Python": 60, "C++": 45,
    "MongoDB": 80, "PostgreSQL": 70, "Redis": 40,
    "Docker": 65, "AWS": 50, "Linux": 85, "Git": 95,
    "Figma": 70, "TailwindCSS": 90, "System Design": 65
  };

  const renderProgressBar = (percentage) => {
    const totalBars = 20;
    const filledBars = Math.floor((percentage / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    
    // Create colored segments for the bar (green -> yellow -> red)
    let barString = [];
    for (let i = 0; i < filledBars; i++) {
      let color = 'var(--cli-ok)';
      if (i > totalBars * 0.6) color = 'var(--cli-warn)';
      if (i > totalBars * 0.85) color = 'var(--cli-error)';
      barString.push(<span key={i} style={{ color }}>|</span>);
    }
    for (let i = 0; i < emptyBars; i++) {
      barString.push(<span key={`e${i}`} style={{ color: 'var(--text-dim)' }}>|</span>);
    }

    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ color: 'var(--text-dim)' }}>[</span>
        <span style={{ display: 'flex', letterSpacing: '-1px' }}>{barString}</span>
        <span style={{ color: 'var(--text-dim)' }}>]</span>
        <span style={{ minWidth: '40px', textAlign: 'right', color: 'var(--text-secondary)' }}>{percentage}%</span>
      </span>
    );
  };

  return (
    <section id="skills" aria-label="Skills and Stack">
      <div className="cli-prompt-line">
        <span className="cli-user">guest</span>
        <span className="cli-char">@</span>
        <span className="cli-host">portfolio</span>
        <span className="cli-char">:</span>
        <span className="cli-path">~</span>
        <span className="cli-char">$</span>
        <span className="cli-command">htop -u shaik -t sys_inventory</span>
      </div>

      <div className="cli-output">
        <div className="cli-output-block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', color: 'var(--text-dim)', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <span>PID USER      PRI  NI  VIRT   RES   SHR S  CPU% MEM%   TIME+  COMMAND</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {Object.entries(skills).map(([category, items], idx) => (
              <div key={category} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.2rem' }}>
                  <span>{category.toUpperCase()}</span>
                  <span style={{ color: 'var(--text-dim)', fontWeight: 'normal' }}>MEM {(idx + 1) * 12.4}G</span>
                </div>
                
                {items.map((item) => {
                  const usage = mockUsage[item] || Math.floor(Math.random() * 40) + 40; // Default to 40-80% if not found
                  return (
                    <div key={item} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                      {renderProgressBar(usage)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', color: 'var(--bg-deep)', fontWeight: 'bold', flexWrap: 'wrap' }}>
            <span style={{ backgroundColor: 'var(--cli-ok)', padding: '2px 8px' }}>F1 Help</span>
            <span style={{ backgroundColor: 'var(--cli-warn)', padding: '2px 8px' }}>F2 Setup</span>
            <span style={{ backgroundColor: 'var(--accent)', padding: '2px 8px' }}>F3 Search</span>
            <span style={{ backgroundColor: 'var(--text-dim)', padding: '2px 8px', color: 'var(--text-primary)' }}>F10 Quit</span>
          </div>
        </div>
      </div>
    </section>
  );
}
