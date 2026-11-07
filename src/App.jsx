import { MotionConfig } from 'framer-motion';
import { useEffect } from 'react';
import { ScrollTrigger } from './animations/gsap';
import { useLanguage } from './context/LanguageContext';
import MainLayout from './layouts/MainLayout';
import About from './sections/About';
import AppShowcase from './sections/AppShowcase';
import ScrollStory from './sections/Features';
import FinalCTA from './sections/FinalCTA';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import ServiBot from './sections/ServiBot';
import Services from './sections/Services';
import Vision from './sections/Vision';

export default function App() {
  const { language } = useLanguage();

  // Text length changes with the language: recompute pinned/scrubbed scroll positions.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => window.clearTimeout(id);
  }, [language]);

  useEffect(() => {
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <MainLayout>
        <Hero />
        <About />
        <ScrollStory />
        <AppShowcase />
        <ServiBot />
        <Services />
        <HowItWorks />
        <Vision />
        <FinalCTA />
      </MainLayout>
    </MotionConfig>
  );
}
