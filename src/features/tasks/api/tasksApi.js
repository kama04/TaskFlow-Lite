import { simulateRequest } from '../../../services/api/baseApi';
import { tasksStorage } from '../../../services/storage/tasksStorage';

const seedTasks = [
  {
    id: '1',
    title: 'Підготувати README для проєкту',
    description: 'Описати функціонал, запуск та посилання на деплой.',
    priority: 'high',
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Налаштувати Redux Toolkit store',
    description: 'Створити store, slices і thunks для задач.',
    priority: 'medium',
    status: 'done',
    createdAt: new Date().toISOString(),
  },
];

const ensureSeed = () => {
  const savedTasks = tasksStorage.getAll();

  if (!savedTasks.length) {
    tasksStorage.saveAll(seedTasks);
    return seedTasks;
  }

  return savedTasks;
};

export const tasksApi = {
  async getTasks() {
    const tasks = ensureSeed();
    return simulateRequest(tasks);
  },
  async createTask(task) {
    const currentTasks = tasksStorage.getAll();
    const nextTasks = [task, ...currentTasks];
    tasksStorage.saveAll(nextTasks);
    return simulateRequest(task);
  },
  async updateTask(updatedTask) {
    const currentTasks = tasksStorage.getAll();
    const nextTasks = currentTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );

    tasksStorage.saveAll(nextTasks);
    return simulateRequest(updatedTask);
  },
  async deleteTask(taskId) {
    const currentTasks = tasksStorage.getAll();
    const nextTasks = currentTasks.filter((task) => task.id !== taskId);
    tasksStorage.saveAll(nextTasks);
    return simulateRequest(taskId);
  },
};
