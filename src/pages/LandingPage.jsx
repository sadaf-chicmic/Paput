import Contact from '../components/Contact';
import Hero from '../components/landing-page/Hero';
import Section1 from '../components/landing-page/Section1';
import Section2 from '../components/landing-page/SEction2';
import Section3 from '../components/landing-page/Section3';
import Section4 from '../components/landing-page/Section4';

export default function LandingPage() {
  return (
    <div className="w-full">
      <Hero />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Contact />
    </div>
  );
}
