import { Provider } from 'react-redux';
import CollectorProvider from './collector.jsx';
import SocketProvider from './soket.jsx';
import AuthProvider from './auth.jsx';
import I18nProvider from './i18n.jsx';
import store from '../slices/index.js';

const MainProvider = ({ children }) => (
  <CollectorProvider>
    <Provider store={store}>
      <SocketProvider>
        <I18nProvider>
          <AuthProvider>
            { children }
          </AuthProvider>
        </I18nProvider>
      </SocketProvider>
    </Provider>
  </CollectorProvider>
);

export default MainProvider;
