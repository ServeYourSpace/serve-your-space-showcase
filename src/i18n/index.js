import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en/translation.json';
import fr from '../locales/fr/translation.json';
import ar from '../locales/ar/translation.json';
import { LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from './languages';
import { storage } from '../utils/storage';

const saved = storage.get(LANGUAGE_STORAGE_KEY);
const initial = LANGUAGES.some((l) => l.code === saved) ? saved : DEFAULT_LANGUAGE;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
  },
  lng: initial,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: LANGUAGES.map((l) => l.code),
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export default i18n;
