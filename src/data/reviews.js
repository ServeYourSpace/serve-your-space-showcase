// Real reviews only. Each entry is shown exactly as written, in its own language.
// Add one by copying the shape below. While this list is empty, the reviews section
// is hidden on the site (no invented reviews).
//
// {
//   name: 'Prénom N.',            // as the person agreed to be shown
//   role: 'client',               // 'client' or 'provider'
//   service: 'plumbing',          // key from src/data/services.js (optional)
//   city: 'Casablanca',           // optional
//   rating: 5,                    // 1 to 5
//   lang: 'fr',                   // language the review is written in: en, fr or ar
//   text: 'Le texte de l’avis…',
//   date: '2026-11',              // optional
// }
export const REVIEWS = [];

// Layout examples, NEVER shown as real reviews: only visible with ?reviews=demo in the URL,
// and every card is then marked "Example". Used to preview the design before real reviews exist.
export const SAMPLE_REVIEWS = [
  { name: 'Prénom A.', role: 'client', service: 'plumbing', city: 'Casablanca', rating: 5, lang: 'fr', text: 'Exemple d’avis : décrivez ici l’expérience d’un client avec un prestataire trouvé sur l’application.' },
  { name: 'Name B.', role: 'provider', service: 'electrical', city: 'Rabat', rating: 5, lang: 'en', text: 'Sample review: a provider explains how the app helps them find missions near them.' },
  { name: 'الاسم ج.', role: 'client', service: 'cleaning', city: 'Marrakech', rating: 4, lang: 'ar', text: 'مثال على تقييم: هنا يكتب العميل رأيه في الخدمة التي حصل عليها عبر التطبيق.' },
  { name: 'Prénom D.', role: 'provider', service: 'painting', city: 'Tanger', rating: 5, lang: 'fr', text: 'Exemple d’avis : un prestataire parle du tableau de bord et de son objectif du jour.' },
  { name: 'Name E.', role: 'client', service: 'tutoring', city: 'Agadir', rating: 5, lang: 'en', text: 'Sample review: a parent shares how they found a tutor and agreed on a price in the app.' },
  { name: 'الاسم و.', role: 'provider', service: 'gardening', city: 'Fès', rating: 5, lang: 'ar', text: 'مثال على تقييم: يشرح مقدم الخدمة كيف يتابع مهامه ويتواصل مع العملاء.' },
  { name: 'Prénom G.', role: 'client', service: 'hairdressing', city: 'Casablanca', rating: 5, lang: 'fr', text: 'Exemple d’avis : une cliente raconte sa réservation d’une coiffeuse à domicile.' },
  { name: 'Name H.', role: 'client', service: 'coaching', city: 'Rabat', rating: 4, lang: 'en', text: 'Sample review: someone describes their sessions with a personal coach found through ServiBot.' },
];
