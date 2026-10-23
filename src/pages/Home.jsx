import Hero from "../components/Hero.jsx";
import WorkList from "../components/WorkList.jsx";
import Experience from "../components/Experience.jsx";
import About from "../components/About.jsx";
import Contact from "../components/Contact.jsx";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkList />
      <Experience />
      <About />
      <Contact />
    </main>
  );
}
