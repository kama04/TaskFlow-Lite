export const createTaskId = () => crypto.randomUUID();

export const getFilteredTasks = (tasks, filters) => {
  const { status, priority, query } = filters;

  return tasks.filter((task) => {
    const matchesStatus = status === 'all' ? true : task.status === status;
    const matchesPriority =
      priority === 'all' ? true : task.priority === priority;
    const matchesQuery = `${task.title} ${task.description}`
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesStatus && matchesPriority && matchesQuery;
  });
};

export const getTaskStats = (tasks) => ({
  total: tasks.length,
  completed: tasks.filter((task) => task.status === 'done').length,
  active: tasks.filter((task) => task.status === 'todo').length,
  highPriority: tasks.filter((task) => task.priority === 'high').length,
});
