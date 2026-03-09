import { useAppSelector } from '../app/hooks';
import { translations } from '../shared/config/translations';

const AboutPage = () => {
  const language = useAppSelector((state) => state.preferences.language);
  const t = translations[language];

  return (
    <section className="card shadow-sm border-0 rounded-4 p-4 soft-card page-fade">
      <h1 className="fw-bold mb-3">{t.aboutTitle}</h1>
      <p className="text-secondary mb-0">{t.aboutText}</p>
    </section>
  );
};

export default AboutPage;
