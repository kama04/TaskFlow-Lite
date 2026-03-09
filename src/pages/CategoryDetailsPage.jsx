import { useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { translations } from '../shared/config/translations';

const CategoryDetailsPage = () => {
  const { categoryName } = useParams();
  const language = useAppSelector((state) => state.preferences.language);
  const t = translations[language];

  const labels = {
    study: t.study,
    work: t.work,
    personal: t.personal,
    health: t.health,
  };

  const tasks = useAppSelector((state) =>
    state.tasks.items.filter((task) => task.category === categoryName)
  );

  return (
    <section className="card shadow-sm border-0 rounded-4 p-4 soft-card page-fade">
      <h1 className="fw-bold mb-4">{labels[categoryName] || t.categoryTitle}</h1>

      {tasks.length === 0 ? (
        <p className="text-secondary mb-0">{t.emptyCategory}</p>
      ) : (
        <div className="row g-3">
          {tasks.map((task) => (
            <div className="col-12" key={task.id}>
              <div className="p-4 rounded-4 bg-body-tertiary page-panel">
                <h5 className="fw-bold">{task.title}</h5>
                <p className="mb-0 text-secondary">{task.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryDetailsPage;
