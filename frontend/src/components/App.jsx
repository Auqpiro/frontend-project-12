import { useTranslation } from 'react-i18next';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from 'react-router-dom';
import {
  Container,
  Navbar,
  Button,
  Dropdown,
} from 'react-bootstrap';
import { useAuth, useLocalStorage } from '../hooks/index.js';
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

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('logout')}</Button>
      : null
  );
};

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const { setItem } = useLocalStorage('language');
  const handleSelect = (lng) => {
    i18n.changeLanguage(lng);
    setItem(lng);
  };
  const { languages } = i18n;
  return (
    <Dropdown onSelect={handleSelect} className="me-2">
      <Dropdown.Toggle>{i18n.language}</Dropdown.Toggle>
      <Dropdown.Menu>
        {languages.map((language) => (
          <Dropdown.Item key={language} eventKey={language}>{language}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const App = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column vh-100">
      <BrowserRouter>
        <Navbar className="shadow-sm" bg="white" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">{t('brand')}</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <LanguageToggle />
              <AuthButton />
            </Navbar.Collapse>
          </Container>
        </Navbar>
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
};

export default App;
