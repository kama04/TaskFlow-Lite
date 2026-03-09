import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'taskflow_tasks';

const initialTasks = [
  {
    id: '1',
    title: 'Підготувати README для проєкту',
    description: 'Описати функціонал, запуск та посилання на деплой.',
    priority: 'high',
    category: 'study',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Налаштувати Redux Toolkit store',
    description: 'Створити store, slices і thunks для задач.',
    priority: 'medium',
    category: 'work',
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

const loadTasks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : initialTasks;
  } catch {
    return initialTasks;
  }
};

const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: loadTasks(),
    filters: {
      search: '',
      status: 'all',
      priority: 'all',
      category: 'all',
    },
  },
  reducers: {
    addTask: (state, action) => {
      state.items.unshift(action.payload);
      saveTasks(state.items);
    },

    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
      saveTasks(state.items);
    },

    toggleTaskStatus: (state, action) => {
      const task = state.items.find((item) => item.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasks(state.items);
      }
    },

    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },

    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
    },

    setPriorityFilter: (state, action) => {
      state.filters.priority = action.payload;
    },

    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },

    resetFilters: (state) => {
      state.filters = {
        search: '',
        status: 'all',
        priority: 'all',
        category: 'all',
      };
    },

    reorderTasks: (state, action) => {
      state.items = action.payload;
      saveTasks(state.items);
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleTaskStatus,
  setSearchFilter,
  setStatusFilter,
  setPriorityFilter,
  setCategoryFilter,
  resetFilters,
  reorderTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;