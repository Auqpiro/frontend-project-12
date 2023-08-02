import {
  Container,
  Navbar,
  Button,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth, useLocalStorage, useTheme } from '../hooks/index.js';

const ThemeToggle = () => {
  const { theme, lightOn, lightOff } = useTheme();
  return (
    theme.name === 'dark'
      ? (
        <Button className="me-3 p-1 rounded-circle" onClick={lightOn}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="26"
            width="26"
          >
            <path d="M17 12 A5 5 0 0 1 12 17 A5 5 0 0 1 7 12 A5 5 0 0 1 17 12 z" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </Button>
      )
      : (
        <Button className="me-3 p-1 rounded-circle" onClick={lightOff}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="26"
            width="26"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </Button>
      )
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

const Navheader = () => {
  const { t, i18n } = useTranslation();
  const { setItem } = useLocalStorage('language');
  const handleSelect = (lng) => {
    i18n.changeLanguage(lng);
    setItem(lng);
  };
  const { languages } = i18n;
  return (
    <Navbar className="shadow-sm" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('brand')}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav onSelect={handleSelect}>
            <Nav.Item>
              <ThemeToggle />
            </Nav.Item>
            <NavDropdown title={i18n.language.toUpperCase()} className="me-3">
              {languages.map((language) => (
                <NavDropdown.Item
                  key={language}
                  eventKey={language}
                >
                  {language.toUpperCase()}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Item>
              <AuthButton />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navheader;
