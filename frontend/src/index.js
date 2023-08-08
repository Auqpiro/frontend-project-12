import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import './style.css';
import init from './init';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const socket = io();
  const vdom = init(socket);
  root.render(vdom);
};

app();
