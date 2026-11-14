import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { storage } from '../../utils/storage';

const STORAGE_KEY = 'sys-audience';
const AudienceContext = createContext(null);

function initialAudience() {
  try {
    const q = new URLSearchParams(window.location.search).get('side');
    if (q === 'pro' || q === 'provider') return 'provider';
    if (q === 'client') return 'client';
  } catch {
    /* ignore */
  }
  return storage.get(STORAGE_KEY) === 'provider' ? 'provider' : 'client';
}

/** Which side of the app the visitor wants to see: customer ("client") or service provider. */
export function AudienceProvider({ children }) {
  const [audience, setAudienceState] = useState(initialAudience);
  const setAudience = useCallback((a) => {
    setAudienceState(a);
    storage.set(STORAGE_KEY, a);
  }, []);
  const value = useMemo(() => ({ audience, isProvider: audience === 'provider', setAudience }), [audience, setAudience]);
  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>;
}

export function useAudience() {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error('useAudience must be used inside AudienceProvider');
  return ctx;
}

/**
 * Like `t`, but on the provider side it first looks for the same key under `pro.`
 * (e.g. `pro.hero.description`), so only the texts that differ need a provider version.
 */
export function useAudienceT() {
  const { t, i18n } = useTranslation();
  const { isProvider } = useAudience();
  return useCallback(
    (key, opts) => (isProvider && i18n.exists(`pro.${key}`) ? t(`pro.${key}`, opts) : t(key, opts)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isProvider, t, i18n.language],
  );
}
