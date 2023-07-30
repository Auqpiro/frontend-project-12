import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { injectStyle } from 'react-toastify/dist/inject-style';
import init from './init';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await init();
  root.render(vdom);
};

injectStyle();

app();
