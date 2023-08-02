import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { SocketContext } from '../context/index.js';
import { channelsActions } from '../slices/channelsSlice.js';
import { messagesActions } from '../slices/messagesSlice.js';

const SocketProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();
  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    dispatch(channelsActions.removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    dispatch(channelsActions.renameChannel(payload));
  });
  const clarify = useCallback((...arg) => new Promise((res, rej) => {
    socket.timeout(5000).emit(...arg, (err, response) => (response?.status === 'ok' ? res(response?.data) : rej(err)));
  }), [socket]);
  const emitters = useMemo(() => ({
    sendMessage: (payload) => clarify('newMessage', payload),
    createChannel: (payload) => clarify('newChannel', payload),
    renameChannel: (payload) => clarify('renameChannel', payload),
    removeChannel: (payload) => clarify('removeChannel', payload),
  }), [clarify]);
  return (
    <SocketContext.Provider value={emitters}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
