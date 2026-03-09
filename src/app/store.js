import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/model/tasksSlice';
import preferencesReducer from '../features/tasks/model/preferencesSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    preferences: preferencesReducer,
  },
});