import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, LANGUAGE_STORAGE_KEY } from '../../i18n/languages';
import { storage } from '../../utils/storage';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.resolvedLanguage || i18n.language);
  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const root = document.documentElement;
    root.lang = current.code;
    root.dir = current.dir;
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  }, [current, t]);

  const changeLanguage = useCallback(
    (code) => {
      if (!LANGUAGES.some((l) => l.code === code)) return;
      i18n.changeLanguage(code);
      storage.set(LANGUAGE_STORAGE_KEY, code);
      setLanguage(code);
    },
    [i18n],
  );

  const value = useMemo(
    () => ({ language: current.code, dir: current.dir, isRTL: current.dir === 'rtl', current, languages: LANGUAGES, changeLanguage }),
    [current, changeLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
