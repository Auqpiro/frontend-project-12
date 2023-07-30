import { useContext, useEffect, useRef } from 'react';
import { AuthContext, SocketContext } from '../context/index.js';

const useAuth = () => useContext(AuthContext);

const useSocket = () => useContext(SocketContext);

const useAutoFocus = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref?.current) {
      ref.current.focus();
    }
  }, []);
  return ref;
};

export {
  useAuth,
  useSocket,
  useAutoFocus,
};
