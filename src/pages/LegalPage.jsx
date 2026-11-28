import { Mail } from 'lucide-react';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LEGAL, LEGAL_CONTACT, LEGAL_UPDATED } from '../data/legal';

// Pages publiques /confidentialite et /cgu : liées depuis les apps et les fiches des stores.
export default function LegalPage({ kind }) {
  const { language } = useLanguage();
  const texts = LEGAL[language] || LEGAL.fr;
  const page = texts[kind];

  useEffect(() => {
    document.title = `${page.title} · ServeYourSpace`;
  }, [page.title]);

  const date = new Date(`${LEGAL_UPDATED}T00:00:00`).toLocaleDateString(language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="container max-w-3xl pb-24 pt-[calc(var(--nav-h)+3rem)]">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">{page.title}</h1>
      <p className="mt-3 text-sm text-muted">
        {texts.updated} : {date}
      </p>
      <p className="mt-8 text-lg leading-relaxed">{page.intro}</p>

      {page.sections.map((section) => (
        <section key={section.h} className="mt-10">
          <h2 className="font-display text-2xl font-bold">{section.h}</h2>
          <ul className="mt-4 list-disc space-y-2 ps-6 leading-relaxed">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      <div className="glass mt-12 flex items-center gap-3 rounded-3xl p-5">
        <Mail className="h-5 w-5 text-brand-500" aria-hidden />
        <span className="font-semibold">{texts.contact} :</span>
        <a className="text-brand-500 underline" href={`mailto:${LEGAL_CONTACT}`}>
          {LEGAL_CONTACT}
        </a>
      </div>
    </article>
  );
}
