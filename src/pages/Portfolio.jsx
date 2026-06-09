import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Hackathons from "../components/Hackathons";
import Events from "../components/Events";
import Skills from "../components/Skills";
import Contact from "../components/Contact";

export default function Portfolio() {
  return (
    <div className="portfolio-cli-layout">
      <Navbar />
      <main className="cli-container">
        <Hero />
        <About />
        <Projects />
        <Hackathons />
        <Events />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
