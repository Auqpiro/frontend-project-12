import { Provider } from 'react-redux';
import store from './slices/index.js';
import CollectorProvider from './providers/collector.jsx';
import SocketProvider from './providers/soket.jsx';
import AuthProvider from './providers/auth.jsx';
import I18nProvider from './providers/i18n.jsx';
import ThemeProvider from './providers/theme.jsx';
import App from './components/App.jsx';

const init = (socket) => {
  const isDarkPrefer = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const preferTheme = isDarkPrefer ? 'dark' : 'light';
  document.documentElement.setAttribute('data-bs-theme', preferTheme);
  return (
    <CollectorProvider>
      <Provider store={store}>
        <SocketProvider socket={socket}>
          <I18nProvider>
            <AuthProvider>
              <ThemeProvider preferTheme={preferTheme}>
                <App />
              </ThemeProvider>
            </AuthProvider>
          </I18nProvider>
        </SocketProvider>
      </Provider>
    </CollectorProvider>
  );
};

export default init;
