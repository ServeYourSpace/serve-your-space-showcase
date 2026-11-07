// Categories offered in the app (Frontend_SYS_Client · Components/ServicesPage.js).
export const SERVICES = [
  { key: 'plumbing', appName: 'Plombier', icon: 'Wrench', image: '/images/services/plombier.webp', hue: 265, span: 'lg' },
  { key: 'electrical', appName: 'Électricien', icon: 'Zap', image: '/images/services/electricien.webp', hue: 45, span: 'md' },
  { key: 'painting', appName: 'Peintre', icon: 'PaintRoller', image: '/images/services/peintre.webp', hue: 320, span: 'md' },
  { key: 'cleaning', appName: 'Femme de ménage', icon: 'Sparkles', image: '/images/services/menage.webp', hue: 190, span: 'md' },
  { key: 'carpentry', appName: 'Menuisier', icon: 'Hammer', image: '/images/services/menuisier.webp', hue: 25, span: 'md' },
  { key: 'gardening', appName: 'Jardinier', icon: 'Sprout', image: '/images/services/jardinier.webp', hue: 140, span: 'md' },
  { key: 'maintenance', appName: 'Vitrier', icon: 'House', image: null, hue: 285, span: 'md' },
  { key: 'tutoring', appName: 'Cours particuliers', icon: 'GraduationCap', image: '/images/services/professeur.webp', hue: 220, span: 'sm' },
  { key: 'hairdressing', appName: 'Coiffeur à domicile', icon: 'Scissors', image: '/images/services/coiffeur.webp', hue: 340, span: 'sm' },
  { key: 'coaching', appName: 'Coach sportif', icon: 'Dumbbell', image: '/images/services/coach.webp', hue: 0, span: 'sm' },
];

export const getService = (key) => SERVICES.find((s) => s.key === key);
export const servicePath = (key) => `/services/${key}`;
