import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import SchedulePage from '../pages/SchedulePage';
import CategoriesPage from '../pages/CategoriesPage';
import CategoryDetailsPage from '../pages/CategoryDetailsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:categoryName" element={<CategoryDetailsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
