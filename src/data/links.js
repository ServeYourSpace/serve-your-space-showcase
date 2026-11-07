// Fill these in when the app is published / the accounts exist.
// An empty store URL shows the badge with a "Soon" ribbon and no link.
// An empty social URL hides that icon (the whole "Follow us" block if all are empty).
export const STORE_LINKS = {
  appStore: '',
  googlePlay: '',
};

export const SOCIAL_LINKS = {
  facebook: '',
  instagram: '',
  tiktok: '',
  youtube: '',
  linkedin: '',
};

export const activeSocials = () => Object.entries(SOCIAL_LINKS).filter(([, url]) => url);
