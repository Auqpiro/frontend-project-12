import { useState } from 'react';
import { AuthContext } from '../context/index.js';
import { useLocalStorage } from '../hooks/index.js';

const AuthProvider = ({ children }) => {
  const { item, setItem, removeItem } = useLocalStorage('userId');
  const [loggedIn, setLoggedIn] = useState(!!item);
  const auth = {
    loggedIn,
    logIn: (data) => {
      setItem(JSON.stringify(data));
      setLoggedIn(true);
    },
    logOut: () => {
      removeItem();
      setLoggedIn(false);
    },
    getUser: () => (loggedIn ? JSON.parse(item) : null),
  };
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
