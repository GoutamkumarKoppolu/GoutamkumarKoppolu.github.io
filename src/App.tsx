import { MeshBackground } from "./components/MeshBackground";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Highlights } from "./components/Highlights";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Recommendations } from "./components/Recommendations";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <MeshBackground />
      <div className="site">
        <Navbar />
        <main>
          <Hero />
          <Highlights />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <Recommendations />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
