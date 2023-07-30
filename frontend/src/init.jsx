import i18next from 'i18next';
import * as filter from 'leo-profanity';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import CollectorProvider from './providers/collector.jsx';
import SocketProvider from './providers/soket.jsx';
import AuthProvider from './providers/auth.jsx';
import App from './components/App.jsx';
import store from './slices/index.js';
import resources from './locales/index.js';

const init = async () => {
  const dictionaries = filter.getDictionary('ru', 'en');
  filter.add(dictionaries);
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: ['ru', 'en', 'zh', 'es'],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });
  return (
    <CollectorProvider>
      <Provider store={store}>
        <SocketProvider>
          <I18nextProvider i18n={i18n}>
            <AuthProvider>
              <App />
              <ToastContainer />
            </AuthProvider>
          </I18nextProvider>
        </SocketProvider>
      </Provider>
    </CollectorProvider>
  );
};

export default init;
