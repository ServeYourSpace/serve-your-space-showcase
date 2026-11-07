import { MotionConfig } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ScrollTrigger } from './animations/gsap';
import { useLanguage } from './context/LanguageContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ServiceDetailPage from './pages/ServiceDetailPage';

function ScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(id);
  }, [pathname, hash]);
  return null;
}

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
      <ScrollReset />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:serviceKey" element={<ServiceDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </MotionConfig>
  );
}
