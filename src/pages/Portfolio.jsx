import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Hackathons from "../components/Hackathons";
import Events from "../components/Events";
import Volunteered from "../components/Volunteered";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Roadmap from "../components/Roadmap";
import Contact from "../components/Contact";
import FaultyTerminal from "../components/FaultyTerminal";

export default function Portfolio() {
  return (
    <div className="portfolio-cli-layout" style={{ backgroundColor: 'transparent', position: 'relative' }}>
      <FaultyTerminal
        scale={3}
        digitSize={4}
        scanlineIntensity={1.5}
        glitchAmount={3}
        flickerAmount={1}
        noiseAmp={0}
        chromaticAberration={0}
        dither={0}
        curvature={0.2}
        tint="#ffffff"
        mouseReact
        mouseStrength={0.2}
        brightness={1.5}
      />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        <main className="cli-container">
          <Hero />
          <About />
          <Projects />
          <Hackathons />
          <Events />
          <Volunteered />
          <Experience />
          <Skills />
          <Roadmap />
          <Contact />
        </main>
      </div>
    </div>
  );
}
