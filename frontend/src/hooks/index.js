import { useContext, useEffect, useRef } from "react";
import { AuthContext, SocketContext } from '../context/index.js';

const useAuth = () => useContext(AuthContext);

const useSocket = () => useContext(SocketContext);

const useAutoFocus = (...arg) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref?.current) {
      ref.current.focus();
    }
  }, [...arg]);
  return ref;
};

const useAutoSelect = (...arg) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref?.current) {
      ref.current.select();
    }
  }, [...arg]);
  return ref;
};

export {
  useAuth,
  useSocket,
  useAutoFocus,
  useAutoSelect,
};