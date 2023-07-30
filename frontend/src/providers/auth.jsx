import { useState } from 'react';
import { AuthContext } from '../context/index.js';

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(!!userId);
  const auth = {
    loggedIn,
    logIn: () => setLoggedIn(true),
    logOut: () => {
      localStorage.removeItem('userId');
      setLoggedIn(false);
    },
  };
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
