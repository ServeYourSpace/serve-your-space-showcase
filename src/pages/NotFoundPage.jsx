import { useTranslation } from 'react-i18next';
import Button from '../components/Button';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <section className="container grid min-h-[80svh] place-items-center pt-[var(--nav-h)] text-center">
      <div>
        <img src="/images/servibot/servibot_3.png" alt="" className="mx-auto h-48 w-auto animate-float" />
        <h1 className="mt-6 font-display text-4xl font-bold">{t('detail.notFound')}</h1>
        <Button href="/" className="mt-8">
          {t('detail.home')}
        </Button>
      </div>
    </section>
  );
}
