import { useState, useCallback, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeContext } from '../context';
import { useLocalStorage } from '../hooks';

const themes = {
  light: {
    name: 'light',
  },
  dark: {
    name: 'dark',
  },
};

const ThemeProvider = ({ children }) => {
  const isDarkPrefer = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const { item: current, setItem } = useLocalStorage('theme', (isDarkPrefer ? 'dark' : 'light'));
  document.documentElement.setAttribute('data-bs-theme', current);
  const [theme, setTheme] = useState(themes[current]);
  const lightOn = useCallback(() => {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    setTheme(themes.light);
    setItem('light');
  }, [setItem]);
  const lightOff = useCallback(() => {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    setTheme(themes.dark);
    setItem('dark');
  }, [setItem]);
  const decor = useMemo(() => ({
    theme,
    lightOn,
    lightOff,
  }), [theme, lightOn, lightOff]);
  return (
    <ThemeContext.Provider value={decor}>
      {children}
      <ToastContainer theme={theme.name} />
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
