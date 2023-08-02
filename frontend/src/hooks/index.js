import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext, SocketContext, ThemeContext } from '../context/index.js';

const useAuth = () => useContext(AuthContext);

const useSocket = () => useContext(SocketContext);

const useTheme = () => useContext(ThemeContext);

const useAutoFocus = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref?.current) {
      ref.current.focus();
    }
  }, []);
  return ref;
};

const useLocalStorage = (key, value = null) => {
  const [item, setItem] = useState(() => (localStorage.getItem(key) || value));
  useEffect(() => {
    if (item) {
      localStorage.setItem(key, item);
    }
  }, [key, item]);
  const removeItem = () => localStorage.removeItem(key);
  return {
    item,
    setItem,
    removeItem,
  };
};

export {
  useAuth,
  useSocket,
  useTheme,
  useAutoFocus,
  useLocalStorage,
};
