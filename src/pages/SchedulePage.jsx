import { useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { translations } from '../shared/config/translations';

const normalizeDate = (date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

const isTaskOnSelectedDate = (task, selectedDate) => {
  if (!task.startDate && !task.endDate) return false;

  const current = normalizeDate(selectedDate);

  if (task.startDate && task.endDate) {
    const start = normalizeDate(task.startDate);
    const end = normalizeDate(task.endDate);
    return current >= start && current <= end;
  }

  if (task.startDate) {
    const start = normalizeDate(task.startDate);
    return current.getTime() === start.getTime();
  }

  if (task.endDate) {
    const end = normalizeDate(task.endDate);
    return current.getTime() === end.getTime();
  }

  return false;
};

const formatDate = (dateString, language) => {
  if (!dateString) return '';
  const date = new Date(dateString);

  return date.toLocaleDateString(
    language === 'ua' ? 'uk-UA' : 'en-US',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
  );
};

const getPriorityBadgeClass = (priority) => {
  switch (priority) {
    case 'high':
      return 'text-bg-danger';
    case 'medium':
      return 'text-bg-warning';
    default:
      return 'text-bg-success';
  }
};

const SchedulePage = () => {
  const [date, setDate] = useState(new Date());

  const language = useAppSelector((state) => state.preferences.language);
  const tasks = useAppSelector((state) => state.tasks.items);

  const t = translations[language];

  const tasksForSelectedDate = useMemo(() => {
    return tasks.filter((task) => isTaskOnSelectedDate(task, date));
  }, [tasks, date]);

  const categoryLabel = (category) => {
    if (category === 'study') return t.study;
    if (category === 'work') return t.work;
    if (category === 'personal') return t.personal;
    return t.health;
  };

  const priorityLabel = (priority) => {
    if (priority === 'high') return t.high;
    if (priority === 'medium') return t.medium;
    return t.low;
  };

  const tileContent = ({ date: tileDate, view }) => {
    if (view !== 'month') return null;

    const count = tasks.filter((task) => isTaskOnSelectedDate(task, tileDate)).length;

    if (!count) return null;

    return (
      <div className="calendar-task-count">
        {count}
      </div>
    );
  };

  return (
    <section className="card shadow-sm border-0 rounded-4 p-4 soft-card">
      <h1 className="fw-bold mb-3">
        {language === 'ua' ? 'Розклад' : 'Schedule'}
      </h1>

      <p className="text-secondary mb-4">
        {language === 'ua'
          ? 'Оберіть дату в календарі, щоб побачити задачі, заплановані на цей день.'
          : 'Select a date in the calendar to see tasks scheduled for that day.'}
      </p>

      <div className="row g-4 align-items-start">
        <div className="col-lg-7">
          <Calendar
            onChange={setDate}
            value={date}
            className="border-0 rounded-4 p-3 w-100"
            tileContent={tileContent}
          />
        </div>

        <div className="col-lg-5">
         <div className="card shadow-sm border-0 rounded-4 p-4 soft-card mb-3">
            <h5 className="fw-bold">
              {language === 'ua' ? 'Обрана дата' : 'Selected date'}
            </h5>
            <p className="mb-0">
              {date.toLocaleDateString(
                language === 'ua' ? 'uk-UA' : 'en-US',
                {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }
              )}
            </p>
          </div>

          <div className="card shadow-sm border-0 rounded-4 p-4 soft-card">
            <h5 className="fw-bold mb-3">
              {language === 'ua' ? 'Задачі на цю дату' : 'Tasks for this date'}
            </h5>

            {tasksForSelectedDate.length === 0 ? (
              <p className="mb-0 text-secondary">
                {language === 'ua'
                  ? 'На цю дату задач немає.'
                  : 'There are no tasks for this date.'}
              </p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {tasksForSelectedDate.map((task) => (
                  <div key={task.id} className="p-3 rounded-4 border bg-body">
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      <span className={`badge ${getPriorityBadgeClass(task.priority)} rounded-pill px-3 py-2`}>
                        {priorityLabel(task.priority)}
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

                    <h6 className="fw-bold mb-2 text-dark">{task.title}</h6>

                    {task.description && (
                      <p className="text-secondary mb-2">{task.description}</p>
                    )}

                    <div className="d-flex flex-wrap gap-2">
                      {task.startDate && (
                        <span className="badge text-bg-light rounded-pill px-3 py-2">
                          {t.start}: {formatDate(task.startDate, language)}
                        </span>
                      )}

                      {task.endDate && (
                        <span className="badge text-bg-light rounded-pill px-3 py-2">
                          {t.end}: {formatDate(task.endDate, language)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchedulePage;