function TaskItem({ task, onToggle, onDelete }) {
  return (
    <article className={`card task-item ${task.status === 'done' ? 'task-done' : ''}`}>
      <div className="task-item-top">
        <div>
          <span className={`badge badge-${task.priority}`}>
            {task.priority === 'high'
              ? 'Високий'
              : task.priority === 'medium'
                ? 'Середній'
                : 'Низький'}
          </span>
          <h3>{task.title}</h3>
        </div>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={task.status === 'done'}
            onChange={() => onToggle(task)}
          />
          {task.status === 'done' ? 'Готово' : 'В роботі'}
        </label>
      </div>

      <p>{task.description || 'Опис відсутній.'}</p>

      <div className="task-actions">
        <small>{new Date(task.createdAt).toLocaleString('uk-UA')}</small>
        <button type="button" className="danger-btn" onClick={() => onDelete(task.id)}>
          Видалити
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
