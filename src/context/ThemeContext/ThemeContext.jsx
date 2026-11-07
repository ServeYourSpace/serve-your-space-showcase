import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../../utils/storage';

const STORAGE_KEY = 'sys-theme';
const ThemeContext = createContext(null);

const systemPrefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

function initialTheme() {
  const saved = storage.get(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return systemPrefersDark() ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);
  // true once the visitor picked a theme: from then on we ignore the OS preference.
  const [overridden, setOverridden] = useState(() => {
    const saved = storage.get(STORAGE_KEY);
    return saved === 'light' || saved === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  }, [theme]);

  // Follow the OS preference live until the visitor chooses explicitly.
  useEffect(() => {
    if (overridden) return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [overridden]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 500);
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      storage.set(STORAGE_KEY, next);
      return next;
    });
    setOverridden(true);
  }, []);

  const value = useMemo(() => ({ theme, isDark: theme === 'dark', toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
