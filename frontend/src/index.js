import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import MainProvider from './providers/index.jsx';
import { ToastContainer } from 'react-toastify';
import App from './components/App.jsx';

injectStyle();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MainProvider>
    <App />
    <ToastContainer />
  </MainProvider>
);
