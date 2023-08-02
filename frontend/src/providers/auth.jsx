import { useState, useCallback, useMemo } from 'react';
import { AuthContext } from '../context/index.js';
import { useLocalStorage } from '../hooks/index.js';

const AuthProvider = ({ children }) => {
  const { item, setItem, removeItem } = useLocalStorage('userId');
  const [loggedIn, setLoggedIn] = useState(!!item);
  const logIn = useCallback((data) => {
    setItem(JSON.stringify(data));
    setLoggedIn(true);
  }, [setItem]);
  const logOut = useCallback(() => {
    removeItem();
    setLoggedIn(false);
  }, [removeItem]);
  const getUser = useCallback(() => (loggedIn ? JSON.parse(item) : null), [loggedIn, item]);
  const auth = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    getUser,
  }), [loggedIn, logIn, logOut, getUser]);
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
