// Number of providers per service.
//
// The site never invents this figure. It is shown only when VITE_STATS_URL is set
// (see .env.example) and that URL returns JSON such as:
//   { "Plombier": 12, "Électricien": 7 }      (keys = service names in the app catalogue)
//   or { "plumbing": 12, "electrical": 7 }      (keys = the site's service keys)
// Otherwise the detail pages say "Providers available in the app" without a number.

const STATS_URL = import.meta.env.VITE_STATS_URL;
let cache;

export function loadProviderStats() {
  if (!STATS_URL) return Promise.resolve(null);
  if (!cache) {
    cache = fetch(STATS_URL, { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return cache;
}

export function providerCountFor(stats, service) {
  if (!stats || !service) return null;
  const v = stats[service.key] ?? stats[service.appName];
  return Number.isFinite(v) ? v : null;
}
