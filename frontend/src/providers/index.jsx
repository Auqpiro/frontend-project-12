import { Provider } from 'react-redux';
import CollectorProvider from './rollbar';
import SocketProvider from './soket';
import InternationalizationProvider from "./i18n";
import AuthProvider from './auth';
import store from '../slices/index.js';

const MainProvider = ({ children }) => {
  return (
    <CollectorProvider>
      <Provider store={store}>
        <SocketProvider>
          <InternationalizationProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </InternationalizationProvider>
        </SocketProvider>
      </Provider>
    </CollectorProvider>
  );
};

export default MainProvider;