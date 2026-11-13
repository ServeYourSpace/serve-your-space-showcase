import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import About from '../sections/About';
import AppShowcase from '../sections/AppShowcase';
import Download from '../sections/Download';
import ScrollStory from '../sections/Features';
import FinalCTA from '../sections/FinalCTA';
import Hero from '../sections/Hero';
import HowItWorks from '../sections/HowItWorks';
import ServiBot from '../sections/ServiBot';
import Reviews from '../sections/Reviews';
import Services from '../sections/Services';
import Vision from '../sections/Vision';
import { scrollToId } from '../utils/scroll';

export default function HomePage() {
  const { hash } = useLocation();

  // Coming from another page with /#section: scroll once the sections are rendered.
  useEffect(() => {
    if (!hash) return undefined;
    const id = window.setTimeout(() => scrollToId(hash.slice(1)), 350);
    return () => window.clearTimeout(id);
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <ScrollStory />
      <AppShowcase />
      <ServiBot />
      <Services />
      <HowItWorks />
      <Reviews />
      <Vision />
      <FinalCTA />
      <Download />
    </>
  );
}
