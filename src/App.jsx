import BackgroundGradient from './components/BackgroundGradient/BackgroundGradient';
import FloatingMenu from './components/FloatingMenu/FloatingMenu';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Testimonials from './components/Testimonials/Testimonials';
import Interests from './components/Interests/Interests';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <>
      <BackgroundGradient />
      <FloatingMenu />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Testimonials />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
