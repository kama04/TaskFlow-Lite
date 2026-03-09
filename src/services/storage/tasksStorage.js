const TASKS_KEY = 'taskflow-lite-tasks';

export const tasksStorage = {
  getAll() {
    const rawTasks = localStorage.getItem(TASKS_KEY);
    return rawTasks ? JSON.parse(rawTasks) : [];
  },
  saveAll(tasks) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },
};
