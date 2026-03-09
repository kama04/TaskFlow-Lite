import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { translations } from '../shared/config/translations';
import {
  addTask,
  deleteTask,
  toggleTaskStatus,
  setSearchFilter,
  setStatusFilter,
  setPriorityFilter,
  setCategoryFilter,
  resetFilters,
  reorderTasks,
} from '../features/tasks/model/tasksSlice';

const getPriorityMeta = (priority, t) => {
  switch (priority) {
    case 'high':
      return { label: t.high, icon: 'bi bi-flag-fill text-danger' };
    case 'medium':
      return { label: t.medium, icon: 'bi bi-flag-fill text-warning' };
    default:
      return { label: t.low, icon: 'bi bi-flag-fill text-success' };
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString();
};

const HomePage = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.preferences.language);
  const { items, filters } = useAppSelector((state) => state.tasks);

  const t = translations[language];

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'study',
    startDate: '',
    endDate: '',
  });

  const [draggedId, setDraggedId] = useState(null);

  const filteredTasks = useMemo(() => {
    return items.filter((task) => {
      const searchValue = filters.search.toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(searchValue) ||
        task.description.toLowerCase().includes(searchValue);

      const matchesStatus =
        filters.status === 'all'
          ? true
          : filters.status === 'completed'
          ? task.completed
          : !task.completed;

      const matchesPriority =
        filters.priority === 'all' ? true : task.priority === filters.priority;

      const matchesCategory =
        filters.category === 'all' ? true : task.category === filters.category;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });
  }, [items, filters]);

  const completedCount = items.filter((task) => task.completed).length;
  const progress = items.length
    ? Math.round((completedCount / items.length) * 100)
    : 0;

  const categoryLabel = (category) => {
    if (category === 'study') return t.study;
    if (category === 'work') return t.work;
    if (category === 'personal') return t.personal;
    return t.health;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      alert(
        language === 'ua'
          ? 'Дата завершення не може бути раніше за дату початку'
          : 'End date cannot be earlier than start date'
      );
      return;
    }

    dispatch(
      addTask({
        id: crypto.randomUUID(),
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        category: form.category,
        startDate: form.startDate,
        endDate: form.endDate,
        completed: false,
        createdAt: new Date().toISOString(),
      })
    );

    setForm({
      title: '',
      description: '',
      priority: 'medium',
      category: 'study',
      startDate: '',
      endDate: '',
    });
  };

  const handleDragStart = (id) => {
    setDraggedId(id);
  };

  const handleDrop = (targetId) => {
    if (!draggedId || draggedId === targetId) return;

    const updated = [...items];
    const draggedIndex = updated.findIndex((task) => task.id === draggedId);
    const targetIndex = updated.findIndex((task) => task.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const [draggedTask] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, draggedTask);

    dispatch(reorderTasks(updated));
    setDraggedId(null);
  };

  return (
    <section className="page-fade">
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 soft-card">
            <h1 className="fw-bold mb-3">{t.addTask}</h1>

            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">{t.title}</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder={
                    language === 'ua'
                      ? 'Наприклад: Підготувати презентацію'
                      : 'For example: Prepare presentation'
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">{t.category}</label>
                <select
                  className="form-select rounded-3"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="study">{t.study}</option>
                  <option value="work">{t.work}</option>
                  <option value="personal">{t.personal}</option>
                  <option value="health">{t.health}</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  {language === 'ua' ? 'Дата початку' : 'Start date'}
                </label>
                <input
                  type="date"
                  className="form-control rounded-3"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  {language === 'ua' ? 'Дата завершення' : 'End date'}
                </label>
                <input
                  type="date"
                  className="form-control rounded-3"
                  value={form.endDate}
                  min={form.startDate || ''}
                  onChange={(e) =>
                    setForm({ ...form, endDate: e.target.value })
                  }
                />
              </div>

              <div className="col-md-8">
                <label className="form-label">{t.description}</label>
                <textarea
                  className="form-control rounded-3"
                  rows="4"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder={
                    language === 'ua'
                      ? 'Короткий опис задачі'
                      : 'Short task description'
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">{t.priority}</label>
                <select
                  className="form-select rounded-3 mb-3"
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                >
                  <option value="low">{t.low}</option>
                  <option value="medium">{t.medium}</option>
                  <option value="high">{t.high}</option>
                </select>

                <button
                  type="submit"
                  className="btn btn-primary w-100 rounded-3"
                >
                  <i className="bi bi-plus-circle me-2" />
                  {t.addButton}
                </button>
              </div>
            </form>
          </div>

          <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 soft-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="fw-bold mb-0">{t.filters}</h2>
              <button
                type="button"
                className="btn btn-outline-secondary rounded-3"
                onClick={() => dispatch(resetFilters())}
              >
                {t.reset}
              </button>
            </div>

            <div className="row g-3">
              <div className="col-md-3">
                <input
                  className="form-control rounded-3"
                  placeholder={t.search}
                  value={filters.search}
                  onChange={(e) =>
                    dispatch(setSearchFilter(e.target.value))
                  }
                />
              </div>

              <div className="col-md-3">
                <select
                  className="form-select rounded-3"
                  value={filters.status}
                  onChange={(e) =>
                    dispatch(setStatusFilter(e.target.value))
                  }
                >
                  <option value="all">{t.all}</option>
                  <option value="active">{t.active}</option>
                  <option value="completed">{t.completed}</option>
                </select>
              </div>

              <div className="col-md-3">
                <select
                  className="form-select rounded-3"
                  value={filters.priority}
                  onChange={(e) =>
                    dispatch(setPriorityFilter(e.target.value))
                  }
                >
                  <option value="all">{t.all}</option>
                  <option value="low">{t.low}</option>
                  <option value="medium">{t.medium}</option>
                  <option value="high">{t.high}</option>
                </select>
              </div>

              <div className="col-md-3">
                <select
                  className="form-select rounded-3"
                  value={filters.category}
                  onChange={(e) =>
                    dispatch(setCategoryFilter(e.target.value))
                  }
                >
                  <option value="all">{t.all}</option>
                  <option value="study">{t.study}</option>
                  <option value="work">{t.work}</option>
                  <option value="personal">{t.personal}</option>
                  <option value="health">{t.health}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 soft-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="fw-bold mb-0">{t.progress}</h2>
              <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                {progress}%
              </span>
            </div>

            <div className="progress rounded-pill" style={{ height: '14px' }}>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 text-secondary">
              {t.total}: {items.length} · {t.completed}: {completedCount}
            </div>
          </div>

          <div className="row g-3">
            {filteredTasks.length === 0 ? (
              <div className="col-12">
                <div className="card shadow-sm border-0 rounded-4 p-4 soft-card">
                  <p className="mb-0 text-secondary">{t.noTasks}</p>
                </div>
              </div>
            ) : (
              filteredTasks.map((task) => {
                const priorityMeta = getPriorityMeta(task.priority, t);

                return (
                  <div className="col-12" key={task.id}>
                    <div
                      className="card shadow-sm border-0 rounded-4 p-4 task-card-modern task-enter"
                      draggable
                      onDragStart={() => handleDragStart(task.id)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(task.id)}
                    >
                      <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                            <span className="badge text-bg-light rounded-pill px-3 py-2">
                              <i className={`${priorityMeta.icon} me-2`} />
                              {priorityMeta.label}
                            </span>

                            <Link
                              to={`/categories/${task.category}`}
                              className="badge text-bg-primary rounded-pill px-3 py-2 text-decoration-none"
                            >
                              {categoryLabel(task.category)}
                            </Link>

                            {task.completed ? (
                              <span className="badge text-bg-success rounded-pill px-3 py-2">
                                {t.done}
                              </span>
                            ) : (
                              <span className="badge text-bg-warning rounded-pill px-3 py-2">
                                {t.inProgress}
                              </span>
                            )}
                          </div>

                          <h3 className="fw-bold mb-2">{task.title}</h3>
                          <p className="text-secondary mb-0">{task.description}</p>

                          {(task.startDate || task.endDate) && (
                            <div className="mt-3 d-flex flex-wrap gap-2">
                              {task.startDate && (
                                <span className="badge text-bg-light rounded-pill px-3 py-2">
                                  <i className="bi bi-calendar-event me-2" />
                                  {language === 'ua' ? 'Початок:' : 'Start:'}{' '}
                                  {formatDate(task.startDate)}
                                </span>
                              )}

                              {task.endDate && (
                                <span className="badge text-bg-light rounded-pill px-3 py-2">
                                  <i className="bi bi-calendar-check me-2" />
                                  {language === 'ua' ? 'Кінець:' : 'End:'}{' '}
                                  {formatDate(task.endDate)}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="d-flex gap-2 flex-wrap">
                          <button
                            type="button"
                            className="btn btn-outline-success rounded-3"
                            onClick={() => dispatch(toggleTaskStatus(task.id))}
                          >
                            <i className="bi bi-check2-circle me-2" />
                            {t.done}
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-danger rounded-3"
                            onClick={() => dispatch(deleteTask(task.id))}
                          >
                            <i className="bi bi-trash3 me-2" />
                            {t.delete}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0 rounded-4 p-4 soft-card">
            <h3 className="fw-bold mb-3">
              {language === 'ua' ? 'Категорії' : 'Categories'}
            </h3>

            <div className="list-group list-group-flush">
              <Link
                className="list-group-item list-group-item-action rounded-3 mb-2"
                to="/categories/study"
              >
                <i className="bi bi-mortarboard me-2" />
                {t.study}
              </Link>
              <Link
                className="list-group-item list-group-item-action rounded-3 mb-2"
                to="/categories/work"
              >
                <i className="bi bi-briefcase me-2" />
                {t.work}
              </Link>
              <Link
                className="list-group-item list-group-item-action rounded-3 mb-2"
                to="/categories/personal"
              >
                <i className="bi bi-person-heart me-2" />
                {t.personal}
              </Link>
              <Link
                className="list-group-item list-group-item-action rounded-3"
                to="/categories/health"
              >
                <i className="bi bi-heart-pulse me-2" />
                {t.health}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
