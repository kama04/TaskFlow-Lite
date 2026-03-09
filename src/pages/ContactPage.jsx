import { useAppSelector } from '../app/hooks';
import { translations } from '../shared/config/translations';

const ContactPage = () => {
  const language = useAppSelector((state) => state.preferences.language);
  const t = translations[language];

  return (
    <section className="card shadow-sm border-0 rounded-4 p-4 soft-card page-fade">
      <h1 className="fw-bold mb-3">{t.contactTitle}</h1>
      <p className="text-secondary">{t.contactText}</p>

      <div className="row g-3 mt-2">
        <div className="col-md-4">
          <div className="p-4 rounded-4 bg-body-tertiary h-100 page-panel">
            <i className="bi bi-envelope fs-3 mb-3 d-block" />
            <h5>{t.email}</h5>
            <p className="mb-0">taskflow@example.com</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 rounded-4 bg-body-tertiary h-100 page-panel">
            <i className="bi bi-telephone fs-3 mb-3 d-block" />
            <h5>{t.phone}</h5>
            <p className="mb-0">+33 6 00 00 00 00</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 rounded-4 bg-body-tertiary h-100 page-panel">
            <i className="bi bi-geo-alt fs-3 mb-3 d-block" />
            <h5>{t.address}</h5>
            <p className="mb-0">Paris, France</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
