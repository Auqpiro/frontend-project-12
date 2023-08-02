import ReactDOM from 'react-dom/client';
import './style.css';
import MainProvider from './providers/index.jsx';
import App from './components/App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const vdom = (
  <MainProvider>
    <App />
  </MainProvider>
);
root.render(vdom);
