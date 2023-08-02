import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useAuth } from '../hooks/index.js';
import Navheader from './Navheader.jsx';
import Main from './chat/index.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import NotFound from './NotFound.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn
      ? children
      : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <div className="d-flex flex-column vh-100">
    <BrowserRouter>
      <Navheader />
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          )}
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
