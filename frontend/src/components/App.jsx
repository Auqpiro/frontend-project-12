import { io } from 'socket.io-client';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext, SocketContext } from '../context/index.js';
import { useAuth } from '../hooks/index.js';
import { channelsActions } from '../slices/channelsSlice.js';
import { messagesActions } from '../slices/messagesSlice.js';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Container, Navbar, Button } from 'react-bootstrap';
import Main from './chat/index.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';

const SocketProvider = ({ children }) => {
  const socket = io('http://localhost:3000');
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
  const clarify = (...arg) => new Promise((res, rej) => {
    socket.timeout(5000).emit(...arg, (err, response) => (response?.status === 'ok' ? res(response?.data) : rej()));
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

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn
      ? children
      : <Navigate to='/login' state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to='/login' state={{ from: location }}>Log in</Button>
  );
};

const App = () => {
  return (
    <SocketProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar>
            <Container>
              <Navbar.Brand as={Link} to='/'>Hexlet Chat</Navbar.Brand>
              <AuthButton />
            </Container>
          </Navbar>
          <Routes>
            <Route path='/' element={(
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            )} />
            <Route path='login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SocketProvider>
  );
};

export default App;
