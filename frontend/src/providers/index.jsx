import { Provider } from 'react-redux';
import store from '../slices/index.js';
import CollectorProvider from './collector.jsx';
import SocketProvider from './soket.jsx';
import AuthProvider from './auth.jsx';
import I18nProvider from './i18n.jsx';
import ThemeProvider from './theme.jsx';

const MainProvider = ({ children }) => (
  <CollectorProvider>
    <Provider store={store}>
      <SocketProvider>
        <I18nProvider>
          <AuthProvider>
            <ThemeProvider>
              { children }
            </ThemeProvider>
          </AuthProvider>
        </I18nProvider>
      </SocketProvider>
    </Provider>
  </CollectorProvider>
);

export default MainProvider;
