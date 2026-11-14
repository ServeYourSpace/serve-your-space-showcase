// Every screen shown on the site. `real: true` = captured from the actual app.
// `real: false` = an existing feature redrawn as HTML (rendered by a mock component)
// and always labelled "Illustration" in the UI.
export const SCREEN_IMAGES = {
  welcome: { light: '/screenshots/welcome.webp', dark: '/screenshots/welcome.webp' },
  home: { light: '/screenshots/home_fr.webp', dark: '/screenshots/home.webp' },
  dashboard: { light: '/screenshots/dash_light.webp', dark: '/screenshots/dash_dark.webp' },
  servibot: { light: '/screenshots/servibot.webp', dark: '/screenshots/servibot.webp' },
  profile: { light: '/screenshots/profile.webp', dark: '/screenshots/profile.webp' },
  signup: { light: '/screenshots/signup.webp', dark: '/screenshots/signup.webp' },
  otp: { light: '/screenshots/otp.webp', dark: '/screenshots/otp.webp' },
  settings: { light: '/screenshots/settings.webp', dark: '/screenshots/settings.webp' },
  menu: { light: '/screenshots/menu.webp', dark: '/screenshots/menu.webp' },
};

export const SHOWCASE_SCREENS = [
  { id: 'home', real: true },
  { id: 'categories', real: false, mock: 'categories' },
  { id: 'negotiation', real: false, mock: 'negotiation' },
  { id: 'chat', real: false, mock: 'chat' },
  { id: 'dashboard', real: true },
  { id: 'servibot', real: true },
  { id: 'profile', real: true },
  { id: 'signup', real: true },
  { id: 'login', real: true },
  { id: 'otp', real: true },
  { id: 'settings', real: true },
  { id: 'menu', real: true },
];

// Per-language / per-theme captures dropped in src/assets/screens/ (see README there).
// File names: <id>.<lang>.<theme>.webp, <id>.<lang>.webp or <id>.<theme>.webp
// e.g. home.ar.dark.webp, dashboard.fr.light.webp, servibot.en.webp
const VARIANTS = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/screens/*.{webp,png,jpg,jpeg}', { eager: true, query: '?url', import: 'default' })).map(
    ([path, url]) => [path.split('/').pop().replace(/\.(webp|png|jpe?g)$/, ''), url],
  ),
);

function resolve(id, isDark, lang) {
  const theme = isDark ? 'dark' : 'light';
  const base = (lang || 'en').split('-')[0];
  return (
    VARIANTS[`${id}.${base}.${theme}`] ||
    VARIANTS[`${id}.${base}`] ||
    VARIANTS[`${id}.${theme}`] ||
    SCREEN_IMAGES[id]?.[theme] ||
    // last resort: the same screen in another language, same theme first
    ['en', 'fr', 'ar'].map((l) => VARIANTS[`${id}.${l}.${theme}`]).find(Boolean) ||
    ['en', 'fr', 'ar'].map((l) => VARIANTS[`${id}.${l}.${isDark ? 'light' : 'dark'}`]).find(Boolean)
  );
}

// Provider-side captures are named `pro-<screen>....` (e.g. pro-home.fr.dark.webp = provider dashboard).
// Until they exist, these provider screens borrow an existing capture.
const PRO_FALLBACK = { home: 'dashboard', wallet: 'dashboard', missions: 'dashboard' };

/**
 * Best capture for a screen: same language + theme, then same language, then same theme, then the default set.
 * On the provider side, the `pro-` capture wins when there is one.
 */
export function screenSrc(id, isDark, lang, provider = false) {
  if (provider) {
    const theme = isDark ? 'dark' : 'light';
    const base = (lang || 'en').split('-')[0];
    const pro =
      VARIANTS[`pro-${id}.${base}.${theme}`] ||
      VARIANTS[`pro-${id}.${base}`] ||
      VARIANTS[`pro-${id}.${theme}`] ||
      ['en', 'fr', 'ar'].map((l) => VARIANTS[`pro-${id}.${l}.${theme}`]).find(Boolean);
    if (pro) return pro;
    if (PRO_FALLBACK[id]) return resolve(PRO_FALLBACK[id], isDark, lang);
  }
  return resolve(id, isDark, lang) || (PRO_FALLBACK[id] && resolve(PRO_FALLBACK[id], isDark, lang));
}
