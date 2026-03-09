import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return (
      <section className="card empty-state">
        <h2>Нічого не знайдено</h2>
        <p>Спробуй змінити фільтри або додати нову задачу.</p>
      </section>
    );
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default TaskList;
