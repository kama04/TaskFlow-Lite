import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useAppSelector } from './app/hooks';

function App() {
  const theme = useAppSelector((state) => state.preferences.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <AppRoutes />;
}

export default App;