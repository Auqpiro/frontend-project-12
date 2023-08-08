import { useState } from 'react';
import { AuthContext } from '../context/index.js';
import { useLocalStorage } from '../hooks/index.js';

const AuthProvider = ({ children }) => {
  const { item, setItem, removeItem } = useLocalStorage('userId');
  const [loggedIn, setLoggedIn] = useState(!!item);
  const logIn = (data) => {
    setItem(JSON.stringify(data));
    setLoggedIn(true);
  };
  const logOut = () => {
    removeItem();
    setLoggedIn(false);
  };
  const getUser = () => (loggedIn ? JSON.parse(item) : null);
  const auth = {
    loggedIn,
    logIn,
    logOut,
    getUser,
  };
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
