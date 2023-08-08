import { SocketContext } from '../context/index.js';

const SocketProvider = ({ socket, children }) => {
  const clarify = (...arg) => new Promise((res, rej) => {
    socket.timeout(5000).emit(...arg, (err, response) => (response?.status === 'ok' ? res(response?.data) : rej(err)));
  });
  const emitters = {
    sendMessage: (payload) => clarify('newMessage', payload),
    createChannel: (payload) => clarify('newChannel', payload),
    renameChannel: (payload) => clarify('renameChannel', payload),
    removeChannel: (payload) => clarify('removeChannel', payload),
  };
  return (
    <SocketContext.Provider value={emitters}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
