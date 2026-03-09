import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { translations } from '../shared/config/translations';

const CategoriesPage = () => {
  const language = useAppSelector((state) => state.preferences.language);
  const t = translations[language];

  const categories = [
    { key: 'study', title: t.study, icon: 'bi bi-mortarboard' },
    { key: 'work', title: t.work, icon: 'bi bi-briefcase' },
    { key: 'personal', title: t.personal, icon: 'bi bi-person-heart' },
    { key: 'health', title: t.health, icon: 'bi bi-heart-pulse' },
  ];

  return (
    <section className="card shadow-sm border-0 rounded-4 p-4 soft-card page-fade">
      <h1 className="fw-bold mb-4">{t.categoriesTitle}</h1>

      <div className="row g-4">
        {categories.map((category) => (
          <div className="col-md-6 col-lg-3" key={category.key}>
            <Link
              to={`/categories/${category.key}`}
              className="text-decoration-none"
            >
              <div className="p-4 rounded-4 bg-body-tertiary h-100 category-tile page-panel">
                <i className={`${category.icon} fs-1 mb-3 d-block`} />
                <h5 className="fw-bold mb-0">{category.title}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
