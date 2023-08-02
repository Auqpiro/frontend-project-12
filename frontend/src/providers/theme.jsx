import { useState } from 'react';
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
  const lightOn = () => {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    setTheme(themes.light);
    setItem('light');
  };
  const lightOff = () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    setTheme(themes.dark);
    setItem('dark');
  };
  const decor = {
    theme,
    lightOn,
    lightOff,
  };
  return (
    <ThemeContext.Provider value={decor}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
