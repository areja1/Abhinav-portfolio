import Header from "./components/Header.jsx";
import Intro from "./components/Intro.jsx";
import Now from "./components/Now.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Background from "./components/Background.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Intro />
        <Now />
        <Experience />
        <Projects />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
