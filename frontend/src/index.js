import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './style.css';
import MainProvider from './providers/index.jsx';
import App from './components/App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const vdom = (
  <MainProvider>
    <App />
    <ToastContainer />
  </MainProvider>
);
root.render(vdom);
