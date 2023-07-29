import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.js';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Container, Navbar, Button, Dropdown } from 'react-bootstrap';
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
      : <Navigate to='/login' state={{ from: location }} />
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
  const handleSelect = (lng) => i18n.changeLanguage(lng);
  const languages = i18n.languages;
  return (
    <Dropdown onSelect={handleSelect}>
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
    <BrowserRouter>
      <Navbar>
        <Container>
          <Navbar.Brand as={Link} to='/'>{t('brand')}</Navbar.Brand>
          <LanguageToggle />
          <AuthButton />
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={(
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        )} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
