import { useTranslation } from 'react-i18next';
import { useAudience } from '../context/AudienceContext';
import { useTheme } from '../context/ThemeContext';
import { screenSrc } from '../data/screens';

/** Returns a function giving the capture of a screen for the current language, theme and side (client / provider). */
export function useScreenSrc() {
  const { isDark } = useTheme();
  const { isProvider } = useAudience();
  const { i18n } = useTranslation();
  return (id, dark = isDark) => screenSrc(id, dark, i18n.language, isProvider);
}
