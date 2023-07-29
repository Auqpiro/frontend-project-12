import { Provider } from 'react-redux';
import InternationalizationProvider from "./i18n";
import SocketProvider from './soket';
import AuthProvider from './auth';
import store from '../slices/index.js';

const MainProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <SocketProvider>
        <InternationalizationProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </InternationalizationProvider>
      </SocketProvider>
    </Provider>
  );
};

export default MainProvider;