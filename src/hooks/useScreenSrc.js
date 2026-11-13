import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { screenSrc } from '../data/screens';

/** Returns a function giving the capture of a screen for the current language and theme. */
export function useScreenSrc() {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();
  return (id, dark = isDark) => screenSrc(id, dark, i18n.language);
}
