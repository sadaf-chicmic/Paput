import Hero from '../components/landing-page/Hero';
import Section1 from '../components/landing-page/Section1';
import Section2 from '../components/landing-page/SEction2';

export default function LandingPage() {
  return (
    <div className="w-full">
      <Hero />
      <Section1 />
      <Section2 />
    </div>
  );
}
