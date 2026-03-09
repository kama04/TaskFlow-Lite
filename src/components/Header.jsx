import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  toggleTheme,
  setLanguage,
} from '../features/tasks/model/preferencesSlice';
import { translations } from '../shared/config/translations';

const Header = () => {
  const dispatch = useAppDispatch();
  const { theme, language } = useAppSelector((state) => state.preferences);

  const t = translations[language];

  const navLinkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo-wrap">
          <div className="logo-badge">TF</div>
          <div>
            <div className="logo">TaskFlow Lite</div>
            <div className="logo-subtitle">{t.productivityManager}</div>
          </div>
        </div>

        <nav className="nav">
          <NavLink to="/" className={navLinkClass}>
            {t.home}
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            {t.about}
          </NavLink>
          <NavLink to="/categories" className={navLinkClass}>
            {t.categories}
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            {t.contact}
          </NavLink>
          <NavLink to="/schedule" className={navLinkClass}>
            {t.schedule}
          </NavLink>
        </nav>

        <div className="header-actions">
          <div className="lang-switch" aria-label="Language switcher">
            <button
              type="button"
              className={language === 'ua' ? 'lang-btn active' : 'lang-btn'}
              onClick={() => dispatch(setLanguage('ua'))}
            >
              UA
            </button>
            <button
              type="button"
              className={language === 'en' ? 'lang-btn active' : 'lang-btn'}
              onClick={() => dispatch(setLanguage('en'))}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            className={`theme-toggle ${theme === 'dark' ? 'dark' : ''}`}
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
          >
            <span className="theme-track">
              <span className="theme-thumb">
                {theme === 'light' ? '☀️' : '🌙'}
              </span>
            </span>
            <span className="theme-label">
              {theme === 'light' ? t.light : t.dark}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
