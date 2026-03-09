import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme || 'light';
};

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem('language');
  return savedLanguage || 'ua';
};

const initialState = {
  theme: getInitialTheme(),
  language: getInitialLanguage(),
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', state.language);
    },
  },
});

export const { toggleTheme, setLanguage } = preferencesSlice.actions;
export default preferencesSlice.reducer;