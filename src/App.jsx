import BackgroundGradient from './components/BackgroundGradient/BackgroundGradient';
import FloatingMenu from './components/FloatingMenu/FloatingMenu';
import Hero from './components/Hero/Hero';
import Credentials from './components/Credentials/Credentials';
import Impact from './components/Impact/Impact';
import Projects from './components/Projects/Projects';
import Capabilities from './components/Capabilities/Capabilities';
import Experience from './components/Experience/Experience';
import Approach from './components/Approach/Approach';
import Testimonials from './components/Testimonials/Testimonials';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <>
      <BackgroundGradient />
      <FloatingMenu />
      <main>
        <Hero />
        <Credentials />
        <Impact />
        <Projects />
        <Capabilities />
        <Experience />
        <Approach />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
