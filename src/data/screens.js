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
  { id: 'otp', real: true },
  { id: 'settings', real: true },
  { id: 'menu', real: true },
];

export const screenSrc = (id, isDark) => SCREEN_IMAGES[id]?.[isDark ? 'dark' : 'light'];
